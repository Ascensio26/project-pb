// screens/HomeScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [bookings] = useState([
    {
      id: '1',
      type: 'Shuttle Bus',
      location: 'Perpustakaan UNSRI Indralaya',
      time: 'Senin, 06 Mei 2024 - 09:00 WIB',
      status: 'Seleksi',
    },
    {
      id: '2',
      type: 'Sepeda',
      location: 'Rektorat UNSRI Indralaya',
      time: 'Senin, 06 Mei 2024 - 09:00 WIB',
      status: 'Seleksi',
    },
    {
      id: '3',
      type: 'Sepeda Listrik',
      location: 'Rektorat UNSRI Indralaya',
      time: 'Senin, 06 Mei 2024 - 09:00 WIB',
      status: 'Seleksi',
    },
  ]);

  const renderBooking = ({ item }) => (
    <View style={styles.bookingContainer}>
      <Text style={styles.bookingType}>{item.type}</Text>
      <Text>{item.location}</Text>
      <Text>{item.time}</Text>
      <Text style={styles.bookingStatus}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Mau kemana?</Text>
        <Text style={styles.subtitle}>Pastikan alamat kamu sudah benar ya!</Text>

        <View style={styles.transportOptions}>
          <TouchableOpacity
            style={styles.transportButton}
            onPress={() => navigation.navigate('Map')}
          >
            <View style={styles.transportButton}>
            <Image source={require('../assets/shuttle.png')} style={styles.transportIcon} />
            <Text>Shuttle Bus</Text>
</View>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.transportButton}
            onPress={() => navigation.navigate('Bike')}
          >
            <Image source={require('../assets/bike.png')} style={styles.transportIcon} />
            <Text>Bike</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.transportButton}>
            <Image source={require('../assets/e-bike.png')} style={styles.transportIcon} />
            <Text>E-Bike</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.historyTitle}>Riwayat Pemesanan</Text>
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ensures the view takes up the entire screen
    backgroundColor: '#f8f8f8',
  },
  topSection: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 10,
    color: '#777',
  },
  transportOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  transportButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 100,
    height: 100,
    justifyContent: 'center',
    elevation: 3,
  },
  transportIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  bookingContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  bookingType: {
    fontWeight: 'bold',
  },
  bookingStatus: {
    color: 'green',
  },
});

export default HomeScreen;
