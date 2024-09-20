import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, Button, StyleSheet, Picker } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAppointments, addAppointment, setError, setLoading } from '../slices/appointmentsSlice';
import { setServices } from '../slices/servicesSlice';
import axios from '../axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);
  const services = useSelector((state) => state.services.services);
  const [selectedService, setSelectedService] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [error, setErrorState] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      dispatch(setLoading());
      try {
        const response = await axios.get('/appointments');
        dispatch(setAppointments(response.data));
      } catch (error) {
        dispatch(setError('Failed to fetch appointments.'));
      }
    };

    fetchAppointments();
  }, [dispatch]);

  useEffect(() => {
    const fetchServices = async () => {
      dispatch(setLoading());
      try {
        const response = await axios.get('/services');
        dispatch(setServices(response.data));
      } catch (error) {
        dispatch(setError('Failed to fetch services.'));
      }
    };

    fetchServices();
  }, [dispatch]);

  const handleSubmit = async () => {
    const formattedDate = appointmentDate.toISOString().slice(0, 19).replace('T', ' ');
    try {
      const response = await axios.post('/appointments', {
        service_id: selectedService,
        appointment_date: formattedDate,
      });
      dispatch(addAppointment(response.data));
      setSelectedService('');
      setAppointmentDate(new Date());
      setErrorState('');
    } catch (error) {
      setErrorState('Failed to book appointment. Please try again.');
    }
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book an Appointment</Text>
      {error && Alert.alert('Error', error)}
      
      <View style={styles.formGroup}>
        <Text>Select Service</Text>
        <Picker
          selectedValue={selectedService}
          onValueChange={(itemValue) => setSelectedService(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choose a service" value="" />
          {services.map((service) => (
            <Picker.Item key={service.id} label={service.name} value={service.id} />
          ))}
        </Picker>
      </View>
      
      <View style={styles.formGroup}>
        <Text>Select Date</Text>
        <Button title="Show Date Picker" onPress={showPicker} />
        {showDatePicker && (
          <DateTimePicker
            value={appointmentDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || appointmentDate;
              setShowDatePicker(false);
              setAppointmentDate(currentDate);
            }}
          />
        )}
      </View>
      
      <Button title="Book Appointment" onPress={handleSubmit} />

      <Text style={styles.upcomingHeader}>Upcoming Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.appointment}>
            <Text>{new Date(item.appointment_date).toLocaleDateString()}</Text>
            <Text>{services.find((s) => s.id === item.service_id)?.name}</Text>
          </View>
        )}
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
  },
  formGroup: {
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  upcomingHeader: {
    fontSize: 20,
    marginVertical: 10,
  },
  appointment: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default Appointments;
