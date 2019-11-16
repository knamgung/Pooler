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
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import Svg, { Path } from "react-native-svg";

import { ScrollView } from "react-native-gesture-handler";

export default class HomeScreen extends Component {
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
          contentContainerStyle={{ paddingBottom: 50 }}
          style={styles.rideScroll}
        >
          <RideCard></RideCard>
          <RideCard></RideCard>
          <RideCard></RideCard>
        </ScrollView>
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

const SvgComponent = props => (
  <Svg viewBox="0 0 32 156" {...props}>
    <Path
      fill="#55d88a"
      d="M17.3 109.1V28.3c7-.8 12.5-6.7 12.5-14 0-7.8-6.3-14.1-14-14.1s-14 6.3-14 14.1c0 7.2 5.5 13.2 12.5 14v80.8c-8.1.8-14.5 7.6-14.5 16 0 3.6 2.1 9 6.6 17 3.1 5.5 6.1 10.1 6.2 10.3l2.2 3.3c.2.3.6.5 1 .5s.8-.2 1-.5l2.2-3.3c.1-.2 3.1-4.8 6.2-10.3 4.5-8 6.6-13.5 6.6-17 0-8.4-6.4-15.2-14.5-16zM5.8 14.4c0-5.5 4.5-10.1 10-10.1s10 4.5 10 10.1c0 5.5-4.5 10.1-10 10.1s-10-4.6-10-10.1zm10 119.5c-4.9 0-8.9-4-8.9-8.9s4-8.9 8.9-8.9 8.9 4 8.9 8.9-4 8.9-8.9 8.9z"
    />
  </Svg>
);

const RideInfo = () => {
  return (
    <View>
      <View style={styles.departBlock}>
        <Text style={styles.subhead}>Depart</Text>
        <Text style={styles.walkDepart}>7:30 am -{"\n"}7:45 am</Text>
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
          <Text style={styles.timeWalk}>2 min</Text>
        </View>
      </View>
    </View>
  );
};

const RideCard = () => {
  return (
    <View style={styles.rideCard}>
      <Text style={styles.date}>Today | November 10</Text>
      <View style={styles.rideContent}>
        <View style={styles.rideLocation}>
          <View style={styles.endStartView}>
            <SvgComponent style={styles.destinSVG}></SvgComponent>
            <View style={{ flexDirection: "column" }}>
              <LocationInfo></LocationInfo>
              <LocationInfo></LocationInfo>
            </View>
          </View>

          <RideInfo></RideInfo>
        </View>
        <View style={styles.userInfo}>
          <Driver></Driver>
          <CarpoolMates></CarpoolMates>
        </View>
      </View>
    </View>
  );
};

const Driver = () => {
  return (
    <View style={styles.driver}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 100, marginLeft: 25 }}
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
      <Text style={styles.carpoolHead}>Carpool{"\n"}Mates</Text>
      <FlatList
        horizontal
        scrollEnabled
        data={[
          {
            value:
              "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A",
            key: "1"
          },
          {
            value:
              "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A",
            key: "2"
          },
          {
            value:
              "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A",
            key: "3"
          },
          {
            value:
              "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A",
            key: "4"
          },
          {
            value:
              "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A",
            key: "5"
          },
          {
            value:
              "https://scontent.fyyz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/21316104_1817590971602155_8722311024261381719_o.jpg?_nc_cat=101&_nc_oc=AQnJA0X92TvJ9LHSDLiB_4k8w7gbzJq3w1DBUrXDTfypwl-rdCkFqiuMze1G3nPer8654wkXuSlc069jn0eKdIWK&_nc_ht=scontent.fyyz1-1.fna&oh=b4e3e66c488233a4f83eaf106c8e06da&oe=5E8CFC9A",
            key: "6"
          }
        ]}
        renderItem={({ item }) => (
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              marginHorizontal: 4
            }}
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
    marginTop: 10,
    elevation: 5
  },
  rideScroll: {
    marginTop: 70,
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
