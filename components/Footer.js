import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.contactContainer}>
        <Text style={styles.header}>Contact Us</Text>
        <Text style={styles.text}>123 Dental Street, Toothville</Text>
        <Text style={styles.text}>Email: contact@dentist.com</Text>
        <Text style={styles.text}>Phone: +123 456 789</Text>
      </View>
      <View style={styles.followContainer}>
        <Text style={styles.header}>Follow Us</Text>
        <Text style={styles.text}>Facebook | Twitter | Instagram</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#343a40',
    color: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactContainer: {
    flex: 1,
  },
  followContainer: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  text: {
    color: '#fff',
  },
});

export default Footer;
