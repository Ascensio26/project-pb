import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function BicycleScreen({ route }) {
  const { bike } = route.params; // Get the selected bike from navigation params

  const otherBikes = [
    { id: '1', name: 'Sepeda 01M', color: 'Warna merah', status: 'Tersedia', image: require('../assets/sepedaMerah.png') },
    { id: '2', name: 'Sepeda 02M', color: 'Warna merah', status: 'Tersedia', image: require('../assets/sepedaMerah.png') },
    { id: '3', name: 'Sepeda 01K', color: 'Warna kuning', status: 'Tidak tersedia', image: require('../assets/sepedaKuning.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sepeda</Text>
      </View>

      {/* Selected Bike Section */}
      <View style={styles.mainBikeContainer}>
        <Image source={bike.image} style={styles.mainBikeImage} />
        <Text style={styles.bikeTitle}>{bike.name}</Text>
        <Text style={styles.bikeColor}>{bike.color}</Text>
        <Text style={[styles.bikeStatus, { color: bike.available ? 'green' : 'red' }]}>
          {bike.available ? 'Tersedia' : 'Tidak tersedia'}
        </Text>
        <TouchableOpacity
          style={styles.selectButton}
          disabled={!bike.available}
        >
          <Text style={styles.selectButtonText}>PILIH</Text>
        </TouchableOpacity>
      </View>

      {/* Other Bikes Section */}
      <Text style={styles.otherBikesTitle}>Lihat sepeda lain</Text>
      <View style={styles.otherBikesContainer}>
        {otherBikes.map((otherBike) => (
          <View key={otherBike.id} style={styles.bikeItem}>
            <Image source={otherBike.image} style={styles.bikeItemImage} />
            <View style={styles.bikeInfo}>
              <Text style={styles.bikeName}>{otherBike.name}</Text>
              <Text style={styles.bikeColor}>{otherBike.color}</Text>
              <Text
                style={[
                  styles.bikeStatus,
                  { color: otherBike.status === 'Tersedia' ? 'green' : 'red' },
                ]}
              >
                {otherBike.status}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.bikeSelectButton,
                { backgroundColor: otherBike.status === 'Tersedia' ? '#007bff' : '#ccc' },
              ]}
              disabled={otherBike.status !== 'Tersedia'}
            >
              <Text style={styles.bikeSelectButtonText}>+ Pilih</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainBikeContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  mainBikeImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
  },
  bikeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bikeColor: {
    fontSize: 14,
    color: '#6c757d',
  },
  bikeStatus: {
    fontSize: 14,
    marginVertical: 5,
  },
  selectButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  otherBikesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 16,
  },
  otherBikesContainer: {
    paddingHorizontal: 16,
  },
  bikeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  bikeItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  bikeInfo: {
    flex: 1,
  },
  bikeName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bikeStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bikeSelectButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  bikeSelectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
