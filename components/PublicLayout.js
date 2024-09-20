import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavBar from './Navbar'; // Adapt NavBar for React Native
import Footer from './Footer'; // Adapt Footer for React Native

const PublicLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <NavBar />

      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
});

export default PublicLayout;
