import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './src/navigation/BottomTabs';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderSuccessScreen from './src/screens/OrderSuccessScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MyOrdersScreen from './src/screens/MyOrdersScreen';
import MyConsultationsScreen from './src/screens/MyConsultationsScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

import { CartProvider } from './src/context/CartContext';
import { AuthProvider, AuthContext } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isLoggedIn, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1F4D36" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={BottomTabs}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{
                title: 'Product Details',
                headerStyle: { backgroundColor: '#1F4D36' },
                headerTintColor: '#FFFFFF',
              }}
            />
            <Stack.Screen
                name="MyOrders"
                component={MyOrdersScreen}
                options={{
                  title: 'My Orders',
                  headerStyle: {
                    backgroundColor: '#1F4D36',
                  },
                  headerTintColor: '#FFFFFF',
                }}
              />
              <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                    options={{
                      title: 'Edit Profile',
                      headerStyle: {
                        backgroundColor: '#1F4D36',
                      },
                      headerTintColor: '#FFFFFF',
                    }}
                  />
              <Stack.Screen
                  name="MyConsultations"
                  component={MyConsultationsScreen}
                  options={{
                    title: 'My Consultations',
                    headerStyle: {
                      backgroundColor: '#1F4D36',
                    },
                    headerTintColor: '#FFFFFF',
                  }}
                />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{
                title: 'Checkout',
                headerStyle: { backgroundColor: '#1F4D36' },
                headerTintColor: '#FFFFFF',
              }}
            />

            <Stack.Screen
              name="OrderSuccess"
              component={OrderSuccessScreen}
              options={{ headerShown: false }}
            />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
}