import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");

      console.log("🔐 Stored Token:", token);

      if (token) {
        navigation.replace("Main"); // already logged in
      } else {
        navigation.replace("Login"); // not logged in
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}