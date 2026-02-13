import { Image } from 'expo-image';
import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


export default function HomeScreen() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const start = Date.now()

    const interval = setInterval(() => {
      if (isRunning) {
        const currentTime = 0
        setTime(Date.now() - start);
      } else {

      }
    }, 10);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{time}</Text>
      <Pressable style={styles.btn}
        onPress={() => setIsRunning(!isRunning)}
      >
        <Text style={styles.btnText}>
          Button
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(46, 46, 46)",
  },
  text: {
    color: "white",
    fontSize: 50,
  },
  btn: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
  },
});
