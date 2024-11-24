import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { getDatabase, ref, set } from "firebase/database"; // Firebase Database
import { auth, signOut } from "../firebase"; // Firebase Auth

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

      // Start sending location every 10 seconds
      locationInterval = setInterval(sendLocation, 10000);
    })();

    // Cleanup interval when component unmounts
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been logged out successfully.");
      navigation.replace("Login"); // Redirect to the login screen
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
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
