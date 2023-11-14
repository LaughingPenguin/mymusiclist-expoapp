import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Review from "../components/Review";
import SubmitButton from "../components/SubmitButton";

const ReviewsScreen = ({ navigation }) => {
  const [review, setReview] = useState({ song: "", artist: "" });
  const [reviewItems, setReviewItems] = useState([]);

  const handleAddReview = (r) => {
    setReview((prevReview) => ({ ...prevReview, ...r }));
  };

  useEffect(() => {
    if (review.song && review.artist) {
      setReviewItems((prevItems) => [...prevItems, { ...review }]);
    }
  }, [review]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>ratings</Text>
      <View style={styles.items}>
        {reviewItems.map((review) => {
          return <Review song={review.song} artist={review.artist} />;
        })}
      </View>
      <View style={styles.buttons}>
        <SubmitButton
          text={"create review"}
          onPress={() => {
            navigation.navigate("create review");
          }}
        />
        <SubmitButton
          text={"exit"}
          onPress={() => {
            navigation.navigate("login");
          }}
        />
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
  items: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  buttons: {
    width: "40%",
  },
});

export default ReviewsScreen;
