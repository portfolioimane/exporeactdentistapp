import { createSlice } from '@reduxjs/toolkit';
import axios from '../axios'; // Ensure axios is configured correctly

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    error: null,
    status: 'idle',
  },
  reducers: {
    setAppointments(state, action) {
      state.appointments = action.payload;
      state.status = 'succeeded';
    },
    addAppointment(state, action) {
      state.appointments.push(action.payload);
      state.status = 'succeeded';
    },
    setError(state, action) {
      state.error = action.payload;
      state.status = 'failed';
    },
    setLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
  },
});

// Async thunk for fetching appointments
export const fetchAppointments = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get('/appointments'); // Adjust the endpoint as needed
    dispatch(setAppointments(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Async thunk for adding an appointment
export const createAppointment = (appointmentData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.post('/appointments', appointmentData); // Adjust the endpoint as needed
    dispatch(addAppointment(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Export actions
export const { setAppointments, addAppointment, setError, setLoading } = appointmentsSlice.actions;

// Default export of the reducer
export default appointmentsSlice.reducer;
