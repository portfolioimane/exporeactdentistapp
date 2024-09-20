import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setServices, setError } from '../slices/servicesSlice';
import axios from '../axios'; // Ensure axios is set up properly

const Services = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);
  const error = useSelector((state) => state.services.error);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services');
        dispatch(setServices(response.data));
      } catch (error) {
        dispatch(setError('Failed to fetch services.'));
      }
    };

    fetchServices();
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Services</Text>
      {error && Alert.alert('Error', error)}
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default Services;
