import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';

export default function HomeScreen() {
  const [time, setTime] = useState(0); //Milliseconds
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [Reset, setReset] = useState(false);
  let timer = 0;
  let secCounter = 55;
  let minCounter = 1;

  useEffect(() => {
    timer = time;

    if (isRunning) {
      let start = Date.now()
      const interval = setInterval(() => {
        setTime(Math.floor((Date.now() - start + timer) / 10));
        if ((Date.now() - start + timer) > 995) {

          setSec(sec + secCounter)
          secCounter++;
          start = Date.now();
        }
        if (secCounter > 60) {
          secCounter = 0
          setSec(sec + secCounter);
          secCounter++;
          setMin(min + minCounter);
          minCounter++;
        }
      }, 10);
      return () => clearInterval(interval);
    }

  }, [isRunning, Reset]);

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
            setReset(!Reset);
          }}
        >
          <Text style={styles.btnText}>
            Reset
          </Text>
        </Pressable>
        <Pressable style={[styles.btn, { backgroundColor: "rgb(74, 74, 74)" }]}
          onPress={() => {

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
        <View style={styles.laps}>
          <ScrollView>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
            <Text>hello</Text>
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
  laps: {
    height: 100,
    width: 300,
    backgroundColor: "rgb(164, 164, 164)",
    borderTopWidth: 1,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  }
});
