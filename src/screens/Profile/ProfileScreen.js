import React, { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
let message = "Hey! Can I join your carpool on Tuesday?";
let user = "Hunter";
let uri =
  "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A";

export default class ProfileScreen extends Component {
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
    const { fontLoaded } = this.state;
    if (fontLoaded) {
      return (
        <View>
          <View style={styles.profileHeader}>
            <ProfileInfo></ProfileInfo>
            <ProfileEdit></ProfileEdit>
          </View>
          <ScrollView
            style={{
              borderBottomWidth: 3,
              backgroundColor: "white",
              elevation: 5,
              height: "100%",
              width: "100%"
            }}
          >
            <FlatList
              keyExtractor={(item, index) => index}
              data={[
                { text: "Notification Settings" },
                { text: "Driver Settings" },
                { text: "Payment Methods" },
                { text: "Saved Addresses" },
                { text: "Carpool Activity/History" }
              ]}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.setting}>
                    <Text style={styles.settingText}>{item.text}</Text>
                  </TouchableOpacity>
                );
              }}
            ></FlatList>
          </ScrollView>
        </View>
      );
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

const ProfileInfo = () => {
  return (
    <View style={styles.profileInfo}>
      <Image
        style={{ width: 90, height: 90, borderRadius: 100, marginRight: 15 }}
        source={{
          uri:
            "https://scontent-yyz1-1.cdninstagram.com/vp/cb34d7056e6df1fa2371e27b1958fc53/5E87E74A/t51.2885-19/s320x320/74693397_2555853094499899_3918995612778889216_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com"
        }}
      ></Image>
      <View>
        <View style={styles.nameVerif}>
          <Text style={styles.name}>Ken Namgung</Text>
          <Text style={styles.verified}>Verified</Text>
        </View>
        <View style={styles.startTrip}>
          <View
            style={{ width: 75, alignItems: "center", flexDirection: "row" }}
          >
            <FlatList
              horizontal
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
                  size={12}
                  color="#b4c083"
                  style={{ marginRight: 2 }}
                ></FontAwesome>
              )}
            />
          </View>
          <Text style={styles.trips}>| 74 Trips</Text>
        </View>
        <Text style={styles.desc}>
          Hi, I'm Ken and I go to the{"\n"}University of Toronto! I also love
          dancing!
        </Text>
      </View>
    </View>
  );
};

const ProfileEdit = () => {
  return (
    <TouchableOpacity style={styles.editProf}>
      <Text style={styles.editFont}>Edit Profile</Text>
      <MaterialIcons name="keyboard-arrow-right" size={40}></MaterialIcons>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  rideScrolls: {
    marginTop: 50,
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%"
  },
  profileHeader: {
    marginTop: 50,
    marginBottom: 10,
    height: 200,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center"
  },

  trips: {
    fontFamily: "gothicBold"
  },
  verified: {
    fontFamily: "gothicBold",
    color: "#b4c083",
    paddingBottom: 0
  },
  name: {
    fontFamily: "gothicBold",
    fontSize: 18,
    marginRight: 10
  },
  startTrip: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  nameVerif: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  desc: {
    fontFamily: "gothic",
    width: 275
  },
  editProf: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 15,
    width: 180,
    height: 60,
    borderWidth: 1,
    borderColor: "#c2c2c2"
  },
  editFont: {
    fontFamily: "gothicBold",
    fontSize: 16
  },
  setting: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 70,
    borderBottomWidth: 0.8,
    borderColor: "#c2c2c2"
  },
  settingText: {
    fontFamily: "gothic",
    fontSize: 15
  }
});
