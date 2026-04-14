import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function HomeScreen() {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);

  return (
    <View style={styles.container}>
      {/* 📍 Pickup Input */}
      <GooglePlacesAutocomplete
        placeholder="Enter pickup location"
        minLength={2}
        fetchDetails={true}
        onPress={(data, details = null) => {
          setPickup(data.description);
          console.log("Pickup:", data.description);
        }}
        query={{
          key: "YOUR_GOOGLE_API_KEY",
          language: "en",
          components: "country:in",
        }}
        styles={{
          textInput: styles.input,
          container: styles.inputContainer,
        }}
      />

      {/* 🏁 Drop Input */}
      <GooglePlacesAutocomplete
        placeholder="Enter drop location"
        minLength={2}
        fetchDetails={true}
        onPress={(data, details = null) => {
          setDrop(data.description);
          console.log("Drop:", data.description);
        }}
        query={{
          key: "YOUR_GOOGLE_API_KEY",
          language: "en",
          components: "country:in",
        }}
        styles={{
          textInput: styles.input,
          container: styles.inputContainer,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});