import MapView, { Callout, Marker } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PrimaryTextInput from "../components/PrimaryTextInput";
import { useState } from "react";
import { Modal, Portal, Provider } from "react-native-paper";
import List from "../components/List";

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
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    width: 250,
    alignSelf: "center",
    marginRight: 30,
    borderRadius: 10,
  };

  const [selectedId,setSelectedId] = useState();

  const [provider, setProviders] = useState([
    {
      id: 1,
      name: "Karim Khalifeh",
      Specialty: "Clinical Psychologist",
      City: "Saida",
      latitude: 33.890536626710244,
      longitude: 35.489303601542964,
    },

    {
      id: 2,
      name: "Charbel Daoud",
      Specialty: "Clinical Psychologist",
      City: "Beirut",
      longitude: 33.8905,
      latitude: 33.8905,
    },

    {
      id: 3,
      name: "Joe Rizk",
      Specialty: "Clinical Psychologist",
      City: "Jounieh",
      latitude: 34.890536626710244,
      longitude: 35.489303601542964,
    },

  ]);

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
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {/* <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        /> */}
        {/* <Marker
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
        ></Marker> */}

{provider.map((item) => {
          return (
            <View key={item.id}>
              <Marker
                onPress={() => {
                  setSelectedId(item);
                  setVisible(true);

                }}
                pinColor="#1B8B6A"
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.name}
              />
            </View>
          );
        })}
      </MapView>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            {/* <Text>Example Modal. Click outside this area to dismiss.</Text> */}
            <List
              first={selectedId && selectedId.name}
              second={selectedId && selectedId.Specialty}
              third={selectedId && selectedId.City}
              image={require("../assets/profile.jpg")}
            />
          </Modal>
        </Portal>
      </Provider>
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
