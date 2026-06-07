import React, { useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { CartContext } from '../context/CartContext';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  const images = [
    product.imageUrl1,
    product.imageUrl2,
    product.imageUrl3,
    product.imageUrl4,
  ].filter(Boolean);

  return (
    <ScrollView style={styles.container}>
      {images.length > 0 ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {images.map((img, index) => {
            const imageUri = img.replace(
              'http://localhost:8080',
              'http://192.168.30.103:8080'
            );

            return (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={styles.detailImage}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.backendImageBox}>
          <Text style={styles.backendImageIcon}>🌿</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.category}>
          {product.category}
        </Text>

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

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => addToCart(product)}
        >
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

  backendImageBox: {
    height: 320,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backendImageIcon: {
    fontSize: 70,
  },

  detailImage: {
    width: 400,
    height: 320,
    resizeMode: 'cover',
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