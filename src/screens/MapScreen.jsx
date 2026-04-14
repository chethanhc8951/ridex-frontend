import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [rideDetails, setRideDetails] = useState(null);

  const debounceTimeout = useRef(null);

  useEffect(() => {
    (async () => {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        alert("Permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      console.log("📍 User Location:", loc.coords);
    })();
  }, []);

  // 📏 Distance Formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 🔍 Fetch suggestions (Nominatim)
  const handleInputChange = (text) => {
    setDestination(text);

    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            text,
          )}`,
          {
            headers: {
              "User-Agent": "ride-app",
            },
          },
        );

        const data = await res.json();
        setSuggestions(data.slice(0, 5));
      } catch (err) {
        console.log("API ERROR:", err);
      }
    }, 400);
  };

  // 📍 When user selects place
  const handleSelect = (place) => {
    setDestination(place.display_name);
    setSuggestions([]);

    if (!location) return;

    const pickupLat = location.latitude;
    const pickupLon = location.longitude;

    const dropLat = parseFloat(place.lat);
    const dropLon = parseFloat(place.lon);

    const dist = calculateDistance(pickupLat, pickupLon, dropLat, dropLon);

    const data = {
      pickupLat,
      pickupLon,
      dropLat,
      dropLon,
      distance: dist.toFixed(2),
    };

    setRideDetails(data);

    console.log("🚗 RIDE DETAILS:", data);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        {location ? (
          <>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} title="You" />
            </MapView>

            {/* 🔥 Bottom Ride Panel */}
            <View style={styles.bottomPanel}>
              <Text style={styles.title}>Where to?</Text>

              {/* 🔍 Input */}
              <TextInput
                placeholder="Enter drop location"
                value={destination}
                onChangeText={handleInputChange}
                style={styles.input}
              />

              {/* 🔽 Suggestions */}
              {suggestions.length > 0 && (
                <FlatList
                  data={suggestions}
                  keyExtractor={(item) => item.place_id.toString()}
                  style={styles.list}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelect(item)}>
                      <Text style={styles.item}>{item.display_name}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (!rideDetails) {
                    alert("Please select destination first");
                    return;
                  }

                  navigation.navigate("RideDetails", { rideDetails });
                }}
              >
                <Text style={{ color: "white" }}>Book Ride</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
  },
  list: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 150,
  },
  item: {
    padding: 10,
    borderBottomWidth: 0.5,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
  },
});
