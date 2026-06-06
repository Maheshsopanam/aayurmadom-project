import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function OrderSuccessScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <View style={styles.iconBox}>
        <Text style={styles.icon}>✓</Text>
      </View>

      <Text style={styles.title}>
        Order Placed Successfully
      </Text>

      <Text style={styles.message}>
        Your Ayurvedic products order has been placed successfully.
      </Text>

      <View style={styles.orderBox}>

        <Text style={styles.orderLabel}>
          Order Number
        </Text>

        <Text style={styles.orderNumber}>
          #AYD2026001
        </Text>

        <Text style={styles.delivery}>
          Estimated delivery in 3-5 days
        </Text>

      </View>

      <TouchableOpacity
  style={styles.button}
  onPress={() =>
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
          params: {
            screen: 'Home',
          },
        },
      ],
    })
  }
>
  <Text style={styles.buttonText}>
    Continue Shopping
  </Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  iconBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1F4D36',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#FFFFFF',
    fontSize: 60,
    fontWeight: '800',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1F4D36',
    marginTop: 30,
    textAlign: 'center',
  },

  message: {
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
  },

  orderBox: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 24,
    marginTop: 30,
    alignItems: 'center',
  },

  orderLabel: {
    color: '#888',
    fontSize: 15,
  },

  orderNumber: {
    color: '#1F4D36',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 10,
  },

  delivery: {
    color: '#C8A96B',
    marginTop: 14,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#1F4D36',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: 'center',
    marginTop: 40,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

});