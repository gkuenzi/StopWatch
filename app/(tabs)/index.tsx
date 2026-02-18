import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';

export default function HomeScreen() {
  const [time, setTime] = useState(0); //Milliseconds
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [reset, setReset] = useState(false);
  const [unmarkedLap, setUnmarkedLap] = useState(false);

  const [laps, setLaps] = useState<string[]>([]);
  let totalMinutes = 0;
  let totalSeconds = 0;
  let totalMilliseconds = 0;

  let timer = 0;
  const secCounter = useRef(0);
  const minCounter = useRef(0);

  // Timer Effect
  useEffect(() => {
    timer = time;
    if (reset) {
      setLaps([]);
      setReset(false);
    }

    if (isRunning) {
      let start = Date.now()
      const interval = setInterval(() => {
        console.log("sec:", sec, "secCounter:", secCounter, "Reset:", reset);
        setTime(Math.floor((Date.now() - start + timer) / 10));
        if ((Date.now() - start + timer) > 995) {

          setSec(prev => prev + 1);
          secCounter.current++;
          start = Date.now();
        }
        if (secCounter.current > 60) {
          setMin(prev => prev + 1);
          minCounter.current++;
          secCounter.current = 0;
          setSec(prev => prev + 1);
          secCounter.current++;
        }
      }, 10);
      return () => clearInterval(interval);
    }

  }, [isRunning, reset]);

  // Lap Effect
  useEffect(() => {
    if (unmarkedLap) {
      const newLap = min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0") + "." + time.toString().padStart(2, "0");
      //console.log(newLap.split(''))

      let minutes = parseInt(newLap[0] + newLap[1])
      let seconds = parseInt(newLap[3] + newLap[4])
      let milliseconds = parseInt(newLap[6] + newLap[7])

      totalMinutes += minutes;
      totalSeconds += seconds;
      totalMilliseconds += milliseconds;
      setLaps([...laps, totalMinutes.toString().padStart(2, "0") + ":" + totalSeconds.toString().padStart(2, "0") + "." + totalMilliseconds.toString().padStart(2, "0")])

      console.log("laps", laps); // this logs one behind what is actually being lapped

      setUnmarkedLap(false);
    }
  }, [unmarkedLap]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0") + "." + time.toString().padStart(2, "0")}</Text>
      <View style={styles.btnContainer}>
        <Pressable style={[styles.btn, { backgroundColor: "rgb(51, 111, 39)" }]}
          onPress={() => setIsRunning(!isRunning)}
        >
          <Text style={styles.btnText}>
            {isRunning ? "Stop" : "Start"}
          </Text>
        </Pressable>
        <Pressable style={[styles.btn, { backgroundColor: "rgb(111, 39, 39)" }]}
          onPress={() => {
            setTime(0);
            setSec(0);
            setMin(0);
            setReset(!reset);
          }}
        >
          <Text style={styles.btnText}>
            Reset
          </Text>
        </Pressable>
        <Pressable style={[styles.btn, { backgroundColor: "rgb(74, 74, 74)" }]}
          onPress={() => {
            setUnmarkedLap(!unmarkedLap);
          }}
        >
          <Text style={styles.btnText}>
            Lap
          </Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.lapsHeader}>
          Laps
        </Text>
        <View style={styles.lapsBox}>
          <ScrollView>
            {[...laps].reverse().map((lap, index) => (
              <Text style={styles.lapsText} key={index}>{lap}</Text> // lapsText isn't functioning properly
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(27, 27, 27)",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 25,
    margin: 20
  },
  text: {
    color: "white",
    fontSize: 75,
    textAlign: "center",
    fontFamily: Platform.OS === "android" ? "monospace" : undefined,
    fontVariant: Platform.OS === "ios" ? ["tabular-nums"] : undefined,
  },
  btn: {
    padding: 5,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 2
  },
  btnText: {
    color: "white",
    fontSize: 30,
  },
  lapsHeader: {
    color: "white",
    marginTop: 5,
    alignSelf: "center",
  },
  lapsBox: {
    height: 150,
    width: 300,
    backgroundColor: "rgb(164, 164, 164)",
    borderTopWidth: 1,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  lapsText: {
    color: "black",
    fontFamily: Platform.OS === "android" ? "monospace" : undefined,
    fontVariant: Platform.OS === "ios" ? ["tabular-nums"] : undefined,
    fontSize: 25
  }
});
