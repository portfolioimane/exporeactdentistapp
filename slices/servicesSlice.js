import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    error: null,
  },
  reducers: {
    setServices(state, action) {
      state.services = action.payload;
      // Optionally, you can save to AsyncStorage if needed
      AsyncStorage.setItem('services', JSON.stringify(action.payload));
    },
    setError(state, action) {
      state.error = action.payload;
    },
    loadServicesFromStorage(state) {
      const storedServices = AsyncStorage.getItem('services');
      if (storedServices) {
        state.services = JSON.parse(storedServices);
      }
    },
  },
});

// Export actions
export const { setServices, setError, loadServicesFromStorage } = servicesSlice.actions;

// Default export of the reducer
export default servicesSlice.reducer;
