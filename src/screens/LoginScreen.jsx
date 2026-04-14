import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import API from "../api/api";
import { saveToken } from "../utils/storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("➡️ Login button clicked");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password);

    try {
      const res = await API.post("/api/auth/public/signin", {
        username: email,
        password,
      });

      console.log("✅ LOGIN SUCCESS RESPONSE:");
      console.log(res.data);

      await saveToken(res.data.jwtToken);
      console.log("💾 Token saved");
      navigation.replace("Main");
    } catch (err) {
      console.log("❌ LOGIN FAILED");

      if (err.response) {
        console.log("🔴 Status:", err.response.status);
        console.log("🔴 Data:", err.response.data);
        console.log("🔴 Headers:", err.response.headers);
      } else if (err.request) {
        console.log("🟡 No response received:", err.request);
      } else {
        console.log("⚠️ Error:", err.message);
      }
      alert("Login failed");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={{ backgroundColor: "black", padding: 15 }}
        onPress={handleLogin}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
