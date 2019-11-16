import {
  StyleSheet,
  View,
  Text,
  Switch,
  Image,
  FlatList,
  TextInput
} from "react-native";
import React, { Component } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import {
  ScrollView,
  FlingGestureHandler,
  Directions,
  State
} from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import SearchCard from "./Component/SearchCard.js";
const GOOGLE_APIKEY = "AIzaSyBENXLjKiK-C2Q1Y0K4uKDB579jkP1-nbg";

let latlngLoo = {
  latitude: 43.4643,
  longitude: -80.5204,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};
let latlngStrat = {
  latitude: 43.3682,
  longitude: -80.9821,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class SearchRideScreen extends Component {
  state = { input: true, fontLoaded: false };

  async componentDidMount() {
    await Font.loadAsync({
      gothic: require("../../../assets/fonts/gothic.ttf"),
      gothicBold: require("../../../assets/fonts/gothicBold.ttf"),
      gothicBoldItalic: require("../../../assets/fonts/gothicBoldItalic.ttf"),
      gothicItalic: require("../../../assets/fonts/gothicItalic.ttf")
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <MapView
          style={{ flex: 1 }}
          ref={ref => {
            this.mapRef = ref;
          }}
          onLayout={() =>
            this.mapRef.fitToCoordinates([latlngLoo, latlngStrat], {
              edgePadding: { top: 10, right: 50, bottom: 10, left: 50 },
              animated: true
            })
          }
          region={{
            latitude: 43.4643,
            longitude: -80.5204,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            coordinate={latlngLoo}
            pinColor="#55d88a"
            anchor={{ x: 0.5, y: 0.5 }}
          ></Marker>
          <Marker
            pinColor="#03aa47"
            coordinate={latlngStrat}
            anchor={{ x: 0.5, y: 0.5 }}
          ></Marker>
        </MapView>

        <SearchCard
          location="Waterloo University"
          region="Waterloo,ON"
          street="280 University Ave. W"
          endLocation="Stratford School"
          endStreet="125 St Patrick St"
          endRegion="Stratford, ON"
          style={{
            position: "absolute",
            bottom: 50
          }}
        ></SearchCard>
      </View>
    );
  }
}
