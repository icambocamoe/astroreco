import React from "react";
import { View, Text, ScrollView } from "react-native";
import { TitleComponent } from "../components/TitleComponent";

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <TitleComponent />
        <Text>Home Screen</Text>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 50, // Combining padding from both containers
    backgroundColor: "#fff",
  },
};
