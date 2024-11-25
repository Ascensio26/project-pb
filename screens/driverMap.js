import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { getDatabase, ref, set } from "firebase/database"; // Firebase Database
import { auth } from "../firebase"; // Firebase Auth
import { signOut } from "firebase/auth";

const DriverMap = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let locationInterval;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert("Permission Denied", "Please enable location permissions.");
        return;
      }
      locationInterval = setInterval(sendLocation, 10000);
    })();
    return () => {
      if (locationInterval) clearInterval(locationInterval);
    };
  }, []);

  const sendLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);

      // Save to Firebase
      const database = getDatabase(); // Initialize Firebase Database
      await set(ref(database, "driver/location"), {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        timestamp: currentLocation.timestamp,
      });

      console.log("Location sent to the server:", currentLocation.coords);
    } catch (error) {
      setErrorMsg("Failed to retrieve location.");
      console.error("Error fetching location:", error);
    }
  };

  const handleLogout = () => {
    if (auth) {
      console.log('auth instance:', auth); // Pastikan instansi auth valid
      signOut(auth)
        .then(() => {
          console.log('Signed out successfully');
          navigation.navigate('Login');
        })
        .catch((error) => {
          console.error('Error signing out: ', error.message);
          console.error('Error stack: ', error.stack);
        });
    } else {
      console.error('Error: auth instance is not initialized properly.');
    }
  }; 

  return (
    <View style={styles.container}>
      <Button title="Send Location Manually" onPress={sendLocation} />
      {location && (
        <View style={styles.locationDetails}>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      <View style={styles.logoutButton}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  locationDetails: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  logoutButton: {
    marginTop: 30,
    alignSelf: "center",
    width: "80%",
  },
});

export default DriverMap;
