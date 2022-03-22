import MapView from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PrimaryTextInput from "../components/PrimaryTextInput";

const Explore = () => (
  <View style={styles.container}>
    <View style={styles.textInput}>
      <PrimaryTextInput label={'Search Providers'} placeholder={'Search for providers'}/>
    </View>
    <View style={styles.search}>
      <FontAwesome name="search" size={24} color="black" />
    </View>
    <MapView
      style={styles.map}
      region={{
        latitude: 33.522036,
        longitude: 35.364081,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    ></MapView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 1000,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: -1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search: {
    position: 'absolute',
    top: 50,
    left: 300,
    zIndex: 2
  },
  textInput: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 2
  }
});

export default Explore;
