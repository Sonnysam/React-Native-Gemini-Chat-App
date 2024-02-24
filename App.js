import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GeminiChat from "./GeminiChat";

export default function App() {
  return (
    <View style={styles.container}>
      <GeminiChat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
