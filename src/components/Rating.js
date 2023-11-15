import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

// The star rating component is used for the rating systems in the viewreviewscreen and
// the create/edit review modals.
const StarRating = ({ totalStars, rating, onStarPress }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const starIcon = i < rating ? emptyStar : solidStar;
      stars.push(
        <TouchableOpacity key={i} onPress={() => onStarPress(i)}>
          <FontAwesomeIcon
            icon={starIcon}
            size={30}
            color="#506186"
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  star: {
    marginHorizontal: 5,
  },
});

export default StarRating;
