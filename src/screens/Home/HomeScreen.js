import {
  StyleSheet,
  View,
  Text,
  Switch,
  Image,
  FlatList,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import React, { Component } from "react";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import Svg, { Path } from "react-native-svg";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import HomeCard from "./Component/HomeCard.js";
import RideDetail from "../Search/RideDetail.js";
const GOOGLE_APIKEY;
import SearchRideScreen from "../Search/SearchRideScreen.js";
const uri =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

import json from "../../../data.json";
const ride = json.rides;

class HomeScreen extends Component {
  state = { input: true, fontLoaded: false, rides: ride };

  async componentDidMount() {
    await Font.loadAsync({
      gothic: require("../../../assets/fonts/gothic.ttf"),
      gothicBold: require("../../../assets/fonts/gothicBold.ttf"),
      gothicBoldItalic: require("../../../assets/fonts/gothicBoldItalic.ttf"),
      gothicItalic: require("../../../assets/fonts/gothicItalic.ttf")
    });

    setTimeout(() => {
      this.setState({ fontLoaded: true });
    }, 1000);
  }
  render() {
    const { fontLoaded, rides } = this.state;
    const { navigation } = this.props;
    console.log("HOME DATA", this.props.navigation.state.params);

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

    if (fontLoaded) {
      return (
        <View style={{}}>
          <Text
            style={{
              fontFamily: "gothicBold",
              fontSize: 24,

              paddingHorizontal: 20,
              paddingTop: 50,
              paddingVertical: 10,
              color: "#55d88a",
              backgroundColor: "white",
              elevation: 4
            }}
          >
            Upcoming Rides
          </Text>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            style={styles.rideScroll}
          >
            <MapView
              style={{
                width: "100%",
                height: 450
              }}
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
            <HomeCard data={rides[0]}></HomeCard>
            <View style={{ marginTop: 30 }}>
              <FlatList
                data={rides}
                style={{ marginBottom: 50 }}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                  return (
                    <TouchableHighlight
                      activeOpacity={0.5}
                      underlayColor="white"
                      onPress={() => {
                        navigation.navigate("HomeRide", {
                          data: item,
                          navigation: navigation
                        });
                      }}
                    >
                      <RideCard data={item}></RideCard>
                    </TouchableHighlight>
                  );
                }}
              ></FlatList>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={100} color="#56d88a" />
        </View>
      );
    }
  }
}

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerShown: false
      })
    },
    HomeRide: SearchRideScreen,
    HomeDetail: RideDetail
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
const LocationInfo = ({ location, street, region }) => {
  return (
    <View>
      <Text style={styles.locationText}>{location}</Text>
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
  const { timeStart, timeStartEnd, walkTime } = depart;
  return (
    <View>
      <View style={styles.departBlock}>
        <Text style={styles.subhead}>Depart</Text>
        <Text style={styles.walkDepart}>
          {timeStart}-{"\n"}
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

const RideCard = ({ data }) => {
  const { startLocation, carpool, endLocation, driver, depart } = data;

  return (
    <View style={styles.rideCard}>
      <Text style={styles.date}>{depart.date}</Text>
      <View style={styles.rideContent}>
        <View style={styles.rideLocation}>
          <View style={styles.endStartView}>
            <SvgComponent style={styles.destinSVG}></SvgComponent>
            <View style={{ flexDirection: "column" }}>
              <LocationInfo
                location={startLocation.place}
                street={startLocation.street}
                region={startLocation.region}
              ></LocationInfo>
              <LocationInfo
                location={endLocation.place}
                street={endLocation.street}
                region={endLocation.region}
              ></LocationInfo>
            </View>
          </View>

          <RideInfo depart={depart}></RideInfo>
        </View>
        <View style={styles.userInfo}>
          <Driver driver={driver}></Driver>
          <CarpoolMates carpool={carpool}></CarpoolMates>
        </View>
      </View>
    </View>
  );
};

const Driver = ({ driver }) => {
  const { displayName, profilePic } = driver;
  return (
    <View style={styles.driver}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 100, marginLeft: 25 }}
        source={{
          uri: profilePic
        }}
      ></Image>
      <View style={styles.driverDetail}>
        <Text style={styles.driverSub}>Driver</Text>
        <Text style={styles.driverGreen}>{displayName}</Text>
      </View>
      <View></View>
    </View>
  );
};

const CarpoolMates = ({ carpool }) => {
  return (
    <View style={styles.carpool}>
      <Text style={styles.carpoolHead}>Carpool{"\n"}Mates</Text>
      <FlatList
        horizontal
        scrollEnabled
        keyExtractor={(item, index) => index}
        data={carpool}
        renderItem={({ item }) => (
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              marginHorizontal: 4
            }}
            source={{ uri: item.profilePic }}
          ></Image>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center"
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
  driver: {
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    width: "42%",
    borderRightColor: "#c2c2c2",
    borderTopColor: "#c2c2c2",
    height: 80
  },
  driverDetail: {
    marginLeft: 12
  },
  driverSub: {
    fontFamily: "gothicBold"
  },
  driverGreen: {
    fontFamily: "gothicBold",
    fontSize: 14,
    color: "#55d88a"
  },
  carpool: {
    flexDirection: "row"
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 20
  },
  rideLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20
  },
  rideCard: {
    width: "100%",
    marginVertical: 7
  },
  rideContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: "black",
    paddingTop: 15,
    flexGrow: 1,
    marginTop: 10
  },
  rideScroll: {
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100
  },
  carpoolHead: {
    fontFamily: "gothicBold",
    fontSize: 15,
    marginLeft: 15,
    marginRight: 10
  },
  carpool: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#c2c2c2",
    borderTopWidth: 0.5,
    width: "58%",
    height: 80
  },
  destinSVG: {
    width: 40,
    height: 90
  },
  endStartView: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default createAppContainer(HomeNavigator);
