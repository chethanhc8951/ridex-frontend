import React from "react";
import { Image } from "react-native"; // ✅ IMPORTANT
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import ServiceScreen from "../screens/ServiceScreen"; // ✅ ADD THIS
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarIcon: ({ focused }) => {
                    let icon;

                    if (route.name === "MapTab") {
                        icon = require("../../assets/icons/home.png");
                    } else if (route.name === "ProfileTab") {
                        icon = require("../../assets/icons/profile.png");
                    }else if (route.name === "ServiceTab") {
                        icon = require("../../assets/icons/service.png");
                    }

                      if (!icon) return null; // ✅ safety

                    return (
                        <Image
                            source={icon}
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: focused ? "black" : "gray",
                            }}
                            resizeMode="contain"
                        />
                    );
                },

                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="MapTab" component={MapScreen} options={{ title: "Map" }} />
            <Tab.Screen name="ServiceTab" component={ServiceScreen} options={{ title: "Service" }} />
            <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: "Profile" }} />
        </Tab.Navigator>
    );
}