import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GeminiChat from "./GeminiChat";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <View style={styles.container}>
      <GeminiChat />
      <FlashMessage position={"top"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
