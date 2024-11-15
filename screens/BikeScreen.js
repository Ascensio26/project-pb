import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const BikeScreen = ({ navigation }) => {
  const bikes = [
    { id: '1', name: 'Sepeda 01M', color: 'Warna merah', available: true, image: require('../assets/sepedaMerah.png') },
    { id: '2', name: 'Sepeda 02M', color: 'Warna merah', available: true, image: require('../assets/sepedaMerah.png') },
    { id: '3', name: 'Sepeda 01K', color: 'Warna kuning', available: true, image: require('../assets/sepedaKuning.png') },
    { id: '4', name: 'Sepeda 01B', color: 'Warna biru', available: true, image: require('../assets/sepedaBiru.png') },
    { id: '5', name: 'Sepeda 01H', color: 'Warna hijau', available: true, image: require('../assets/sepedaHijau.png') },
    { id: '6', name: 'Sepeda 01P', color: 'Warna putih', available: true, image: require('../assets/sepedaPutih.png') },
  ];

  const renderBikeItem = ({ item }) => (
    <View style={styles.bikeItem}>
      <Image source={item.image} style={styles.bikeImage} />
      <View style={styles.bikeInfo}>
        <Text style={styles.bikeName}>{item.name}</Text>
        <Text style={styles.bikeColor}>{item.color}</Text>
      </View>
      {item.available ? (
        <TouchableOpacity
          style={styles.availableButton}
          onPress={() => navigation.navigate('BicycleScreen', { bike: item })} // Pass bike data to BikeScreen2
        >
          <Text style={styles.buttonText}>Pilih</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.unavailableText}>Tidak tersedia</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Mau nyari sepeda yang gimana?" />
      <FlatList
        data={bikes}
        renderItem={renderBikeItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  bikeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  bikeImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  bikeInfo: {
    flex: 1,
    marginLeft: 15,
  },
  bikeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bikeColor: {
    fontSize: 14,
    color: '#777',
  },
  availableButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  unavailableText: {
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
});

export default BikeScreen;
