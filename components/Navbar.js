import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../slices/authSlice';

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Home'); // Redirect to Home after logout
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Services')}>
        <Text style={styles.navItem}>Services</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
        <Text style={styles.navItem}>Appointments</Text>
      </TouchableOpacity>

      {!token ? (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navItem}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.navItem}>Register</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.navItem}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'darkslategray',
  },
  navItem: {
    color: 'white',
    fontSize: 16,
  },
});

export default NavBar;
