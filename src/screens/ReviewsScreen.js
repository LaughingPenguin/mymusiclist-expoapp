import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Review from "../components/Review";

const ReviewsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ratingsWrapper}>
        <Text style={styles.sectionTitle}>ratings</Text>

        <View style={styles.items}>
          <Review />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7dedc",
    alignItems: "center",
    justifyContent: "top",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3E517A",
  },
  ratingsWrapper: {},
  items: {},
});

export default ReviewsScreen;
