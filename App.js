import { createStackNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "./src/screens/Home/HomeScreen.js";
import MessageScreen from "./src/screens/Message/MessageScreen.js";
import ProfileScreen from "./src/screens/Profile/ProfileScreen.js";
import SearchScreen from "./src/screens/Search/SearchScreen.js";

const navigator = createBottomTabNavigator(
  {
    Home: HomeScreen,

    Search: SearchScreen,
    Message: MessageScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        if (routeName == "Home") {
          return (
            <Ionicons
              name="ios-car"
              size={32}
              color={tintColor}
              onPress={() => navigation.navigate("Home")}
            ></Ionicons>
          );
        } else if (routeName == "Search") {
          return (
            <Ionicons
              name="ios-search"
              size={32}
              color={tintColor}
              onPress={() => navigation.navigate("Search")}
            ></Ionicons>
          );
        } else if (routeName == "Message") {
          return (
            <MaterialIcons
              name="message"
              size={32}
              color={tintColor}
              onPress={() => navigation.navigate("Message")}
            ></MaterialIcons>
          );
        } else {
          return (
            <FontAwesome
              name="user-circle"
              size={32}
              color={tintColor}
              onPress={() => navigation.navigate("Profile")}
            ></FontAwesome>
          );
        }
      },
      tabBarOptions: {
        activeTintColor: "white",
        inactiveTintColor: "#55d88a",
        activeBackgroundColor: "#55d88a",
        inactiveBackgroundColor: "#efefef",
        showLabel: false,
        style: {
          height: 65,
          paddingHorizontal: 24,
          backgroundColor: "#efefef",
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 15
        }
      }
    })
  }
);

export default createAppContainer(navigator);
