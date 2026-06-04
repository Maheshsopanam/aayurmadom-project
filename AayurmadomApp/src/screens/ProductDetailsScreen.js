import { useContext } from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { CartContext } from '../context/CartContext';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    
    <ScrollView style={styles.container}>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {product.images.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={styles.productImage}
          />
        ))}
      </ScrollView>

      <View style={styles.content}>

        <Text style={styles.category}>{product.category}</Text>

        <Text style={styles.name}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.oldPrice}>
            ₹{product.oldPrice}
          </Text>

          <Text style={styles.price}>
            ₹{product.price}
          </Text>
        </View>

        <Text style={styles.description}>
          {product.description}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Benefits
          </Text>

          <Text style={styles.bullet}>
            • 100% Ayurvedic ingredients
          </Text>

          <Text style={styles.bullet}>
            • Safe for regular use
          </Text>

          <Text style={styles.bullet}>
            • No harmful chemicals
          </Text>
        </View>

        <TouchableOpacity style={styles.cartButton}
        onPress={()=>addToCart(product)}>
          <Text style={styles.cartButtonText}>
            Add to Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>
            Buy Now
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
  },

  productImage: {
    width: 400,
    height: 350,
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },

  content: {
    padding: 20,
  },

  category: {
    color: '#C8A96B',
    fontWeight: '700',
    fontSize: 15,
  },

  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F4D36',
    marginTop: 8,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  oldPrice: {
    color: '#888',
    textDecorationLine: 'line-through',
    fontSize: 18,
    marginRight: 10,
  },

  price: {
    color: '#D91E46',
    fontSize: 28,
    fontWeight: '800',
  },

  description: {
    marginTop: 18,
    color: '#4F4A3F',
    lineHeight: 24,
    fontSize: 16,
  },

  section: {
    marginTop: 25,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F4D36',
    marginBottom: 12,
  },

  bullet: {
    color: '#444',
    marginBottom: 8,
    fontSize: 15,
  },

  cartButton: {
    backgroundColor: '#1F4D36',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 30,
  },

  cartButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 17,
  },

  buyButton: {
    backgroundColor: '#C8A96B',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 40,
  },

  buyButtonText: {
    color: '#1F4D36',
    fontWeight: '800',
    fontSize: 17,
  },
});

