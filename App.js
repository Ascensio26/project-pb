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
import EBikeScreen from './screens/EBikeScreen'; // Import EBikeScreen
import EBikeDetailScreen from './screens/EBikeDetail'; // Import EBikeDetailScreen
import BicycleScreen from './screens/bikeScreen2'; // Import the detailed BicycleScreen
import BikeLoanScreen from './screens/BikeLoanScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useAppStateListener(); // Hook to monitor app state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}/role`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserRole(snapshot.val()); // Set user role
        }
      } else {
        setUserRole(null); // Reset if user logs out
      }
      setIsLoading(false); // End loading
    });

    return unsubscribe; // Cleanup the listener
  }, []);

  if (isLoading) {
    return null; // Optionally replace with a loading spinner
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
              <Stack.Screen
                name="BicycleScreen"
                component={BicycleScreen}
                options={{ title: 'Bike Detail' }}
              />
              <Stack.Screen
                name="E-Bike"
                component={EBikeScreen}
                options={{ title: 'E-Bike' }}
              />
              <Stack.Screen
                name="EBikeDetailScreen"
                component={EBikeDetailScreen}
                options={{ title: 'Detail Sepeda Listrik' }}
              />
              <Stack.Screen
                name="BikeLoan"
                component={BikeLoanScreen}
                options={{ title: 'Peminjaman Sepeda' }}
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
