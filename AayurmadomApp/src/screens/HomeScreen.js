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
  Image,
} from 'react-native';

import { getProducts } from '../api/productApi';
import Logo from '../assets/Logo.png';

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

  const getImageUrl = url => {
    if (!url) return null;

    return url.replace(
      'http://localhost:8080',
      'http://192.168.30.103:8080'
    );
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
          <Image source={Logo} style={styles.logoImage} />

          <View>
            <Text style={styles.logoText}>AAYURMADOM</Text>
            <Text style={styles.tagline}>Purely Natural, Purely You</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            placeholder="Search ayurvedic products..."
            placeholderTextColor="#8A7B66"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroSmall}>Ayurvedic Wellness</Text>

          <Text style={styles.heroTitle}>
            Traditional Ayurveda for Modern Living
          </Text>

          <Text style={styles.heroText}>
            Explore natural skincare, haircare and wellness products trusted by tradition.
          </Text>

          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.categoryTitle}>Categories</Text>

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

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <Text style={styles.productCount}>{filteredProducts.length} items</Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#1F4D36"
            style={{ marginTop: 40 }}
          />
        ) : filteredProducts.length === 0 ? (
          <Text style={styles.emptyText}>No products found</Text>
        ) : (
          <View style={styles.productGrid}>
            {filteredProducts.map(product => {
              const imageUrl = getImageUrl(product.imageUrl1);

              return (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() =>
                    navigation.navigate('ProductDetails', { product })
                  }
                >
                  <View style={styles.productImageBox}>
                    {imageUrl ? (
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.productImage}
                      />
                    ) : (
                      <Text style={styles.productEmoji}>🌿</Text>
                    )}
                  </View>

                  <Text style={styles.categoryText}>{product.category}</Text>

                  <Text
                    style={styles.productName}
                    numberOfLines={2}
                  >
                    {product.name}
                  </Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.oldPrice}>₹{product.oldPrice}</Text>
                    <Text style={styles.price}>₹{product.price}</Text>
                  </View>

                  <View style={styles.cartButton}>
                    <Text style={styles.cartButtonText}>View Product</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 16,
  },

  logoImage: {
    width: 58,
    height: 58,
    resizeMode: 'contain',
    marginRight: 12,
  },

  logoText: {
    fontSize: 25,
    fontWeight: '900',
    color: '#1F4D36',
    letterSpacing: 1,
  },

  tagline: {
    color: '#6B5E4A',
    marginTop: 3,
    fontSize: 13,
    fontWeight: '600',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 18,
    height: 52,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#3A2E25',
  },

  hero: {
    backgroundColor: '#1F4D36',
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 24,
    marginBottom: 24,
  },

  heroSmall: {
    color: '#C8A96B',
    fontWeight: '800',
    marginBottom: 8,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    lineHeight: 35,
  },

  heroText: {
    color: '#E6D9BD',
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
  },

  heroButton: {
    backgroundColor: '#C8A96B',
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 18,
    marginTop: 20,
  },

  heroButtonText: {
    color: '#1F4D36',
    fontWeight: '900',
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#3A2E25',
    marginHorizontal: 20,
    marginBottom: 12,
  },

  categoryScroll: {
    paddingLeft: 20,
    marginBottom: 24,
  },

  categoryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategoryButton: {
    backgroundColor: '#1F4D36',
  },

  categoryButtonText: {
    color: '#1F4D36',
    fontWeight: '800',
    fontSize: 13,
  },

  activeCategoryButtonText: {
    color: '#FFFFFF',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#3A2E25',
  },

  productCount: {
    color: '#8A7B66',
    fontWeight: '700',
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
    borderRadius: 24,
    padding: 12,
  },

  productImageBox: {
    height: 130,
    backgroundColor: '#F3ECD9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  productEmoji: {
    fontSize: 48,
  },

  categoryText: {
    color: '#C8A96B',
    fontWeight: '900',
    fontSize: 12,
    marginTop: 10,
  },

  productName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#4A3B35',
    marginTop: 7,
    minHeight: 44,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  oldPrice: {
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 8,
    fontSize: 13,
  },

  price: {
    color: '#D91E46',
    fontWeight: '900',
    fontSize: 17,
  },

  cartButton: {
    backgroundColor: '#1F4D36',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 13,
  },

  cartButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#8A7B66',
    fontWeight: '700',
  },
});