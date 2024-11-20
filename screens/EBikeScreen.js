import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";

const EBikeScreen = ({ navigation }) => {
  const ebikes = [
    { id: "1", name: "Sepeda 01ELB", color: "Warna merah", available: true, image: require("../assets/SL-Red.png") },
    { id: "2", name: "Sepeda 02ELB", color: "Warna hitam", available: true, image: require("../assets/SL-Black.png") },
    { id: "3", name: "Sepeda 03ELB", color: "Warna kuning", available: false, image: require("../assets/SL-Yellow.png") },
    { id: "4", name: "Sepeda 04ELB", color: "Warna biru", available: true, image: require("../assets/SL-Blue.png") },
    { id: "5", name: "Sepeda 05ELB", color: "Warna pink", available: true, image: require("../assets/SL-Pink.png") },
    { id: "6", name: "Sepeda 06ELB", color: "Warna cream", available: true, image: require("../assets/SL-Cream.png") },
  ];

  const renderEBikeItem = ({ item }) => (
    <View style={styles.bikeItem}>
      <Image source={item.image} style={styles.bikeImage} />
      <View style={styles.bikeInfo}>
        <Text style={styles.bikeName}>{item.name}</Text>
        <Text style={styles.bikeColor}>{item.color}</Text>
      </View>
      {item.available ? (
        <TouchableOpacity
          style={styles.availableButton}
          onPress={() => navigation.navigate("EBikeDetailScreen", { bike: item })} // Pass bike data to EBikeDetails screen
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
      <TextInput style={styles.searchInput} placeholder="Perlu Sepeda Listrik? Mau Kemana?" />
      <FlatList
        data={ebikes}
        renderItem={renderEBikeItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  bikeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  bikeImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  bikeInfo: {
    flex: 1,
    marginLeft: 15,
  },
  bikeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bikeColor: {
    fontSize: 14,
    color: "#777",
  },
  availableButton: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  unavailableText: {
    color: "#ff4d4d",
    fontWeight: "bold",
  },
});

export default EBikeScreen;
