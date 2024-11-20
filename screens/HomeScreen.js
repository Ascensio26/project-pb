// screens/HomeScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import auth from your firebase.js file

const HomeScreen = ({ navigation }) => {
  const [bookings] = useState([
    // Your booking data here...
  ]);

  const getImageSource = (type) => {
    switch (type) {
      case 'Shuttle Bus':
        return require('../assets/shuttle.png');
      case 'Sepeda':
        return require('../assets/bike.png');
      case 'Sepeda Listrik':
        return require('../assets/e-bike.png');
      default:
        return null;
    }
  };

  const renderBooking = ({ item }) => (
    <View style={styles.bookingContainer}>
      <Image source={getImageSource(item.type)} style={styles.bookingImage} />
      <View style={styles.bookingDetails}>
        <Text style={styles.bookingType}>{item.type}</Text>
        <Text>{item.location}</Text>
        <Text>{item.time}</Text>
        <Text style={styles.bookingStatus}>{item.status}</Text>
      </View>
    </View>
  );

  // Logout function
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Navigate to the login screen after successful logout
        navigation.navigate('Login');
      })
      .catch((error) => {
        // Handle errors during logout
        console.error('Logout Error: ', error.message);
      });
  };

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
            <Image source={require('../assets/shuttle.png')} style={styles.transportIcon} />
            <Text>Shuttle Bus</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.transportButton}
            onPress={() => navigation.navigate('Bike')}
          >
            <Image source={require('../assets/bike.png')} style={styles.transportIcon} />
            <Text>Bike</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.transportButton}
            onPress={() => navigation.navigate('E-Bike')}
          >
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

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  bookingImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  bookingDetails: {
    flex: 1,
  },
  bookingType: {
    fontWeight: 'bold',
  },
  bookingStatus: {
    color: 'green',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ff6347',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
