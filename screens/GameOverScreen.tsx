import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

interface Props {
  roundsNumber: number;
  userNumber: number | null;
  onRestart: () => void;
}

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }: Props) => {
  return (
    <>
      <Title text="Game Is Over" />
      <Text style={styles.summaryText}>
        Your phone needed
        <Text style={styles.highlight}> {roundsNumber} </Text>
        rounds {"\n"} to guess the number
        <Text style={styles.highlight}> {userNumber} </Text>.
      </Text>
      <View style={{ flex: 1 }}></View>
      <PrimaryButton onPress={onRestart}>Restart</PrimaryButton>
    </>
  );
};

const styles = StyleSheet.create({
  summaryText: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
  },
});

export default GameOverScreen;
