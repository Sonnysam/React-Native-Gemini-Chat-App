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

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Replace with your actual API key
  const API_KEY = "AIzaSyBJH2xrrsHEVzh9oJ9hFnlMgV7Ev78Fatg";

  useEffect(() => {
    const initChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = " ";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setMessages([{ text, user: false }]); // Initial message from Gemini
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
    setUserInput(""); // Clear input after sending
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer(item.user)}>
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
          style={styles.textInput}
        />
        {loading && (
          // activity indicator
          <ActivityIndicator
            size="large"
            color="#000000"
            style={styles.loadingText}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#474F7A",
  },
  messageContainer: (isUser) => ({
    padding: 10,
    marginVertical: 5,
    flexDirection: isUser ? "row-reverse" : "row",
    alignItems: "center",
  }),
  messageText: {
    fontSize: 18,
    padding: 8,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    padding: 8,
    borderRadius: 10,
  },
  loadingText: {
    marginLeft: 10,
  },
});

export default Chat;
