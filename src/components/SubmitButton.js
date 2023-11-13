import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const SubmitButton = () => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.text}>submit button</Text>
    </Pressable>
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
