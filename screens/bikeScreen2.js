import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function BicycleScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sepeda</Text>
      </View>

      {/* Main Bicycle Section */}
      <View style={styles.mainBicycleContainer}>
        <Image
          source={{ uri: 'https://example.com/main-bicycle-image.jpg' }} // Replace with actual image URL
          style={styles.bicycleImage}
        />
        <Text style={styles.bicycleTitle}>Sepeda 01M</Text>
        <Text style={styles.bicycleColor}>Warna merah</Text>
        <Text style={styles.bicycleStatus}>Tersedia</Text>
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectButtonText}>PILIH</Text>
        </TouchableOpacity>
      </View>

      {/* Other Bicycles Section */}
      <Text style={styles.otherBicyclesTitle}>Lihat sepeda lain</Text>
      <View style={styles.otherBicyclesContainer}>
        {[
          { id: 1, name: 'Sepeda 01M', color: 'Warna merah', status: 'Tersedia', image: 'https://example.com/bicycle-1.jpg' },
          { id: 2, name: 'Sepeda 02M', color: 'Warna hitam', status: 'Tersedia', image: 'https://example.com/bicycle-2.jpg' },
          { id: 3, name: 'Sepeda 01K', color: 'Warna kuning', status: 'Tidak tersedia', image: 'https://example.com/bicycle-3.jpg' },
        ].map(bike => (
          <View key={bike.id} style={styles.bicycleItem}>
            <Image source={{ uri: bike.image }} style={styles.bicycleItemImage} />
            <View style={styles.bicycleInfo}>
              <Text style={styles.bicycleItemTitle}>{bike.name}</Text>
              <Text style={styles.bicycleItemColor}>{bike.color}</Text>
              <Text style={[styles.bicycleItemStatus, { color: bike.status === 'Tersedia' ? 'green' : 'red' }]}>{bike.status}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.selectItemButton,
                { backgroundColor: bike.status === 'Tersedia' ? '#007BFF' : '#ccc' },
              ]}
              disabled={bike.status !== 'Tersedia'}
            >
              <Text style={styles.selectButtonText}>+ Pilih</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainBicycleContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  bicycleImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
  },
  bicycleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bicycleColor: {
    fontSize: 14,
    color: '#6c757d',
  },
  bicycleStatus: {
    fontSize: 14,
    color: 'green',
    marginVertical: 5,
  },
  selectButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  otherBicyclesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  otherBicyclesContainer: {
    paddingHorizontal: 16,
  },
  bicycleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  bicycleItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  bicycleInfo: {
    flex: 1,
  },
  bicycleItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bicycleItemColor: {
    fontSize: 12,
    color: '#6c757d',
  },
  bicycleItemStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectItemButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});