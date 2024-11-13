import React from "react";
import { View, Text, ScrollView } from "react-native";
import { TitleComponent } from "../components/TitleComponent";

export const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <TitleComponent />
        <Text>Settings Screen</Text>
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
