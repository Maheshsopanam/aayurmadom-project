import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';
import { getOrdersByUser } from '../api/orderApi';

export default function MyOrdersScreen() {
  const { userEmail } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrdersByUser(userEmail);
      setOrders(data);
    } catch (error) {
      console.log('Order loading error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F4D36" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>

      {orders.length === 0 ? (
        <Text style={styles.empty}>No orders found</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.text}>Quantity: {item.quantity}</Text>
              <Text style={styles.text}>Price: ₹{item.price}</Text>
              <Text style={styles.total}>Total: ₹{item.totalPrice}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
              <Text style={styles.date}>
                Date: {item.orderDate ? item.orderDate.substring(0, 10) : ''}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
    padding: 20,
  },

  center: {
    flex: 1,
    backgroundColor: '#F8F2E7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1F4D36',
    marginBottom: 20,
  },

  empty: {
    color: '#777',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
  },

  productName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F4D36',
    marginBottom: 8,
  },

  text: {
    color: '#444',
    marginTop: 4,
  },

  total: {
    color: '#D91E46',
    fontWeight: '800',
    marginTop: 8,
    fontSize: 16,
  },

  status: {
    color: '#C8A96B',
    fontWeight: '700',
    marginTop: 8,
  },

  date: {
    color: '#888',
    marginTop: 6,
    fontSize: 13,
  },
});