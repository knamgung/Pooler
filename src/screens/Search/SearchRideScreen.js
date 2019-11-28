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
  State,
  TouchableHighlight
} from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import SearchCard from "./Component/SearchCard.js";
const GOOGLE_APIKEY = "AIzaSyBENXLjKiK-C2Q1Y0K4uKDB579jkP1-nbg";
const uri =
  "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A";

export default class SearchRideScreen extends Component {
  state = { input: true, fontLoaded: false, data: this.props };

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
    const { navigation } = this.props.navigation.state.params;
    const {
      startLocation,
      endLocation
    } = this.props.navigation.state.params.data;

    return (
      <View style={{ width: "100%", height: "100%" }}>
        <MapView
          style={{ flex: 1 }}
          ref={ref => {
            this.mapRef = ref;
          }}
          onLayout={() =>
            this.mapRef.fitToCoordinates(
              [startLocation.maps, endLocation.maps],
              {
                edgePadding: { top: 10, right: 50, bottom: 10, left: 50 },
                animated: true
              }
            )
          }
          region={startLocation.maps}
        >
          <Marker
            coordinate={startLocation.maps}
            pinColor="#55d88a"
            anchor={{ x: 0.5, y: 0.5 }}
          ></Marker>
          <Marker
            pinColor="#03aa47"
            coordinate={endLocation.maps}
            anchor={{ x: 0.5, y: 0.5 }}
          ></Marker>
        </MapView>

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="white"
          onPress={() => {
            navigation.navigate("SearchDetail", {
              data: this.props.navigation.state.params.data
            });
          }}
        >
          <SearchCard
            data={this.props.navigation.state.params.data}
          ></SearchCard>
        </TouchableHighlight>
      </View>
    );
  }
}
