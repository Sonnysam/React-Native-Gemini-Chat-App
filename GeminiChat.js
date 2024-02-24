import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyBJH2xrrsHEVzh9oJ9hFnlMgV7Ev78Fatg";

  useEffect(() => {
    const initChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = "Hi there! ";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setMessages([{ text, user: false }]);
    };
    initChat();
  }, []);

  const onSend = async () => {
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages([...messages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    setMessages([...messages, { text, user: false }]);
    setLoading(false);
    setUserInput("");
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.text}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type a message..."
          onSubmitEditing={onSend}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color="#000000"
            style={styles.loadingText}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  messageContainer: { padding: 10, marginVertical: 5 },
  messageText: { fontSize: 16 },
  userMessage: { backgroundColor: "#f0f0f0" },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
});

export default GeminiChat;
