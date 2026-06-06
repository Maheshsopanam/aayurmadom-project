import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { placeOrderApi } from '../api/orderApi';
import {
  View,
 Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { CartContext } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, getTotalPrice } = useContext(CartContext);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { userEmail } = useContext(AuthContext);
  const placeOrder = async () => {
  if (!name || !phone || !address) {
    Alert.alert('Missing Details', 'Please fill all fields');
    return;
  }

  try {
    for (const item of cartItems) {
      await placeOrderApi({
        userEmail: userEmail,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      });
    }

    navigation.navigate('OrderSuccess');
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Failed to place order');
  }
};

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Checkout
      </Text>

      <View style={styles.formBox}>

        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>
          Phone Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>
          Delivery Address
        </Text>

        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Enter full address"
          multiline
          value={address}
          onChangeText={setAddress}
        />

      </View>

      <View style={styles.summaryBox}>

        <Text style={styles.summaryTitle}>
          Order Summary
        </Text>

        {cartItems.map(item => (

          <View
            key={item.id}
            style={styles.itemRow}
          >

            <Text style={styles.itemName}>
              {item.name} × {item.quantity}
            </Text>

            <Text style={styles.itemPrice}>
              ₹{item.price * item.quantity}
            </Text>

          </View>

        ))}

        <View style={styles.totalRow}>

          <Text style={styles.totalText}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            ₹{getTotalPrice()}
          </Text>

        </View>

      </View>

      <TouchableOpacity
        style={styles.orderBtn}
        onPress={placeOrder}
      >

        <Text style={styles.orderBtnText}>
          Place Order
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F4D36',
    marginBottom: 20,
  },

  formBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
  },

  label: {
    color: '#3A2E25',
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#F5F2EA',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
  },

  addressInput: {
    height: 110,
    paddingTop: 14,
    textAlignVertical: 'top',
  },

  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
  },

  summaryTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F4D36',
    marginBottom: 18,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  itemName: {
    color: '#444',
    width: '70%',
  },

  itemPrice: {
    fontWeight: '700',
    color: '#1F4D36',
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 16,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F4D36',
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#D91E46',
  },

  orderBtn: {
    backgroundColor: '#1F4D36',
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },

  orderBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },

});