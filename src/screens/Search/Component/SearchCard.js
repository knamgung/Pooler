import {
  StyleSheet,
  View,
  Text,
  Switch,
  Image,
  FlatList,
  TextInput,
  TouchableHighlight
} from "react-native";
import React, { Component } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";

const RideCard = ({
  location,
  street,
  region,
  endLocation,
  endStreet,
  endRegion
}) => {
  return (
    <View style={styles.cardContent}>
      <View>
        <View style={styles.test2}>
          <SvgComponent style={styles.destinSVG}> </SvgComponent>
          <View>
            <LocationInfo
              location={location}
              street={street}
              region={region}
            ></LocationInfo>
            <LocationInfo
              location={endLocation}
              street={endStreet}
              region={endRegion}
            ></LocationInfo>
          </View>
        </View>
        <RideInfo></RideInfo>
      </View>

      <View style={styles.test3}>
        <RideProfileInfo></RideProfileInfo>
      </View>
    </View>
  );
};

const LocationInfo = ({ location, street, region }) => {
  return (
    <View>
      <Text style={styles.locationText}>{location}</Text>
      <Text style={styles.streetText}>{street}</Text>
      <Text style={styles.streetText}>{region}</Text>
    </View>
  );
};

const RideProfileInfo = () => {
  return (
    <View style={styles.profile}>
      <Image
        style={{ width: 110, height: 110, borderRadius: 100 }}
        source={{
          uri:
            "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A"
        }}
      ></Image>
      <View>
        <Text style={styles.name}>Thomas A</Text>
        <View style={styles.stars}>
          <FlatList
            horizontal
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
          <Text style={styles.trips}>| 74 Trips</Text>
        </View>
        <Text style={styles.verified}>Verified</Text>
      </View>
    </View>
  );
};

const SvgComponent = props => (
  <Svg viewBox="0 0 32 156" {...props}>
    <Path
      fill="#c2c2c2"
      d="M17.3 109.1V28.3c7-.8 12.5-6.7 12.5-14 0-7.8-6.3-14.1-14-14.1s-14 6.3-14 14.1c0 7.2 5.5 13.2 12.5 14v80.8c-8.1.8-14.5 7.6-14.5 16 0 3.6 2.1 9 6.6 17 3.1 5.5 6.1 10.1 6.2 10.3l2.2 3.3c.2.3.6.5 1 .5s.8-.2 1-.5l2.2-3.3c.1-.2 3.1-4.8 6.2-10.3 4.5-8 6.6-13.5 6.6-17 0-8.4-6.4-15.2-14.5-16zM5.8 14.4c0-5.5 4.5-10.1 10-10.1s10 4.5 10 10.1c0 5.5-4.5 10.1-10 10.1s-10-4.6-10-10.1zm10 119.5c-4.9 0-8.9-4-8.9-8.9s4-8.9 8.9-8.9 8.9 4 8.9 8.9-4 8.9-8.9 8.9z"
    />
  </Svg>
);

const RideInfo = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 10
      }}
    >
      <View style={styles.walkBlock}>
        <Ionicons
          name="ios-walk"
          size={30}
          color="#c2c2c2"
          style={{ marginRight: 6 }}
        ></Ionicons>
        <View>
          <Text style={styles.subhead}>Walking Time</Text>
          <Text style={styles.timeWalk}>2 min</Text>
        </View>
      </View>
      <View style={styles.departBlock}>
        <Text style={styles.subhead}>Depart</Text>
        <Text style={styles.walkDepart}>7:30 am</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    fontFamily: "gothicBold",
    marginTop: 30
  },
  existCar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
  cardContent: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 24,

    width: "100%",
    paddingVertical: 30,
    borderBottomWidth: 0.5,

    borderColor: "rgba(0,0,0,0.12)"
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
    marginRight: 8
  },
  departBlock: {
    borderColor: "#c2c2c2",
    borderWidth: 1.5,

    borderRadius: 8,
    paddingHorizontal: 10
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
  locationView: {
    borderColor: "#c2c2c2",
    borderWidth: 1,
    paddingLeft: 20,
    marginVertical: 18,
    paddingVertical: 8,
    marginHorizontal: 24,
    justifyContent: "center",
    borderRadius: 15
  },
  locationInputs: {
    height: 70,
    justifyContent: "center"
  },
  destinSVG: { width: 40, height: 90 }
});

export default RideCard;
