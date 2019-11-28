import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import MessagePreview from "./Component/MessagePreview.js";
import * as Font from "expo-font";
let message = "Hey! Can I join your carpool on Tuesday?";
let user = "Kevin Tang";
let uri =
  "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A";

export default class MessageScreen extends Component {
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
        <ScrollView
          style={styles.rideScrolls}
          contentContainerStyle={{ paddingTop: 20 }}
        >
          <MessagePreview
            message={message}
            user={user}
            uri={uri}
          ></MessagePreview>
          <MessagePreview
            message={"HELLOOOOOOOOOO"}
            user={"Kaeli Hendricks"}
            uri={
              "https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-1/p200x200/48172360_1085334661649408_6213929173132509184_o.jpg?_nc_cat=108&_nc_oc=AQn1e4yVIBevJ8jYuoBQalzPQOTUCLUchskNinOBP5m4qS8_3uY3b4-n3lSPwLz5vYI&_nc_ht=scontent-yyz1-1.xx&oh=0da4464e16fc668e4f1de463cc7625f4&oe=5E56F3CE"
            }
          ></MessagePreview>
        </ScrollView>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }
}

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
  }
});
