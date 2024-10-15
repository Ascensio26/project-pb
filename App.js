// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import BikeScreen from './screens/BikeScreen'; // Import the BikeScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'Map' }}
        />
        <Stack.Screen
          name="Bike"
          component={BikeScreen}
          options={{ title: 'Bike' }} // Add BikeScreen to the navigation stack
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
