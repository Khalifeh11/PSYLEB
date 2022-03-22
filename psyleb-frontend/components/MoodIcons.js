import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const MoodIcons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <MaterialIcons name="mood" size={50} color="#36D47F" />
        <Text style={styles.text}>Perfect</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons
          name="sentiment-satisfied-alt"
          size={50}
          color="#75E265"
        />
        <Text style={styles.text}>Good</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="sentiment-neutral" size={50} color="#FFD41A" />
        <Text style={styles.text}>Neutral</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons
          name="sentiment-dissatisfied"
          size={50}
          color="#FE626B"
        />

        <Text style={styles.text}>Bad</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <MaterialIcons
          name="sentiment-very-dissatisfied"
          size={50}
          color="#FF874D"
        />
        <Text style={styles.text}>Awful</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoodIcons;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  text: {
    textAlign: "center",
  },
});
