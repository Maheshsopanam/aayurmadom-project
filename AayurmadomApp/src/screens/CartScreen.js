import React, { useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useContext(CartContext);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        My Cart
      </Text>

      {cartItems.length === 0 ? (

        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            Your cart is empty
          </Text>
        </View>

      ) : (

        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (

              <View style={styles.card}>

                <View style={styles.image}>
                  <Text style={styles.imageIcon}>🌿</Text>
                </View>

                <View style={styles.info}>

                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.price}>
                    ₹{item.price}
                  </Text>

                  <View style={styles.quantityRow}>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => decreaseQuantity(item.id)}
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantity}>
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => increaseQuantity(item.id)}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>

                  </View>

                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.remove}>
                      Remove
                    </Text>
                  </TouchableOpacity>

                </View>

              </View>

            )}
          />

          <View style={styles.bottomBox}>

            <Text style={styles.total}>
              Total: ₹{getTotalPrice()}
            </Text>

            <TouchableOpacity
  style={styles.checkoutBtn}
  onPress={() => navigation.navigate('Checkout')}
>
              <Text style={styles.checkoutText}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>

          </View>
        </>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
    padding: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1F4D36',
    marginBottom: 20,
  },

  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: '#777',
    fontSize: 18,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#F3ECD9',
    borderRadius: 14,
  },

  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },

  name: {
    fontWeight: '700',
    color: '#3A2E25',
    fontSize: 16,
  },

  price: {
    color: '#D91E46',
    fontWeight: '800',
    fontSize: 20,
    marginTop: 4,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#1F4D36',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  quantity: {
    marginHorizontal: 14,
    fontSize: 18,
    fontWeight: '700',
  },

  remove: {
    color: '#D91E46',
    marginTop: 10,
    fontWeight: '600',
  },

  bottomBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginTop: 10,
  },

  total: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F4D36',
  },

  checkoutBtn: {
    backgroundColor: '#1F4D36',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 16,
  },

  checkoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

});