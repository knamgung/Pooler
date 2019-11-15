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
import { ScrollView } from "react-native-gesture-handler";

export default class Search extends Component {
  state = { input: true, fontLoaded: false };

  async componentDidMount() {
    await Font.loadAsync({
      gothic: require("../../assets/fonts/gothic.ttf"),
      gothicBold: require("../../assets/fonts/gothicBold.ttf"),
      gothicBoldItalic: require("../../assets/fonts/gothicBoldItalic.ttf"),
      gothicItalic: require("../../assets/fonts/gothicItalic.ttf")
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    const { fontLoaded } = this.state;
    if (fontLoaded) {
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
            <RideCard></RideCard>
            <RideCard></RideCard>
            <RideCard></RideCard>
            <RideCard></RideCard>
            <RideCard></RideCard>
          </ScrollView>
        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }
}

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

const LocationInput = () => {
  return (
    <View style={styles.locationInputs}>
      <TextInput placeholder="Where From?"></TextInput>
      <TextInput placeholder="Where To?"></TextInput>
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

const RideCard = () => {
  return (
    <View style={styles.cardContent}>
      <View style={styles.test2}>
        <LocationInfo></LocationInfo>
        <LocationInfo></LocationInfo>
        <RideInfo></RideInfo>
      </View>
      <View style={styles.test3}>
        <RideProfileInfo></RideProfileInfo>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    fontFamily: "gothicBold",
    marginTop: 25
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
  test2: {},
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
  }
});
