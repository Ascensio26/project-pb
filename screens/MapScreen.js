import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps"; // Import Marker for the map
import * as Location from "expo-location"; // For getting user location
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"; // For selecting destination time
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase Realtime Database

const MapScreen = () => {
  const [location, setLocation] = useState(null); // User's current location
  const [driverLocation, setDriverLocation] = useState(null); // Driver's current location
  const [selectedTime, setSelectedTime] = useState("Sekarang"); // Dropdown state
  const [destination, setDestination] = useState(""); // Destination input state
  const [origin, setOrigin] = useState(""); // Origin input state

  // Get user's location on component mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  // Fetch driver's location from Firebase
  useEffect(() => {
    const db = getDatabase();
    const driverRef = ref(db, "driver/location");
    const unsubscribe = onValue(driverRef, (snapshot) => {
      if (snapshot.exists()) {
        setDriverLocation(snapshot.val()); // Update driver location state
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleBooking = () => {
    if (!destination || !origin) {
      alert("Please fill in both origin and destination.");
      return;
    }
    // Handle booking logic here, e.g., sending data to the server
    alert(
      `Booking successful!\nOrigin: ${origin}\nDestination: ${destination}\nTime: ${selectedTime}`
    );
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : -6.1741, // Default location
          longitude: location ? location.longitude : 106.8296, // Default location
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true} // Show user's current location on the map
      >
        {/* Driver's Marker */}
        {driverLocation && (
          <Marker
            coordinate={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
            }}
            title="Driver Location"
            description="Current location of the driver"
            pinColor="blue" // Marker color
          />
        )}
      </MapView>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.header}>Pesan Shuttle Bus</Text>

        {/* Destination Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="map-marker" size={24} color="green" />
          <TextInput
            style={styles.input}
            placeholder="Masukkan alamat Tujuan"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        {/* Origin Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="place" size={24} color="red" />
          <TextInput
            style={styles.input}
            placeholder="Masukkan alamat Asal"
            value={origin}
            onChangeText={setOrigin}
          />
        </View>

        {/* Time Dropdown */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="access-time" size={24} color="gold" />
          <Picker
            selectedValue={selectedTime}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
          >
            <Picker.Item label="Sekarang" value="Sekarang" />
            <Picker.Item label="30 Menit" value="30 Menit" />
            <Picker.Item label="1 Jam" value="1 Jam" />
            <Picker.Item label="2 Jam" value="2 Jam" />
          </Picker>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>LANJUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  form: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
  picker: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapScreen;
