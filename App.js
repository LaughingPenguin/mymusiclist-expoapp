import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from 'react-native-toast-notifications';
import SignUpScreen from "./src/screens/SignUpScreen";
import LoginScreen from "./src/screens/LogInScreen";
import ReviewsScreen from "./src/screens/ReviewsScreen";
import ViewReviewScreen from "./src/screens/ViewReviewScreen";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="sign up">
          <Stack.Screen
            name="sign up"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="reviews"
            component={ReviewsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="review"
            component={ViewReviewScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7dedc",
    alignItems: "center",
    justifyContent: "top",
  },
});
