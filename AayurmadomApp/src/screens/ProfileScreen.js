import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.profileBox}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>

        <Text style={styles.name}>Mahesh</Text>
        <Text style={styles.email}>mahesh@example.com</Text>
      </View>

      <View style={styles.menuBox}>

        <MenuItem title="My Orders" />
        <MenuItem title="My Consultations" />
        <MenuItem title="Saved Address" />
        <MenuItem title="Wishlist" />
        <MenuItem title="Payment Methods" />
        <MenuItem title="Help & Support" />
        <MenuItem title="Privacy Policy" />
        <MenuItem title="Logout" danger />

      </View>

    </ScrollView>
  );
}

function MenuItem({ title, danger }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={[styles.menuText, danger && styles.dangerText]}>
        {title}
      </Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
    padding: 20,
  },

  profileBox: {
    backgroundColor: '#1F4D36',
    borderRadius: 28,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: '#C8A96B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 38,
    fontWeight: '800',
    color: '#1F4D36',
  },

  name: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  email: {
    color: '#E6D9BD',
    marginTop: 4,
  },

  menuBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 8,
  },

  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1E8D5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A2E25',
  },

  dangerText: {
    color: '#D91E46',
  },

  arrow: {
    fontSize: 28,
    color: '#AAA',
  },
});