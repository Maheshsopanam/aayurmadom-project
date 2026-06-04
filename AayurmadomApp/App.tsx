import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './src/navigation/BottomTabs';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import { CartProvider } from './src/context/CartContext';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderSuccessScreen from './src/screens/OrderSuccessScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>

      <Stack.Navigator>

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
    headerStyle: {
      backgroundColor: '#1F4D36',
    },
    headerTintColor: '#FFFFFF',
  }}
/>
<Stack.Screen
  name="OrderSuccess"
  component={OrderSuccessScreen}
  options={{ headerShown: false }}
/>

      </Stack.Navigator>

    </NavigationContainer>
    </CartProvider>
  );
}