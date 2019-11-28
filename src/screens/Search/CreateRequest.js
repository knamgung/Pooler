import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Image,
  FlatList,
  TextInput,
  Platform,
  Button,
  TimePickerAndroid
} from "react-native";
import * as Font from "expo-font";
import { Entypo } from "@expo/vector-icons";
const axios = require("axios");
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
import Svg, { Path, Circle } from "react-native-svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import { white } from "ansi-colors";
import RequestPoolScreen from "./RequestPoolScreen.js";
import json from "../../../data.json";
import { create } from "uuid-js";
const ride = json.rides;
const GOOGLE_APIKEY = "AIzaSyBENXLjKiK-C2Q1Y0K4uKDB579jkP1-nbg";
const KEY = "8c9680332dff40";
import MapView, { Marker } from "react-native-maps";

export default class CreateRequest extends Component {
  state = {
    input: true,
    fontLoaded: false,
    chosenTime: "Select Depart Time",
    createRequest: true,
    startLocation: null,
    startLoc: "",
    endLoc: "",
    endLocation: null,
    mapLoad: true
  };
  startLocChange = text => {
    this.setState({ startLoc: text });
  };
  endLocChange = text => {
    this.setState({ endLoc: text });
  };
  async componentDidMount() {
    await Font.loadAsync({
      gothic: require("../../../assets/fonts/gothic.ttf"),
      gothicBold: require("../../../assets/fonts/gothicBold.ttf"),
      gothicBoldItalic: require("../../../assets/fonts/gothicBoldItalic.ttf"),
      gothicItalic: require("../../../assets/fonts/gothicItalic.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  SetTimeAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        const m = minute < 10 ? `0${minute}` : minute;
        const h = hour < 10 ? `0${hour}` : hour;
        console.log(`time: ${hour}:${minute}`);
        this.setState({ chosenTime: `${h}:${m}` });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };

  getMapInfo = () => {
    console.log(this.state.startLoc, this.state.endLoc);
    axios
      .get(
        `https://us1.locationiq.com/v1/search.php?key=${KEY}&q=${this.state.startLoc}&format=json`
      )
      .then(response => {
        console.log(response.data);
        const latLong = {
          latitude: parseFloat(response.data[0].lat),
          longitude: parseFloat(response.data[0].lon),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };
        this.setState({ startLocation: latLong });
      })
      .then(() =>
        axios
          .get(
            `https://us1.locationiq.com/v1/search.php?key=${KEY}&q=${this.state.endLoc}&format=json`
          )
          .then(response => {
            const latLong = {
              latitude: parseFloat(response.data[0].lat),
              longitude: parseFloat(response.data[0].lon),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            };
            this.setState({ endLocation: latLong }, () => {
              this.setState({ mapLoad: false });
            });
          })
      );
  };

  render() {
    const {
      chosenTime,
      createRequest,
      mapLoad,
      startLocation,
      endLocation
    } = this.state;
    const { navigation } = this.props;
    console.log("HELLO", startLocation, endLocation);

    if (createRequest) {
      return (
        <ScrollView style={{ marginTop: 50 }}>
          <Entypo
            name="arrow-left"
            size={35}
            onPress={() => {
              this.setState({ createRequest: !createRequest });
            }}
            style={{ paddingLeft: 20, marginBottom: 10 }}
          ></Entypo>
          <View style={{ paddingHorizontal: 20 }}>
            <LocationInput
              getMapInfo={this.getMapInfo}
              startLocChange={this.startLocChange}
              endLocChange={this.endLocChange}
            ></LocationInput>
          </View>

          <View style={styles.depart}>
            <Text style={styles.departText}>Depart...</Text>
            <TouchableOpacity onPress={() => this.SetTimeAndroid()}>
              <View style={styles.pickTime}>
                <Text style={styles.pickText}>{chosenTime}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Dates></Dates>
          {mapLoad ? null : (
            <MapComp
              startLocation={startLocation}
              endLocation={endLocation}
            ></MapComp>
          )}
        </ScrollView>
      );
    } else {
      return <RequestPoolScreen></RequestPoolScreen>;
    }
  }
}

const InputSVG = props => (
  <Svg style={{ width: 50, height: 50 }} viewBox="0 0 27.3 77" {...props}>
    <Path
      fill="#c2c2c2"
      d="M13.6 27.3C6.1 27.3 0 21.2 0 13.6 0 6.1 6.1 0 13.6 0s13.6 6.1 13.6 13.6c.1 7.6-6 13.7-13.6 13.7zm0-23.3C8.3 4 4 8.3 4 13.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6C23.3 8.3 19 4 13.6 4z"
    />
    <Circle fill="#c2c2c2" cx={13.6} cy={65.4} r={11.6} />
    <Path
      fill="#c2c2c2"
      d="M13.6 49c-1.4 0-2.5-1.1-2.5-2.5v-12c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v12c0 1.4-1.1 2.5-2.5 2.5z"
    />
  </Svg>
);

const LocationInput = ({ startLocChange, endLocChange, getMapInfo }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#c2c2c2",
        borderWidth: 1,
        borderRadius: 10
      }}
    >
      <InputSVG></InputSVG>
      <View style={styles.locationInputs}>
        <TextInput
          placeholder="Where From?"
          onChangeText={text => {
            startLocChange(text);
          }}
        ></TextInput>
        <TextInput
          placeholder="Where To?"
          onChangeText={text => {
            endLocChange(text);
          }}
          onEndEditing={() => {
            getMapInfo();
          }}
        ></TextInput>
      </View>
    </View>
  );
};

const MapComp = ({ startLocation, endLocation }) => {
  console.log(startLocation, endLocation);
  return (
    <View style={{ paddingHorizontal: 20, borderRadius: 20 }}>
      <MapView
        style={{ width: "100%", height: 300, marginTop: 20 }}
        ref={ref => {
          this.mapRef = ref;
        }}
        onLayout={() =>
          this.mapRef.fitToCoordinates([startLocation, endLocation], {
            edgePadding: { top: 10, right: 50, bottom: 10, left: 50 },
            animated: true
          })
        }
        region={startLocation}
      >
        <Marker
          coordinate={{
            latitude: startLocation.latitude,
            longitude: startLocation.longitude
          }}
          pinColor="#55d88a"
          anchor={{ x: 0.5, y: 0.5 }}
        ></Marker>
        <Marker
          pinColor="#03aa47"
          coordinate={{
            latitude: endLocation.latitude,
            longitude: endLocation.longitude
          }}
          anchor={{ x: 0.5, y: 0.5 }}
        ></Marker>
      </MapView>
      <TouchableOpacity style={styles.submit}>
        <View>
          <Text style={styles.submitRide}>Request Ride!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

class Dates extends Component {
  state = {
    dates: [
      {
        date: "Mon",
        value: false
      },
      {
        date: "Tue",
        value: false
      },
      {
        date: "Wed",
        value: false
      },
      {
        date: "Thu",
        value: false
      },
      {
        date: "Fri",
        value: false
      },
      {
        date: "Sat",
        value: false
      },
      {
        date: "Sun",
        value: false
      }
    ]
  };

  render() {
    return (
      <ScrollView>
        <FlatList
          horizontal
          keyExtractor={(item, index) => index}
          contentContainerStyle={{
            width: "100%",
            paddingHorizontal: 20,
            justifyContent: "space-between"
          }}
          data={this.state.dates}
          renderItem={item => {
            return (
              <TouchableOpacity
                color="#55d88a"
                style={
                  item.item.value
                    ? [styles.dateButton, styles.dateTrue]
                    : [styles.dateButton, styles.dateFalse]
                }
                onPress={() => {
                  let newDate = this.state.dates;

                  newDate[item.index].value = !item.item.value;
                  this.setState({
                    newDate: newDate
                  });
                }}
              >
                <Text
                  style={
                    item.item.value ? styles.dateText : styles.dateFalseText
                  }
                >{`${item.item.date}`}</Text>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    color: "#c2c2c2",
    fontFamily: "gothicBold",
    fontSize: 14,
    paddingHorizontal: 20
  },

  dateButton: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 85,

    width: 52
  },
  dateTrue: {
    backgroundColor: "#55d88a",
    borderColor: "#55d88a"
  },
  dateFalse: {
    backgroundColor: "white",
    borderColor: "#c2c2c2"
  },
  dateText: {
    fontFamily: "gothicBold",
    color: "white",
    fontSize: 12
  },
  dateFalseText: {
    fontFamily: "gothic",
    color: "#c2c2c2",
    fontSize: 12
  },
  pickTime: {
    backgroundColor: "#56d88a",
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    elevation: 5
  },
  pickText: {
    fontFamily: "gothicBoldItalic",
    fontSize: 18,
    color: "white"
  },
  locationInputs: {
    height: 70,
    justifyContent: "center"
  },
  depart: {
    paddingHorizontal: 20,
    marginTop: 30
  },
  departText: {
    fontSize: 24,
    fontFamily: "gothicBold",
    marginVertical: 12
  },
  submit: {
    width: "100%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,

    borderColor: "#56d88a",
    borderWidth: 3,
    borderRadius: 10
  },
  submitRide: {
    fontFamily: "gothicBold",
    fontSize: 20,
    color: "#56d88a"
  }
});
