import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Picker } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios'; // Ensure axios is configured correctly
import { registerSuccess, setError } from '../slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('patient');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      dispatch(setError('Passwords do not match.'));
      return;
    }

    try {
      const response = await axios.post('/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        phone_number: phoneNumber,
        role,
      });
      dispatch(registerSuccess(response.data));
      navigation.navigate('Login'); // Redirect to login after successful registration
    } catch (err) {
      const errorMessage = err.response?.data?.errors?.password?.[0] || 'Failed to register.';
      dispatch(setError(errorMessage));
      Alert.alert('Registration Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Text style={styles.label}>Role</Text>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Patient" value="patient" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>
      <Button title="Register" onPress={handleSubmit} />
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
  label: {
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
});

export default Register;
