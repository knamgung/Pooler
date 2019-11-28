import {
  StyleSheet,
  View,
  Text,
  Switch,
  Image,
  FlatList,
  Button,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import React, { Component } from "react";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import Svg, { Path } from "react-native-svg";

import { ScrollView } from "react-native-gesture-handler";
import SearchScreen from "./SearchScreen.js";
import { white } from "ansi-colors";
import CreateRequest from "./CreateRequest.js";

import json from "../../../data.json";
const rides = json.available;
export default class RequestPool extends Component {
  state = { input: true, fontLoaded: false, createReq: false, rides: rides };

  async componentDidMount() {
    await Font.loadAsync({
      gothic: require("../../../assets/fonts/gothic.ttf"),
      gothicBold: require("../../../assets/fonts/gothicBold.ttf"),
      gothicBoldItalic: require("../../../assets/fonts/gothicBoldItalic.ttf"),
      gothicItalic: require("../../../assets/fonts/gothicItalic.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  createPool = () => {
    this.setState({ createReq: !this.state.createReq });
  };
  render() {
    const { navigation } = this.props;
    const { fontLoaded, input, createReq, rides } = this.state;
    if (fontLoaded && input) {
      if (createReq) {
        return <CreateRequest navigation={navigation}></CreateRequest>;
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.container} name="header">
              <View style={styles.existCar}>
                <View style={styles.headerBox}>
                  <Text style={styles.header}>Your Requests</Text>
                </View>
                <View style={styles.switchView}>
                  <Text style={styles.request}>Request Carpools</Text>
                  <Switch
                    value={this.state.input}
                    onValueChange={value => {
                      this.setState({
                        input: value
                      });
                    }}
                  ></Switch>
                </View>
              </View>
              <View style={styles.locationView}>
                <CreatePoolRequest
                  navigation={navigation}
                  createPool={this.createPool}
                ></CreatePoolRequest>
              </View>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 200 }}
              >
                <FlatList
                  data={rides}
                  keyExtractor={(item, index) => index}
                  style={{ marginBottom: 50 }}
                  renderItem={({ item }) => {
                    return <RideCard rides={item}></RideCard>;
                  }}
                ></FlatList>
              </ScrollView>
            </View>
          </View>
        );
      }
    } else if (fontLoaded && !input) {
      return <SearchScreen></SearchScreen>;
    } else {
      return <Text>Loading</Text>;
    }
  }
}

const LocationInfo = ({ locations }) => {
  const { place, street, region } = locations;
  return (
    <View>
      <Text style={styles.locationText}>{place}</Text>
      <Text style={styles.streetText}>{street}</Text>
      <Text style={styles.streetText}>{region}</Text>
    </View>
  );
};

const SvgComponent = props => (
  <Svg viewBox="0 0 32 156" {...props}>
    <Path
      fill="#55d88a"
      d="M17.3 109.1V28.3c7-.8 12.5-6.7 12.5-14 0-7.8-6.3-14.1-14-14.1s-14 6.3-14 14.1c0 7.2 5.5 13.2 12.5 14v80.8c-8.1.8-14.5 7.6-14.5 16 0 3.6 2.1 9 6.6 17 3.1 5.5 6.1 10.1 6.2 10.3l2.2 3.3c.2.3.6.5 1 .5s.8-.2 1-.5l2.2-3.3c.1-.2 3.1-4.8 6.2-10.3 4.5-8 6.6-13.5 6.6-17 0-8.4-6.4-15.2-14.5-16zM5.8 14.4c0-5.5 4.5-10.1 10-10.1s10 4.5 10 10.1c0 5.5-4.5 10.1-10 10.1s-10-4.6-10-10.1zm10 119.5c-4.9 0-8.9-4-8.9-8.9s4-8.9 8.9-8.9 8.9 4 8.9 8.9-4 8.9-8.9 8.9z"
    />
  </Svg>
);

const RideInfo = ({ depart }) => {
  const { walkTime, timeStart, timeStartEnd } = depart;
  return (
    <View>
      <View style={styles.departBlock}>
        <Text style={styles.subhead}>Depart</Text>
        <Text style={styles.walkDepart}>
          {timeStart} -{"\n"}
          {timeStartEnd}
        </Text>
      </View>
      <View style={styles.walkBlock}>
        <Ionicons
          name="ios-walk"
          size={30}
          color="#c2c2c2"
          style={{ marginRight: 6 }}
        ></Ionicons>
        <View>
          <Text style={styles.subhead}>Walking</Text>
          <Text style={styles.timeWalk}>{walkTime}</Text>
        </View>
      </View>
    </View>
  );
};

const CreatePoolRequest = ({ navigation, createPool }) => {
  return (
    <TouchableOpacity onPress={createPool}>
      <View style={styles.createPool}>
        <Text style={styles.createPoolText}>Create a{"\n"}carpool request</Text>
        <FontAwesome name="plus" color="#55d88a" size={50}></FontAwesome>
      </View>
    </TouchableOpacity>
  );
};

const RideCard = ({ rides }) => {
  const { startLocation, endLocation, depart, days } = rides;
  return (
    <View style={styles.rideCard}>
      <View style={styles.rideLocation}>
        <View style={styles.endStartView}>
          <SvgComponent style={styles.destinSVG}></SvgComponent>
          <View style={{ flexDirection: "column" }}>
            <LocationInfo locations={startLocation}></LocationInfo>
            <LocationInfo locations={endLocation}></LocationInfo>
          </View>
        </View>

        <RideInfo depart={depart}></RideInfo>
      </View>
      <View style={styles.userInfo}>
        <Dates days={days}></Dates>
      </View>
    </View>
  );
};

class Dates extends Component {
  state = {
    dates: this.props.days
  };

  render() {
    return (
      <ScrollView>
        <FlatList
          keyExtractor={(item, index) => index}
          horizontal
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
  existCar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  container: {
    backgroundColor: "#fff",
    fontFamily: "gothicBold",
    marginTop: 30
  },
  scrollView: {
    alignContent: "space-around",

    borderBottomWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    flexGrow: 1,

    backgroundColor: "white",
    elevation: 10
  },
  test: {
    flexDirection: "row"
  },
  test2: { flexDirection: "row", alignItems: "center" },
  header: {
    fontFamily: "gothicBoldItalic",
    color: "white",
    marginRight: 30
  },
  headerBox: {
    backgroundColor: "#55d88a",
    justifyContent: "center",

    height: 30,
    width: 200,
    paddingLeft: 24,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  switchView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24
  },
  request: {
    fontFamily: "gothic",
    color: "#c2c2c2",
    fontSize: 14
  },
  locationText: {
    fontFamily: "gothicBold",
    fontSize: 16
  },
  streetText: {
    color: "#c2c2c2",
    fontFamily: "gothic"
  },
  subhead: {
    fontFamily: "gothicBold",
    color: "black",
    fontSize: 13
  },
  timeWalk: {
    fontFamily: "gothicBold",
    color: "#c2c2c2",
    fontSize: 15
  },
  walkDepart: {
    fontFamily: "gothicBold",
    color: "#55d88a",
    fontSize: 15
  },
  walkBlock: {
    borderColor: "#c2c2c2",
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 4,

    width: 100
  },
  departBlock: {
    borderColor: "#c2c2c2",
    borderWidth: 1.5,
    width: 100,
    marginBottom: 5,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  date: {
    color: "#c2c2c2",
    fontFamily: "gothicBold",
    fontSize: 14,
    paddingHorizontal: 20
  },

  rideLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20
  },
  rideCard: {
    width: "100%",

    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomColor: "black",
    paddingTop: 15,
    flexGrow: 1
  },
  rideContent: {
    backgroundColor: "white",

    borderTopColor: "black",
    paddingTop: 15,
    flexGrow: 1
  },
  destinSVG: {
    width: 40,
    height: 90
  },
  endStartView: {
    flexDirection: "row",
    alignItems: "center"
  },
  dateButton: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12.5,
    height: 30,

    width: 50
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
  userInfo: {
    flexDirection: "row",
    paddingVertical: 20,
    marginTop: 20,
    borderColor: "#c2c2c2",
    borderBottomWidth: 0.8
  },

  createPool: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },

  createPoolText: {
    fontFamily: "gothicBold",
    fontSize: 20
  },
  locationView: {
    borderColor: "#c2c2c2",
    borderWidth: 1,

    marginVertical: 18,
    paddingVertical: 8,
    marginHorizontal: 24,
    justifyContent: "center",

    borderRadius: 15
  }
});
