import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/colors";

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
  onGameOver: (round: number) => void;
  onRestart: () => void;
}) => {
  const initialGuess = generateRandomBetween(min, max, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [roundes, setRoundes] = useState<
    {
      guessedNumber: number;
      direction: "lower" | "higher";
    }[]
  >([]);

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

    setRoundes((prevRoundes) => [
      { guessedNumber: currentGuess, direction },
      ...prevRoundes,
    ]);
    const nextNum = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(nextNum);

    if (nextNum === userNumber) {
      Alert.alert("성공! 선택한 숫자는" + nextNum + "입니다!");
      min = 1;
      max = 100;
      return onGameOver(roundes.length + 1);
    }
  };

  return (
    <>
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
            <AntDesign name="plus" color={"white"} />
          </PrimaryButton>
          <PrimaryButton
            onPress={() => nextGuessHandler("lower")}
            customStyle={{ buttonContainer: { width: 60 } }}
          >
            <AntDesign name="minus" color={"white"} />
          </PrimaryButton>
        </View>
      </View>
      <View style={styles.logContainer}>
        <FlatList
          data={roundes}
          renderItem={(logItem) => (
            <View style={styles.logItem}>
              <Text style={{ color: "white" }}>
                {logItem.item.guessedNumber}
              </Text>
              <AntDesign
                name={
                  logItem.item.direction === "higher" ? "arrowup" : "arrowdown"
                }
                color={"white"}
              />
            </View>
          )}
          keyExtractor={(item) => `${item.guessedNumber}`}
        />
      </View>
      <View>
        <PrimaryButton
          onPress={() => {
            min = 1;
            max = 100;
            onRestart();
          }}
        >
          reset
        </PrimaryButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logContainer: {
    flex: 1,
    marginVertical: 16,
    width: "100%",
  },
  logItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: Colors.primary600,
  },
});

export default GameScreen;
