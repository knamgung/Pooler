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

export default class Home extends Component {
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
        <View style={styles.container}>
          <RideCard></RideCard>
        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }
}

const LocationInfo = ({ location, street, region }) => {
  return (
    <View>
      <Text style={styles.locationText}>Alexandra Theatre</Text>
      <Text style={styles.streetText}>1 Navato St.</Text>
      <Text style={styles.streetText}>Irvine, CA</Text>
    </View>
  );
};

const RideInfo = () => {
  return (
    <View
      style={{
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
          <Text style={styles.subhead}>Walking</Text>
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

const RideCard = () => {
  return (
    <View>
      <Text style={styles.date}>Today | November 10</Text>
      <View style={styles.rideLocation}>
        <View>
          <LocationInfo></LocationInfo>
          <LocationInfo></LocationInfo>
        </View>

        <RideInfo></RideInfo>
      </View>
      <View style={styles.userInfo}>
        <Driver></Driver>
        <CarpoolMates></CarpoolMates>
      </View>
    </View>
  );
};

const Driver = () => {
  return (
    <View style={styles.driver}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 100 }}
        source={{
          uri:
            "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A"
        }}
      ></Image>
      <View style={styles.driverDetail}>
        <Text style={styles.driverSub}>Driver</Text>
        <Text style={styles.driverGreen}>Alexandra</Text>
      </View>
      <View></View>
    </View>
  );
};

const CarpoolMates = () => {
  return (
    <View style={styles.carpool}>
      <Text style={styles.carpoolHead}>Carpool Mates</Text>
      <FlatList
        horizontal
        data={[
          {
            value:
              "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A"
          },
          {
            value:
              "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A"
          },
          {
            value:
              "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A"
          }
        ]}
        renderItem={({ item }) => (
          <Image
            style={{ width: 30, height: 30, borderRadius: 50 }}
            source={{ uri: `${item.value}` }}
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
    alignItems: "center",
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
    marginRight: 8,
    width: 100
  },
  departBlock: {
    borderColor: "#c2c2c2",
    borderWidth: 1.5,
    width: 100,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  driver: {
    flexDirection: "row",
    alignItems: "center"
  },
  driverDetail: {
    marginLeft: 12
  },
  driverSub: {
    fontFamily: "gothicBold"
  },
  driverGreen: {
    fontFamily: "gothicBold",
    fontSize: 15,
    color: "#55d88a"
  },
  carpool: {
    flexDirection: "row"
  },
  userInfo: {
    flexDirection: "row"
  },
  rideLocation: {
    flexDirection: "row"
  }
});
