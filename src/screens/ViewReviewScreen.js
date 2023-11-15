import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Rating from "../components/Rating";
import SubmitButton from "../components/SubmitButton";

const ViewReviewScreen = ({ navigation, route }) => {
  const { review } = route.params;

  const { id, username, song, artist, rating } = review;

  const [reviewState, setReviewState] = useState(review);

  return (
    <SafeAreaView>
      <Text style={styles.sectionTitle}>Song Details</Text>
      <View style={styles.createForm}>
        <Text style={styles.inputTitle}>username</Text>
        <InputField placeholder="username" value={username} editable={false} />
        <Text style={styles.inputTitle}>song</Text>
        <InputField placeholder="song" value={song} editable={false} />
        <Text style={styles.inputTitle}>artist</Text>
        <InputField placeholder="artist" value={artist} editable={false} />
        <Rating totalStars={5} rating={rating} onStarPress={() => {}} />
        <SubmitButton
          text={"edit"}
          onPress={() => navigation.navigate("reviews")}
          style={styles.closeModal}
        />
        <SubmitButton
          text={"delete"}
          onPress={() => navigation.navigate("reviews")}
          style={styles.closeModal}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ViewReviewScreen;
