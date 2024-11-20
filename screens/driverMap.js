import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import * as Location from "expo-location";
import { Database } from "firebase/database";
import { ref, set } from "firebase/database";

const DriverMap = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const sendLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    // Save to Firebase
    set(ref(database, "driver/location"), {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  return (
    <View>
      <Button title="Send Location" onPress={sendLocation} />
      {location && (
        <Text>
          Latitude: {location.coords.latitude}, Longitude:{" "}
          {location.coords.longitude}
        </Text>
      )}
    </View>
  );
};

export default DriverMap;
