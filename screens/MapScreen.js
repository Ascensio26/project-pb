import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Database } from "firebase/database";
import { ref, onValue } from "firebase/database";

const UserApp = () => {
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    const locationRef = ref(database, "driver/location");
    onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDriverLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: driverLocation?.latitude || 37.78825,
          longitude: driverLocation?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Driver"
            description="Current location of the driver"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default UserApp;
