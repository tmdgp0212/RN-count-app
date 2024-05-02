import React, { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { StyleSheet } from "react-native";

interface Props {
  onPickNumber: (number: number) => void;
}

const StartGameScreen = ({ onPickNumber }: Props) => {
  const [numberInput, setNumberInput] = useState<string>("");

  const inputChangeHandler = (value: string) => {
    setNumberInput(value);
  };
  const resetInputHandler = () => {
    setNumberInput("");
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(numberInput);
    if (
      isNaN(chosenNumber) ||
      !Number.isInteger(chosenNumber) ||
      chosenNumber <= 0 ||
      99 < chosenNumber
    )
      // Alert
      // Alert.alert : 확인, 취소 등 버튼 동작만 가능한 경고창
      // Alert.prompt: 내용 입력(input)이 가능한 경고창
      return Alert.alert(
        "Invalid Error", // title
        "1 ~ 99 사이의 정수를 입력해주세요.", // description
        [
          // button custom
          {
            text: "확인",
            style: "destructive", // IOS
            onPress: resetInputHandler,
          },
        ]
      );

    onPickNumber(chosenNumber);
  };

  return (
    <View style={styles.inputContainer}>
      {/* keyboardType 설정으로 숫자 입력만 가능한 input으로 변경 */}
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none" // 자동완성
        autoCorrect={false} // 자동수정
        onChangeText={inputChangeHandler}
        value={numberInput || ""}
      />
      <View style={styles.buttonsContainer}>
        <PrimaryButton
          customStyle={{ buttonContainer: styles.buttonContainer }}
          onPress={resetInputHandler}
        >
          Reset
        </PrimaryButton>
        <PrimaryButton
          customStyle={{ buttonContainer: styles.buttonContainer }}
          onPress={confirmInputHandler}
        >
          Confirm
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#17034e",
    borderRadius: 8,

    /* 모바일에는 boxShadow 속성이 없음 */
    // elevation : android용 그림자속성
    elevation: 4,
    // shadow~ : IOS용 그림자속성
    shadowColor: "black", // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자의 위치
    shadowRadius: 6, // 그림자의 번짐 정도
    shadowOpacity: 0.25, // 그림자의 투명도
  },
  numberInput: {
    marginVertical: 16,
    width: 50,
    height: 50,
    color: "#ddb52f",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
