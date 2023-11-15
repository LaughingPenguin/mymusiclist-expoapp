import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

// These are buttons for navigation and form submission.
const SubmitButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#506186",

    width: "100%",
    alignItems: "center",

    borderRadius: 5,

    padding: 10,
    margin: 5,
  },
  text: {
    color: "white",
  },
});

export default SubmitButton;
