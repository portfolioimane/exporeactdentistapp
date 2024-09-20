import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  // If no token, navigate to the Login screen
  if (!token) {
    navigation.navigate('Login');
    return (
      <View>
        <Text>Redirecting to Login...</Text>
      </View>
    );
  }

  // If token exists, render the children (protected content)
  return children;
};

export default PrivateRoute;
