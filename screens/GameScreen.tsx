import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomBetween(min: number, max: number, exclude: number) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
let max = 100;

const GameScreen = ({
  userNumber,
  onGameOver,
  onRestart,
}: {
  userNumber: number;
  onGameOver: () => void;
  onRestart: () => void;
}) => {
  const initialBuess = generateRandomBetween(min, max, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialBuess);

  const nextGuessHandler = (direction: "lower" | "higher") => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      return Alert.alert("잘못 된 입력값입니다.");
    }

    if (direction === "lower") {
      max = currentGuess;
    } else {
      min = currentGuess + 1;
    }

    const nextNum = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(nextNum);

    if (nextNum === userNumber) {
      Alert.alert("성공! 선택한 숫자는" + nextNum + "입니다!");
      return onGameOver();
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Title text={"maybe it is..."} />
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text style={{ textAlign: "center", color: "white" }}>
          Higher or Lower?
        </Text>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={() => nextGuessHandler("higher")}
            customStyle={{ buttonContainer: { width: 60 } }}
          >
            +
          </PrimaryButton>
          <PrimaryButton
            onPress={() => nextGuessHandler("lower")}
            customStyle={{ buttonContainer: { width: 60 } }}
          >
            -
          </PrimaryButton>
        </View>
      </View>
      <View></View>
      <View>
        <PrimaryButton onPress={onRestart}>reset</PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default GameScreen;
