import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker

export default function App() {
  const [location, setLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState('Sekarang'); // State for the dropdown

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : -6.1741, // Default location if location not fetched
          longitude: location ? location.longitude : 106.8296, // Default location
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      />

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.header}>Pesan Shuttle Bus</Text>

        {/* Destination Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="map-marker" size={24} color="green" />
          <TextInput style={styles.input} placeholder="Masukkan alamat Tujuan" />
        </View>

        {/* Origin Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="place" size={24} color="red" />
          <TextInput style={styles.input} placeholder="Masukkan alamat Asal" />
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LANJUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  form: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
