import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function EBikeDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sepeda Listrik</Text>
      </View>

      {/* Main EBike Section */}
      <View style={styles.mainEBikeContainer}>
        <Image
          source={require('../assets/SL-Red.png')} 
          style={styles.ebikeImage}
        />
        <Text style={styles.ebikeTitle}>Sepeda 01ELB</Text>
        <Text style={styles.ebikeColor}>Warna merah</Text>
        <Text style={styles.ebikeStatus}>Tersedia</Text>
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectButtonText}>PILIH</Text>
        </TouchableOpacity>
      </View>

      {/* Other EBikes Section */}
      <Text style={styles.otherEBikesTitle}>Lihat sepeda listrik lain</Text>
      <View style={styles.otherEBikesContainer}>
        {[
          { id: 1, name: 'Sepeda 02ELB', color: 'Warna pink', status: 'Tersedia', image: require('../assets/SL-Pink.png') },
          { id: 2, name: 'Sepeda 03ELB', color: 'Warna kuning', status: 'Tidak tersedia', image: require('../assets/SL-Yellow.png') },
          { id: 3, name: 'Sepeda 04ELB', color: 'Warna biru', status: 'Tersedia', image: require('../assets/SL-Blue.png') },
        ].map(ebike => (
          <View key={ebike.id} style={styles.ebikeItem}>
            <Image source={ebike.image} style={styles.ebikeItemImage} />
            <View style={styles.ebikeInfo}>
              <Text style={styles.ebikeItemTitle}>{ebike.name}</Text>
              <Text style={styles.ebikeItemColor}>{ebike.color}</Text>
              <Text style={[styles.ebikeItemStatus, { color: ebike.status === 'Tersedia' ? 'green' : 'red' }]}>{ebike.status}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.selectItemButton,
                { backgroundColor: ebike.status === 'Tersedia' ? '#007BFF' : '#ccc' },
              ]}
              disabled={ebike.status !== 'Tersedia'}
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
  mainEBikeContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  ebikeImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
  },
  ebikeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ebikeColor: {
    fontSize: 14,
    color: '#6c757d',
  },
  ebikeStatus: {
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
  otherEBikesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  otherEBikesContainer: {
    paddingHorizontal: 16,
  },
  ebikeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  ebikeItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  ebikeInfo: {
    flex: 1,
  },
  ebikeItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ebikeItemColor: {
    fontSize: 12,
    color: '#6c757d',
  },
  ebikeItemStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectItemButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});
