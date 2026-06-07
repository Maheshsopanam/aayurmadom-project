import React, { useContext, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';
import { bookConsultationApi } from '../api/consultationApi';

export default function ConsultationScreen() {
  const { userEmail } = useContext(AuthContext);

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  const bookConsultation = async () => {
    if (!patientName || !phone || !concern || !preferredDate || !preferredTime) {
      Alert.alert('Missing Details', 'Please fill all fields');
      return;
    }

    try {
      await bookConsultationApi({
        userEmail,
        patientName,
        phone,
        concern,
        preferredDate,
        preferredTime,
      });

      Alert.alert(
        'Booking Successful',
        'Your consultation request has been submitted.'
      );

      setPatientName('');
      setPhone('');
      setConcern('');
      setPreferredDate('');
      setPreferredTime('');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to book consultation');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Online Consultation</Text>

      <Text style={styles.subtitle}>
        Book a consultation with an Ayurvedic expert.
      </Text>

      <View style={styles.formBox}>
        <Text style={styles.label}>Patient Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient name"
          value={patientName}
          onChangeText={setPatientName}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Health Concern</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Example: Hair fall, skin allergy, digestion issue"
          multiline
          value={concern}
          onChangeText={setConcern}
        />

        <Text style={styles.label}>Preferred Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={preferredDate}
          onChangeText={setPreferredDate}
        />

        <Text style={styles.label}>Preferred Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: 10:30 AM"
          value={preferredTime}
          onChangeText={setPreferredTime}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={bookConsultation}
        >
          <Text style={styles.buttonText}>Book Consultation</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 30,
    fontWeight: '800',
    color: '#1F4D36',
    marginTop: 15,
  },

  subtitle: {
    color: '#6B5E4A',
    marginTop: 8,
    marginBottom: 20,
    fontSize: 15,
  },

  formBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 40,
  },

  label: {
    color: '#3A2E25',
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#F5F2EA',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
  },

  textArea: {
    height: 110,
    paddingTop: 14,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#1F4D36',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 24,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});