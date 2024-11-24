import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

export default function PeminjamanScreen({ route }) {
  const { bike } = route.params; // Mengambil data sepeda yang dipilih
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState('');
  const [photo, setPhoto] = useState(null);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleFileUpload = async () => {
    console.log('Memulai pemilihan foto...');
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Permission Result:', permissionResult);
  
    if (!permissionResult.granted) {
      Alert.alert('Izin diperlukan!', 'Aplikasi membutuhkan akses ke galeri.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    console.log('Hasil pemilihan gambar:', result);
  
    if (result.canceled) {
      Alert.alert('Pemilihan gambar dibatalkan', 'Tidak ada gambar yang dipilih.');
      return;
    }
  
    if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
      console.log('Foto yang dipilih:', result.assets[0].uri);
    } else {
      Alert.alert('Gagal memilih gambar', 'Tidak ada gambar yang dipilih.');
    }
  };


  const handleSubmit = () => {
    if (!name || !nim || !time || !photo) {
      Alert.alert('Kesalahan', 'Harap lengkapi semua data!');
      return;
    }

    console.log({
      name,
      nim,
      date,
      time,
      photo,
    });

    Alert.alert('Berhasil!', 'Peminjaman berhasil dipesan.');
  };

  return (
    <View style={styles.container}>
    {/* Bagian Detail Barang */}
    <Text style={styles.title}>Detail Barang</Text>

    {/* Gambar Sepeda */}
    <Image source={bike.image} style={styles.bikeImage} />
    <Text style={styles.itemTitle}>{bike.name}</Text>
    <Text style={styles.itemDetail}>{bike.color}</Text>

      {/* Bagian Detail Peminjaman */}
      <Text style={styles.title}>Detail Peminjaman</Text>

      {/* Input Nama */}
      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={name}
        onChangeText={setName}
      />

      {/* Input NIM */}
      <TextInput
        style={styles.input}
        placeholder="NIM"
        keyboardType="number-pad"
        value={nim}
        onChangeText={setNim}
      />

      {/* Input Tanggal */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Input Waktu */}
      <TextInput
        style={styles.input}
        placeholder="Pilih Waktu (contoh: 10:00 AM)"
        value={time}
        onChangeText={setTime}
      />

      {/* Upload Foto KPM */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
        <Text>Pilih Foto KPM</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={styles.imagePreview} />}

      {/* Tombol Pesan */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>PESAN SEKARANG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  itemDetail: {
    fontSize: 14,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  uploadButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 5,
  },
  bikeImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },  
});
