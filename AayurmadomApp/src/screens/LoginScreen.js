import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { loginUser } from '../api/authApi';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Details', 'Please enter email and password');
      return;
    }

    try {
      const result = await loginUser({
        email,
        password,
      });

      Alert.alert('Login', result);

      if (result === 'Login successful') {
  await login(email);
}
    } catch (error) {
      Alert.alert('Error', 'Login failed');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AAYURMADOM</Text>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>New user? Create account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2E7',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1F4D36',
    textAlign: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#3A2E25',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#1F4D36',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 17,
  },
  link: {
    color: '#1F4D36',
    textAlign: 'center',
    marginTop: 22,
    fontWeight: '700',
  },
});