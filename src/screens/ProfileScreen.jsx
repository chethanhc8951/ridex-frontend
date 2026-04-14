import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function ProfileScreen({ navigation }) {
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            console.log("User logged out");
            
            // 👉 Clear token (if using AsyncStorage later)
            // await AsyncStorage.removeItem("token");

            navigation.replace("Login"); // go back to login screen
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      {/* 👤 PROFILE HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>C</Text>
        </View>
        <Text style={styles.name}>Chethan HC</Text>
        <Text style={styles.email}>chethan@example.com</Text>
      </View>

      {/* 📋 OPTIONS */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>🚕 My Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>💳 Payment Methods</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>

      {/* 🚪 LOGOUT BUTTON */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  email: {
    color: "gray",
    marginTop: 5,
  },

  options: {
    marginTop: 20,
  },

  option: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
  },

  optionText: {
    fontSize: 16,
  },

  logoutButton: {
    marginTop: "auto",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});