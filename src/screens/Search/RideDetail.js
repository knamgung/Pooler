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
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";

const GOOGLE_APIKEY = "AIzaSyBENXLjKiK-C2Q1Y0K4uKDB579jkP1-nbg";

import json from "../../../data.json";
const ride = json.rides;

export default class RideDetail extends Component {
  state = {
    input: true,
    fontLoaded: false,
    data: this.props.navigation.state.params.data
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
  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    console.log(data);
    return (
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          paddingTop: 20
        }}
      >
        <View style={styles.schedule}>
          <Text style={styles.scheduleTitle}>Carpool Schedule</Text>
          <FlatList
            horizontal
            data={data.days}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              if (item.value) {
                return (
                  <View style={[styles.dateButton, styles.dateTrue]}>
                    <Text
                      style={
                        item.value ? styles.dateText : styles.dateFalseText
                      }
                    >{`${item.date}`}</Text>
                  </View>
                );
              }
            }}
          ></FlatList>
        </View>
        <DropPick data={data}></DropPick>
        <PoolMates
          driver={data.driver}
          data={data}
          navigation={navigation}
        ></PoolMates>
      </ScrollView>
    );
  }
}

const SvgComponent = props => (
  <Svg viewBox="0 0 32 156" {...props}>
    <Path
      fill="#56d88a"
      d="M17.3 109.1V28.3c7-.8 12.5-6.7 12.5-14 0-7.8-6.3-14.1-14-14.1s-14 6.3-14 14.1c0 7.2 5.5 13.2 12.5 14v80.8c-8.1.8-14.5 7.6-14.5 16 0 3.6 2.1 9 6.6 17 3.1 5.5 6.1 10.1 6.2 10.3l2.2 3.3c.2.3.6.5 1 .5s.8-.2 1-.5l2.2-3.3c.1-.2 3.1-4.8 6.2-10.3 4.5-8 6.6-13.5 6.6-17 0-8.4-6.4-15.2-14.5-16zM5.8 14.4c0-5.5 4.5-10.1 10-10.1s10 4.5 10 10.1c0 5.5-4.5 10.1-10 10.1s-10-4.6-10-10.1zm10 119.5c-4.9 0-8.9-4-8.9-8.9s4-8.9 8.9-8.9 8.9 4 8.9 8.9-4 8.9-8.9 8.9z"
    />
  </Svg>
);

const LocationInfo = ({ location }) => {
  const { place, street, region } = location;
  console.log(place, street, region);
  return (
    <View>
      <Text style={styles.locationText}>{place}</Text>
      <Text style={styles.streetText}>{street}</Text>
      <Text style={styles.streetText}>{region}</Text>
    </View>
  );
};

const DropPick = ({ data }) => {
  const { startLocation, endLocation, depart, carpool, driver, price } = data;
  return (
    <View>
      <View style={styles.dropPick}>
        <View>
          <MaterialCommunityIcons
            name="car-side"
            size={30}
            color="#56d88a"
          ></MaterialCommunityIcons>
          <Text style={styles.travelTime}>1h{"\n"}15min</Text>
        </View>
        <SvgComponent style={styles.destinSVG}></SvgComponent>
        <View style={styles.address}>
          <View style={styles.startLocation}>
            <LocationInfo location={startLocation}></LocationInfo>
            <View style={styles.time}>
              <Text style={styles.timeHead}>Pick Up</Text>
              <Text style={styles.timeSub}>{depart.timeStart}</Text>
            </View>
          </View>
          <View style={styles.endLocation}>
            <LocationInfo location={endLocation}></LocationInfo>
            <View style={styles.time}>
              <Text style={styles.timeHead}>Drop Off</Text>
              <Text style={styles.timeSub}>{depart.timeDropOff}</Text>
            </View>
          </View>
        </View>
      </View>
      <Payment price={price}></Payment>
      <DriverProfile driver={driver} carpool={carpool}></DriverProfile>
    </View>
  );
};

const Payment = ({ price }) => {
  return (
    <View style={styles.pay}>
      <View style={styles.payTotal}>
        <Text style={styles.payHead}>Total</Text>
        <Text style={styles.paySub}>{price.cost}</Text>
      </View>
      <TextInput
        style={styles.payInput}
        placeholder="Add payment method"
      ></TextInput>
    </View>
  );
};

const DriverProfile = ({ driver, carpool }) => {
  const { profilePic, hometown, school } = driver;
  return (
    <View>
      <View style={styles.driver}>
        <Image
          style={{ width: 125, height: 125, borderRadius: 100 }}
          source={{
            uri: profilePic
          }}
        ></Image>
        <View style={styles.driverBody}>
          <RideProfileInfo driver={driver}></RideProfileInfo>
          <View style={styles.driverInfo}>
            <View style={styles.driverInfoEach}>
              <Text style={styles.driverHead}>Hometown</Text>
              <Text style={styles.driverSub}>{hometown}</Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.driverHead}>School</Text>
              <Text style={styles.driverSub}>{school}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15
        }}
      >
        <Text
          style={{ fontSize: 18, fontFamily: "gothicBold", marginRight: 10 }}
        >
          Your{"\n"}poolmates
        </Text>
        <FlatList
          data={carpool}
          keyExtractor={(item, index) => index}
          horizontal
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: "center", marginHorizontal: 7.5 }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                  source={{
                    uri: item.profilePic
                  }}
                ></Image>
                <Text style={styles.poolName}>{item.name}</Text>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const RideProfileInfo = ({ driver }) => {
  return (
    <View style={styles.profile}>
      <View>
        <Text style={styles.name}>{driver.displayName}</Text>
        <View style={styles.stars}>
          <FlatList
            horizontal
            keyExtractor={(item, index) => index}
            style={{ marginRight: 4 }}
            data={[
              { value: "star" },
              { value: "star" },
              { value: "star" },
              { value: "star" },
              { value: "star" }
            ]}
            renderItem={({ item }) => (
              <FontAwesome
                name={item.value}
                size={9.75}
                color="#b4c083"
                style={{ marginRight: 2 }}
              ></FontAwesome>
            )}
          />
          <Text style={styles.trips}>{`| ${driver.totalTrips} Trips`}</Text>
        </View>
        {driver.verified ? <Text style={styles.verified}>Verified</Text> : null}
      </View>
    </View>
  );
};
const DiveSvg = props => (
  <Svg style={{ width: 50, height: 50 }} viewBox="0 0 32 32" {...props}>
    <Path
      fill="#56d88a"
      d="M20.7 20.1c1.4.1 2.3.7 2.6 1.9.3 1.1.1 2.4-.7 3.2-.8-.9-1-2.2-1.6-3.3.2 1 .4 2.1.6 3.1 0 .2.2.3.3.4.7 1.1 1.5 2.1 2.2 3.2-.4.2-.9.5-1.3.7-.1.1-.3.1-.4.1-.6-.2-1.1-.4-1.5-.9-.2-.2-.3-.4-.4-.6-.8-.9-1.2-2-1.4-3.3-.2-1.3-.5-2.5-.7-3.8-.3.2-.6.4-.8.7-.1.1-.1.2 0 .3.3 1.5.6 3 1 4.5 0 .2.1.3.2.4.4.6.9 1.3 1.4 1.9-.1 0-.2.1-.2.1-.7 0-1.3.2-1.8.6-.3.2-.4.2-.7-.1-.7-.9-1.1-1.9-1.3-3.1-.2-1.2-.5-2.4-.8-3.6l-.3-.9c-1.5-2.7-3-5.5-4.5-8.2-.2-.3-.3-.4-.6-.5-1.8-.6-3.5-1.2-5.3-1.7-.4-.1-.8-.4-1-.9-1-1.8-2.1-3.6-3.1-5.4-.8-1-.6-2 0-2.5 1.4 2.2 2.7 4.4 4 6.7.6 1.1 1.4 1.6 2.5 1.4.6-.1 1.2-.1 1.9-.1.1 0 .2 0 .4-.1-1-.2-1.9-.4-2.9-.6-.4 0-.8-.3-1-.7-1.3-2.1-2.6-4.2-3.8-6.3-.5-.8-.4-1.8.2-2.4.6-.5 1.5-.4 1.9.4C5 2.6 6.1 4.5 7.2 6.3c.1.2.3.3.5.3 2 .4 3.9.8 5.9 1.2 1 .2 1.8.9 2.4 1.9 1.4 2.7 2.8 5.5 4.2 8.2.2.5.3 1.1.5 1.6-.1.3 0 .5 0 .6z"
    />
    <Path
      fill="#56d88a"
      d="M32 30.8c0 .6-.5.9-.9.7-.8-.5-1.4-.3-2.2.1-.9.6-1.9.5-2.8 0-.7-.5-1.4-.5-2.2 0-1 .6-2 .6-2.9 0-.7-.5-1.4-.5-2.1 0-1 .6-2 .6-3 0-.7-.4-1.4-.5-2.1 0-1 .6-2 .6-3 0-.7-.4-1.4-.4-2.1 0-1 .6-1.9.6-2.9 0-.4-.3-.6-.7-.4-1.1.2-.4.5-.5 1-.3.6.3 1.2.3 1.8-.1 1.1-.7 2.1-.7 3.2 0 .6.4 1.3.4 1.9 0 1-.7 2.1-.7 3.1 0 .7.4 1.3.4 1.9 0 1-.7 2.1-.7 3.1 0 .6.4 1.3.4 1.9 0 1.1-.7 2.1-.7 3.2 0 .7.4 1.3.4 1.9 0 1-.6 2-.6 3-.1.4.2.6.4.6.8z"
    />
  </Svg>
);

const PoolMates = ({ driver, navigation, data }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 75,
        marginTop: 25
      }}
    >
      <TouchableHighlight
        style={{ paddingHorizontal: 20 }}
        activeOpacity={0.5}
        underlayColor="white"
        onPress={() =>
          navigation.navigate("Home", {
            addedData: data
          })
        }
      >
        <View style={styles.dive}>
          <Text style={styles.diveText}>Hop In The Pool!</Text>
          <DiveSvg />
        </View>
      </TouchableHighlight>
      <Text
        style={styles.diveJoin}
      >{`Ask ${driver.displayName}\nfor a ride!`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  schedule: {
    flexDirection: "column",
    padding: 10,
    marginHorizontal: 20,
    borderColor: "#c2c2c2",
    borderWidth: 0.9,
    borderRadius: 10,
    padding: 7.5,
    marginTop: 80
  },
  scheduleTitle: {
    fontFamily: "gothicBold"
  },
  dateButton: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12.5,
    height: 30,
    marginHorizontal: 2.5,
    width: 55
  },
  dateTrue: {
    backgroundColor: "#55d88a",
    borderColor: "#55d88a"
  },
  dateText: {
    fontFamily: "gothicBold",
    color: "white",
    fontSize: 12
  },
  locationText: {
    fontFamily: "gothicBold",
    fontSize: 16,
    color: "black"
  },
  streetText: {
    color: "#c2c2c2",
    fontFamily: "gothic"
  },
  destinSVG: { width: 30, height: 150 },
  startLocation: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    marginBottom: 25
  },
  endLocation: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "flex-start",
    paddingHorizontal: 15
  },
  dropPick: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center"
  },
  time: {
    borderLeftWidth: 0.8,
    borderColor: "#c2c2c2",
    paddingLeft: 10,
    marginLeft: 15
  },
  timeHead: {
    fontFamily: "gothicBold",
    fontSize: 15
  },
  timeSub: {
    fontFamily: "gothicBold",
    fontSize: 20,
    color: "#56d88a"
  },
  travelTime: {
    fontSize: 10,
    textAlign: "center",
    color: "#56d88a"
  },
  pay: {
    flexDirection: "row",
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    borderColor: "#c2c2c2",
    paddingLeft: 20,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: "center"
  },
  payHead: {
    fontFamily: "gothicBold"
  },
  paySub: {
    fontFamily: "gothicBold",
    fontSize: 20,
    color: "#56d88a"
  },
  payInput: {
    marginLeft: 20,
    borderRadius: 10,
    borderColor: "#56d88a",
    borderWidth: 1,
    height: 40,
    padding: 10
  },
  name: {
    fontFamily: "gothicBold",
    fontSize: 20
  },
  stars: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  profile: {
    alignItems: "flex-start"
  },
  trips: {
    fontFamily: "gothicBold"
  },
  verified: {
    fontFamily: "gothicBold",
    color: "#b4c083",
    paddingBottom: 0
  },
  driver: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center"
  },
  driverInfo: {
    flexDirection: "row",
    borderTopWidth: 0.8,
    borderColor: "#c2c2c2",
    marginTop: 10,
    paddingTop: 10
  },
  driverHead: {
    fontFamily: "gothicBold"
  },
  driverSub: {
    fontFamily: "gothicBold",
    color: "#56d88a",
    fontSize: 16,
    width: 100
  },
  driverBody: {
    marginLeft: 15
  },
  dive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.8,
    borderColor: "#c2c2c2",
    width: 225,
    height: 70,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  diveText: {
    fontFamily: "gothicBold",
    fontSize: 18
  },
  diveJoin: {
    fontFamily: "gothicItalic"
  },
  poolName: {
    fontFamily: "gothicItalic",
    fontSize: 12
  }
});
