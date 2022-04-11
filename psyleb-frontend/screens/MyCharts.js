import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from "victory-native";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { userContext } from "../userContext";
import IP from "../globals/IP";
import axios from "axios";
import MoodIcon from "../components/MoodIcon";

const MyCharts = ({ route }) => {
  const Logs = route.params;
  const { currentUser, setCurrentUser } = useContext(userContext);
  const token = currentUser.access_token;
  const getLogsCountAPI = `${IP}/api/logs/chart`;
  const [logsCount, setLogsCount] = useState();
  const [moodData, setMoodData] = useState();

  const fetchLogsCount = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(getLogsCountAPI, config);
      const data = response.data;
      setMoodData(data);
      // console.warn(moodData)
    } catch (error) {
      console.log("can't get logs", error);
    }
  };

  useEffect(() => {
    fetchLogsCount();
  }, []);
  // console.warn(moodData && moodData.logs[0].mood);)

  return (
    <View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Mood Chart</Text>

        <VictoryPie
          theme={VictoryTheme.material}
          data={
            moodData &&
            moodData.logs.map(({ mood, count }) => ({
              x: mood,
              y: count,
              label:
                mood == 1
                  ? "Perfect"
                  : mood == 2
                  ? "Good"
                  : mood == 3
                  ? "Neutral"
                  : mood == 4
                  ? "Bad"
                  : "Awful",
            }))
          }
          style={{
            labels: {
              fontSize: 15,
              fontWeight: "bold",
              fill: "white",
            },
            data: {
              fill: ({ datum }) => {
                const mood = datum._x;
                return mood == 1
                  ? "#36D47F"
                  : mood == 2
                  ? "#75E265"
                  : mood == 3
                  ? "#FFD41A"
                  : mood == 4
                  ? "#FF874D"
                  : mood == 5
                  ? "#FF4D4D"
                  : "white";
              },
            },

            labels: {
              fontSize: 16,
              fontWeight: "bold",
              fill: "white",
            },
          }}
          labelRadius={80}
          // animate={{
          //   duration: 1000,
          //   onLoad: { duration: 500 },
          // }}
        />
      </View>
      <View>
        <Text style={styles.text}>
          You logged{" "}
          <MoodIcon
            name={"mood"}
            size={25}
            color={"#36D47F"}
            style={styles.firstIcon}
          />{" "}
          {moodData && moodData.logs[0].count} times
        </Text>
        <Text style={styles.text}>
          You logged{" "}
          <MoodIcon
            name={"sentiment-satisfied-alt"}
            size={25}
            color={"#75E265"}
            style={styles.secondIcon}
          />{" "}
          {moodData && moodData.logs[1].count} times
        </Text>
        <Text style={styles.text}>
          You logged{" "}
          <MoodIcon
            name={"sentiment-neutral"}
            size={25}
            color={"#FFD41A"}
            style={styles.thirdIcon}
          />{" "}
          {moodData && moodData.logs[2].count} times
        </Text>
        <Text style={styles.text}>
          You logged{" "}
          <MoodIcon
            name={"sentiment-very-dissatisfied"}
            size={25}
            color={"#FF4D4D"}
            style={styles.fourthIcon}
          />{" "}
          {moodData && moodData.logs[3].count} times
        </Text>  
{/* 
          {moodData && moodData.logs[4].count
          ? <Text style={styles.text}>
            You logged{" "}
            <MoodIcon
              name={"sentiment-very-dissatisfied"}
              size={25}
              color={"#FF4D4D"}
              style={styles.fifthIcon}
            />{" "}
            {moodData && moodData.logs[4].count} times
          </Text>
          : null} */}

        {/* <Text style={styles.text}>  
          You logged{" "}
          <MoodIcon
            name={"sentiment-very-dissatisfied"}
            size={25}
            color={"#FF4D4D"}
            style={styles.fifthIcon}
          />{" "}
          {moodData && moodData.logs[0].count} times
        </Text> */}

      </View>
    </View>
  );
};


export default MyCharts;

const styles = StyleSheet.create({
  chartContainer: {},

  textBlock: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },

  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  text: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "400",
    color: "#231F20",
    letterSpacing: 0.5,
    alignSelf: "center",
    // marginBottom: 10,
  },

  firstIcon: {
    position: "absolute",
    left: -10,
    top: -10,
  },

  // count: {
  //   color: "#231F20",
  // },

  // icon: {
  //   textAlign: "center",
  //   alignSelf: "center",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
