import React from "react";
import { View, Text, StyleSheet } from "react-native";

import * as Location from "expo-location";
import { useEffect, useState } from "react";

import { TouchableOpacity } from "react-native";

import API from "../api/api";

import { useNavigation } from "@react-navigation/native";

export default function RideDetails({ route }) {
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const { rideDetails } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        // 📍 Pickup address
        const pickup = await Location.reverseGeocodeAsync({
          latitude: rideDetails.pickupLat,
          longitude: rideDetails.pickupLon,
        });

        if (pickup.length > 0) {
          const p = pickup[0];
          setPickupAddress(
            [p.name, p.street, p.city, p.region].filter(Boolean).join(", "),
          );
        }

        // 📍 Drop address
        const drop = await Location.reverseGeocodeAsync({
          latitude: rideDetails.dropLat,
          longitude: rideDetails.dropLon,
        });

        if (drop.length > 0) {
          const d = drop[0];
          setDropAddress(
            [d.name, d.street, d.city, d.region].filter(Boolean).join(", "),
          );
        }
      } catch (err) {
        console.log("Error getting address:", err);
      }
    };

    getAddresses();
  }, []);

  const requestRide = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await API.post(
        "/ride/request",
        {
          userId: 1,
          pickupLocation: pickupAddress,
          dropLocation: dropAddress,
          status: "REQUESTED",
          fare: rideDetails.distance * 10,
        },
        {
          params: {
            lat: rideDetails.pickupLat,
            lng: rideDetails.pickupLon,
          },
        },
      );

    //   navigation.navigate("SearchingDriver", {
    //     ride: response.data,
    //   });
    alert("🚗 Ride requested successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to request ride");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Ride Details</Text>

      <Text>📍 Pickup Location:</Text>
      <Text>{pickupAddress || "Loading..."}</Text>

      <Text style={{ marginTop: 10 }}>📍 Drop Location:</Text>
      <Text>{dropAddress || "Loading..."}</Text>

      <Text style={styles.distance}>
        📏 Distance: {rideDetails.distance} KM
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          (!pickupAddress || !dropAddress || loading) && {
            backgroundColor: "gray",
          },
        ]}
        onPress={requestRide}
        disabled={!pickupAddress || !dropAddress || loading}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "⏳ Requesting..."
            : pickupAddress && dropAddress
              ? "🚀 Confirm Ride"
              : "⏳ Loading..."}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  distance: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    marginTop: 30,
    backgroundColor: "green",
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
