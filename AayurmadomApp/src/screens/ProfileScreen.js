import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
  const { userEmail, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileCard}>
        <Text style={styles.label}>Email</Text>

        <Text style={styles.email}>
          {userEmail}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F4D36',
    marginTop: 20,
    marginBottom: 25,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
  },

  label: {
    fontSize: 14,
    color: '#888',
  },

  email: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F4D36',
    marginTop: 8,
  },

  logoutButton: {
    backgroundColor: '#D91E46',
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});