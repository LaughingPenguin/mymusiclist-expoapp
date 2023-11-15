import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

// These are the review componenets
const Review = ({ song, artist, rating, onPress }) => {
  return (
    <View style={styles.reviewWrapper}>
      <TouchableOpacity style={styles.review} onPress={onPress}>
        <Text style={styles.song}>{song}</Text>
        <Text style={styles.artist}>by {artist}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewWrapper: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    opacity: 0.6,
  },
  review: { flexDirection: "row", alignItems: "center" },
  song: {
    fontSize: 15,
    color: "#3E517A",
    fontWeight: "500",
  },
  artist: {
    fontSize: 10,
    color: "#506186",
    marginLeft: 3,
    marginTop: 5,
  },
});

export default Review;
