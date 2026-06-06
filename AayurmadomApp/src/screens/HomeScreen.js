import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { getProducts } from '../api/productApi';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Eye Care', 'Hair Care', 'Skin Care', 'Baby Care'];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.logo}>AAYURMADOM</Text>
          <Text style={styles.tagline}>Purely Natural, Purely You</Text>
        </View>

        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search ayurvedic products..."
            placeholderTextColor="#777"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Traditional Ayurveda for Modern Living
          </Text>

          <Text style={styles.heroText}>
            Natural skincare, haircare and wellness products.
          </Text>

          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.activeCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category &&
                    styles.activeCategoryButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Products from Backend</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#1F4D36"
            style={{ marginTop: 30 }}
          />
        ) : (
          <View style={styles.productGrid}>
            {filteredProducts.map(product => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate('ProductDetails', { product })
                }
              >
                <View style={styles.productImageBox}>
                  <Text style={styles.productEmoji}>🌿</Text>
                </View>

                <Text style={styles.categoryText}>{product.category}</Text>

                <Text style={styles.productName}>{product.name}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.oldPrice}>₹{product.oldPrice}</Text>
                  <Text style={styles.price}>₹{product.price}</Text>
                </View>

                <Text style={styles.stockText}>
                  {product.stock > 0
                    ? `In stock`
                    : 'Out of stock'}
                </Text>

                <View style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>View</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
  },

  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 15,
  },

  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F4D36',
    letterSpacing: 1,
  },

  tagline: {
    color: '#6B5E4A',
    marginTop: 4,
  },

  searchBox: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  searchInput: {
    height: 50,
    fontSize: 15,
  },

  hero: {
    backgroundColor: '#1F4D36',
    marginHorizontal: 20,
    borderRadius: 28,
    padding: 24,
    marginBottom: 25,
  },

  heroTitle: {
    color: '#F8F2E7',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
  },

  heroText: {
    color: '#E6D9BD',
    marginTop: 12,
    fontSize: 15,
  },

  heroButton: {
    backgroundColor: '#C8A96B',
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 18,
  },

  heroButtonText: {
    color: '#1F4D36',
    fontWeight: '700',
  },

  categoryScroll: {
    paddingLeft: 20,
    marginBottom: 20,
  },

  categoryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    marginRight: 10,
  },

  activeCategoryButton: {
    backgroundColor: '#1F4D36',
  },

  categoryButtonText: {
    color: '#1F4D36',
    fontWeight: '600',
  },

  activeCategoryButtonText: {
    color: '#FFFFFF',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3A2E25',
    marginHorizontal: 20,
    marginBottom: 14,
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    paddingBottom: 30,
  },

  productCard: {
    backgroundColor: '#FFFFFF',
    width: '46%',
    margin: '2%',
    borderRadius: 22,
    padding: 12,
  },

  productImageBox: {
    height: 120,
    backgroundColor: '#F3ECD9',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  productEmoji: {
    fontSize: 48,
  },

  categoryText: {
    color: '#C8A96B',
    fontWeight: '700',
    fontSize: 12,
    marginTop: 8,
  },

 productName: {
  fontSize: 16,
  fontWeight: '700',
  color: '#4A3B35',
  marginTop: 10,
  minHeight: 50,
},

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  oldPrice: {
    color: '#777',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },

  price: {
    color: '#D91E46',
    fontWeight: '800',
    fontSize: 16,
  },

  stockText: {
    color: '#1F4D36',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },

  cartButton: {
    backgroundColor: '#1F4D36',
    paddingVertical: 9,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },

  cartButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});