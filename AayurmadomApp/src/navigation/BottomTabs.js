import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ConsultationScreen from '../screens/ConsultationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1F4D36',
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused }) => {
          let icon = '🏠';

          if (route.name === 'Home') icon = '🏠';
          if (route.name === 'Cart') icon = '🛒';
          if (route.name === 'Consult') icon = '🩺';
          if (route.name === 'Profile') icon = '👤';

          return (
            <Text style={{ fontSize: focused ? 24 : 20 }}>
              {icon}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Consult" component={ConsultationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}