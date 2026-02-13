import { Image } from 'expo-image';
import { View, Text, StyleSheet, SafeAreaViewBase } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; // ✅ modern, supported


export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>StopWatch</Text>
      </SafeAreaView>
    </SafeAreaProvider>
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
  }
});
