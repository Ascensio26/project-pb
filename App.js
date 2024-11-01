// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import BikeScreen from './screens/BikeScreen'; 
import LoginScreen from './screens/LoginScreen'; // Import the LoginScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login', headerShown: false }} // Hide header for login
        />
        
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitleAlign: 'center', // Center the header title
          }}
        />

        {/* Map Screen */}
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'Map' }}
        />

        {/* Bike Screen */}
        <Stack.Screen
          name="Bike"
          component={BikeScreen}
          options={{ title: 'Bike' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
