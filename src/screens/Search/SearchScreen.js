import {
  StyleSheet,
  View,
  Text,
  Switch,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import React, { Component } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Path, Circle } from "react-native-svg";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SearchRideScreen from "./SearchRideScreen.js";
import RequestPoolScreen from "./RequestPoolScreen.js";
import { mapView } from "react-native-maps";
import SearchCard from "./Component/SearchCard";
import RideDetail from "./RideDetail.js";
import CreateRequest from "./CreateRequest.js";

const uri =
  "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A";

import json from "../../../data.json";
const ride = json.available;

class SearchScreen extends Component {
  state = { input: false, fontLoaded: false, rides: ride };

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
    const { fontLoaded, input, rides } = this.state;
    if (fontLoaded && !input) {
      return (
        <View name="body" style={styles.container}>
          <View style={styles.container} name="header">
            <View style={styles.existCar}>
              <View style={styles.headerBox}>
                <Text style={styles.header}>Existing Carpools</Text>
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
              <LocationInput></LocationInput>
            </View>
          </View>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 200 }}
          >
            <FlatList
              data={rides}
              renderItem={({ item }) => {
                return (
                  <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor="white"
                    onPress={() => {
                      navigation.navigate("SearchRide", {
                        data: item,
                        navigation: navigation
                      });
                    }}
                  >
                    <SearchCard data={item}></SearchCard>
                  </TouchableHighlight>
                );
              }}
            ></FlatList>
          </ScrollView>
        </View>
      );
    } else if (fontLoaded && input) {
      return <RequestPoolScreen navigation={navigation}></RequestPoolScreen>;
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#56d88a" />
        </View>
      );
    }
  }
}
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

const SearchNavigator = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: ({ navigation }) => ({
        headerShown: false
      })
    },
    SearchRide: SearchRideScreen,
    SearchDetail: RideDetail,
    CreateRequest: CreateRequest
  },
  {
    initialRouteName: "Search",
    headerMode: "none"
  }
);
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
            keyExtractor={(item, index) => item.key}
            data={[
              { value: "star", key: "1" },
              { value: "star", key: "2" },
              { value: "star", key: "3" },
              { value: "star", key: "4" },
              { value: "star", key: "5" }
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

const LocationInput = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <InputSVG></InputSVG>
      <View style={styles.locationInputs}>
        <TextInput placeholder="Where From?"></TextInput>
        <TextInput placeholder="Where To?"></TextInput>
      </View>
    </View>
  );
};

const LocationInfo = ({ location, street, region }) => {
  return (
    <View>
      <Text style={styles.locationText}>Alexandra Theatre</Text>
      <Text style={styles.streetText}>1 Navato St.</Text>
      <Text style={styles.streetText}>Irvine, CA</Text>
    </View>
  );
};

const RideCard = ({ navigation }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="white"
      onPress={() => {
        navigation.navigate("SearchRide", {});
      }}
    >
      <View style={styles.cardContent} onPress={() => {}}>
        <View>
          <View style={styles.test2}>
            <SvgComponent style={styles.destinSVG}> </SvgComponent>
            <View>
              <LocationInfo></LocationInfo>
              <LocationInfo></LocationInfo>
            </View>
          </View>
          <RideInfo></RideInfo>
        </View>

        <View style={styles.test3}>
          <RideProfileInfo></RideProfileInfo>
        </View>
      </View>
    </TouchableHighlight>
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

export default createAppContainer(SearchNavigator);
