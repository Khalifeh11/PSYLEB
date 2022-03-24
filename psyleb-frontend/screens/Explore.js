import MapView, { Callout, Marker } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PrimaryTextInput from "../components/PrimaryTextInput";
import { useState } from "react";

const Explore = () => {
  const [pin, setPin] = useState({
    latitude: 33.890536626710244,
    longitude: 35.489303601542964,
  });
  const [region, setRegion] = useState({
    latitude: 33.890536626710244,
    longitude: 35.489303601542964,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <PrimaryTextInput
          label={"Search Providers"}
          placeholder={"Search for providers"}
        />
      </View>
      <View style={styles.search}>
        <FontAwesome name="search" size={24} color="black" />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.888630,
          longitude: 35.495480,
          latitudeDelta: 1.8,
          longitudeDelta: 1.8,
        }}
      >
        {/* <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        /> */}

        <Marker
          coordinate={pin}
          pinColor="purple"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate),
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
              setRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

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
    position: "absolute",
    top: 50,
    left: 300,
    zIndex: 2,
  },
  textInput: {
    position: "absolute",
    top: 25,
    left: 25,
    zIndex: 2,
  },
});

export default Explore;
