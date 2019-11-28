import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const MessagePreview = ({ message, user, uri }) => {
  return (
    <TouchableOpacity style={styles.preview}>
      <Image
        style={{ width: 75, height: 75, borderRadius: 100 }}
        source={{
          uri: uri
        }}
      ></Image>
      <View style={styles.previewUser}>
        <Text style={styles.user}>{user}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: 110,
    flexDirection: "row",

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,0.15)",
    elevation: 11
  },
  user: {
    fontFamily: "gothicBold",
    fontSize: 20
  },
  previewUser: {
    paddingLeft: 10
  },
  message: {
    fontFamily: "gothic",
    paddingRight: 20
  }
});

export default MessagePreview;
