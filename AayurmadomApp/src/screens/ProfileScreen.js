import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </Text>
        </View>

        <Text style={styles.name}>{user?.name || 'Aayurmadom User'}</Text>
        <Text style={styles.email}>{user?.email || 'No email available'}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Account Details</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{user?.name || 'Not available'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || 'Not available'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user?.phone || 'Not available'}</Text>
        </View>
      </View>

      <View style={styles.menuCard}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.menuIcon}>✏️</Text>
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('MyOrders')}
        >
          <Text style={styles.menuIcon}>🛍️</Text>
          <Text style={styles.menuText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('MyConsultations')}
        >
          <Text style={styles.menuIcon}>🩺</Text>
          <Text style={styles.menuText}>My Consultations</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
  },

  headerCard: {
    backgroundColor: '#1F4D36',
    margin: 20,
    borderRadius: 30,
    paddingVertical: 34,
    alignItems: 'center',
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#C8A96B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  avatarText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#1F4D36',
  },

  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  email: {
    color: '#E6D9BD',
    marginTop: 6,
    fontSize: 14,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1F4D36',
    marginBottom: 16,
  },

  infoRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7D8',
    paddingVertical: 12,
  },

  label: {
    color: '#8A7B66',
    fontSize: 13,
    fontWeight: '700',
  },

  value: {
    color: '#3A2E25',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 10,
  },

  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7D8',
  },

  menuIcon: {
    fontSize: 24,
    marginRight: 14,
  },

  menuText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F4D36',
  },

  logoutButton: {
    backgroundColor: '#D91E46',
    margin: 20,
    paddingVertical: 17,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 40,
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 17,
  },
});