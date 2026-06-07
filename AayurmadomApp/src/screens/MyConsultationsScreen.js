import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';
import { getConsultationsByUser } from '../api/consultationApi';

export default function MyConsultationsScreen() {
  const { userEmail } = useContext(AuthContext);

  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = async () => {
    try {
      const data = await getConsultationsByUser(userEmail);
      setConsultations(data);
    } catch (error) {
      console.log('Consultation loading error:', error);
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
      <Text style={styles.title}>My Consultations</Text>

      {consultations.length === 0 ? (
        <Text style={styles.empty}>No consultations found</Text>
      ) : (
        <FlatList
          data={consultations}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.patientName}>{item.patientName}</Text>
              <Text style={styles.text}>Concern: {item.concern}</Text>
              <Text style={styles.text}>Phone: {item.phone}</Text>
              <Text style={styles.text}>Date: {item.preferredDate}</Text>
              <Text style={styles.text}>Time: {item.preferredTime}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
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

  patientName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F4D36',
    marginBottom: 8,
  },

  text: {
    color: '#444',
    marginTop: 5,
  },

  status: {
    color: '#C8A96B',
    fontWeight: '800',
    marginTop: 10,
  },
});