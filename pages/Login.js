import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios'; // Ensure axios is configured correctly
import { loginSuccess, setError } from '../slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/login', { email, password });
      dispatch(loginSuccess(response.data));

      // Redirect based on user role
      if (response.data.user.role === 'admin') {
        navigation.navigate('AdminDashboard'); // Adjust based on your navigation structure
      } else {
        navigation.navigate('Home'); // Adjust based on your navigation structure
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to login. Check your credentials.';
      dispatch(setError(errorMessage));
      Alert.alert('Login Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCompleteType="off" // Add this line to disable password management
        required
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
