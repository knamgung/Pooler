import React, { Component } from "react";

import { StyleSheet, View, Text } from "react-native";

export default class Message extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Message Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
