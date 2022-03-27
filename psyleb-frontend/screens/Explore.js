import MapView, { Callout, Marker } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PrimaryTextInput from "../components/PrimaryTextInput";
import { useEffect, useState } from "react";
import { Modal, Portal, Provider, Button } from "react-native-paper";
import List from "../components/List";
import axios from "axios";
import { userContext } from "../userContext";
import { useContext } from "react";
import IP from "../globals/IP";
import PrimaryButton from "../components/PrimaryButton";

const Explore = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const token = currentUser.access_token;
  const getProviderAPI = `${IP}/api/user/providers`;
  const [selectedId, setSelectedId] = useState();
  const [providers, setProviders] = useState();

  const fetchProviders = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(getProviderAPI, config);
      const data = await response.data;
      setProviders(data);
    } catch (error) {
      console.log("can't get providers", error);
    }
  };

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
    borderRadius: 10,
  };

  useEffect(() => fetchProviders);

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        {/* <PrimaryTextInput
          label={"Search Providers"}
          placeholder={"Search for providers"}
        /> */}
        {/* <PrimaryButton job={fetchProviders}/> */}
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
        {providers &&
          providers.Providers.map((item) => {
            return (
              <View key={item.id}>
                <Marker
                  onPress={() => {
                    setSelectedId(item);
                    setVisible(true);
                  }}
                  pinColor="#1B8B6A"
                  coordinate={{
                    latitude: item.lat,
                    longitude: item.lng,
                  }}
                  title={item.first_name}
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
            onPress={() => navigation.navigate("Provider")}
          >
            <List
              first={
                selectedId && selectedId.first_name + " " + selectedId.last_name
              }
              second={selectedId && selectedId.occupation}
              third={selectedId && selectedId.city}
              image={require("../assets/profile.jpg")}
            />
            <Button onPress={() => navigation.navigate("Provider")}>
              Profile
            </Button>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 757,
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
