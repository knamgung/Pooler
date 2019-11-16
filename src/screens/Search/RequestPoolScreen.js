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
import SearchScreen from "./SearchScreen.js";

export default class RequestPool extends Component {
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
    const { fontLoaded, input } = this.state;
    if (fontLoaded && input) {
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
            <View style={styles.locationView}></View>
          </View>
        </View>
      );
    } else if (fontLoaded && !input) {
      return <SearchScreen></SearchScreen>;
    } else {
      return <Text>Loading</Text>;
    }
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
  }
});
