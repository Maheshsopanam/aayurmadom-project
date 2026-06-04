import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ConsultationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Online Consultation</Text>
      <Text style={styles.text}>Book an appointment with Ayurvedic experts.</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Consultation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F2E7', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#1F4D36' },
  text: { marginTop: 10, color: '#6B5E4A', textAlign: 'center' },
  button: { backgroundColor: '#1F4D36', padding: 16, borderRadius: 18, marginTop: 25 },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
});