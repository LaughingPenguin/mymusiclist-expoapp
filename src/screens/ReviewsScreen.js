import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Review from "../components/Review";
import SubmitButton from "../components/SubmitButton";
import Modal from "react-native-modal";
import InputField from "../components/InputField";

const ReviewsScreen = ({ navigation }) => {
  const [review, setReview] = useState({
    username: "",
    song: "",
    artist: "",
    rating: NaN,
  });
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [reviewItems, setReviewItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddReview = ({ name, value }) => {
    setReview((prevReview) => ({ ...prevReview, [name]: value }));
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
        <SubmitButton text={"create review"} onPress={toggleModal} />
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.createModal}>
            <Text style={styles.sectionTitle}>create a review</Text>
            <View style={styles.createForm}>
              <Text>song</Text>
              <InputField placeholder="song" value={song} setValue={setSong} />
              <Text>artist</Text>
              <InputField
                placeholder="artist"
                value={artist}
                setValue={setArtist}
              />
              <Text>rating</Text>
              <SubmitButton
                text={"create review"}
                onPress={handleAddReview}
                style={styles.closeModal}
              />
              <SubmitButton
                text={"close"}
                onPress={toggleModal}
                style={styles.closeModal}
              />
            </View>
          </View>
        </Modal>
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
  createModal: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#d7dedc",
  },
  createForm: {
    width: "70%",
    marginTop: 5,
  },
});

export default ReviewsScreen;
