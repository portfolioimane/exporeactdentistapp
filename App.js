import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './app/store'; // Adjust the import path as needed
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Appointments from './pages/Appointments';
import Login from './pages/Login';
import Register from './pages/Register';

// Layout
import PrivateRoute from './components/PrivateRoute';
import { logout } from './slices/authSlice'; // Import logout action

// Create Tab Navigator
const Tab = createBottomTabNavigator();

function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const MainNavigator = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Public routes with icons */}
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Services" 
          component={Services} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="briefcase-outline" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Appointments" 
          component={() => (
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          )}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar-outline" color={color} size={size} />
            ),
          }} 
        />
        {token ? (
          <Tab.Screen 
            name="Logout" 
            component={() => {
              dispatch(logout()); // Log the user out
              return null; // Prevent navigation
            }} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="log-out-outline" color={color} size={size} />
              ),
            }} 
          />
        ) : (
          <>
            <Tab.Screen 
              name="Login" 
              component={Login} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="log-in-outline" color={color} size={size} />
                ),
              }} 
            />
            <Tab.Screen 
              name="Register" 
              component={Register} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="person-add-outline" color={color} size={size} />
                ),
              }} 
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
