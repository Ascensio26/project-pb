// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import BikeScreen from './screens/BikeScreen';
import LoginScreen from './screens/LoginScreen';
import DriverMap from './screens/driverMap';
import { auth } from './firebase'; // Firebase auth
import { getDatabase, ref, get } from 'firebase/database'; // For Realtime Database
import { onAuthStateChanged } from 'firebase/auth';
import useAppStateListener from './hooks/stateListener';
import EBikeScreen from './screens/EBikeScreen'; // Tambahkan impor ini
import BicycleScreen from './screens/bikeScreen2';
import EBikeDetailScreen from './screens/EBikeDetail';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useAppStateListener();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}/role`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserRole(snapshot.val()); // Set the user role
        }
      } else {
        setUserRole(null); // User logged out
      }
      setIsLoading(false); // Stop loading spinner
    });

    return unsubscribe; // Cleanup listener
  }, []);

  if (isLoading) {
    return null; // Add a loading spinner here if needed
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userRole ? (
          userRole === 'driver' ? (
            <Stack.Screen
              name="DriverMap"
              component={DriverMap}
              options={{ title: 'Driver Dashboard', headerShown: false }}
            />
          ) : (
            <>
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
                options={{ title: 'Bike' }}
              />
            </>
          )
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login', headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
