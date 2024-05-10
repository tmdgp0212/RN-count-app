import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";

// expo install expo-linear-gradient
// npm i -> expo i : 현재 RN 버전에 알맞은 버전을 찾아 설치해줌.
import {LinearGradient} from 'expo-linear-gradient'


import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import { StatusBar } from "expo-status-bar";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [pickedNumber, setPickedNumber] = useState<number | null>(null);
  const [gameIsOver, setGameIsOver] = useState(false);

  const pickNumberHandler = (number: number) => {
    setPickedNumber(number);
  };

  const gameOverHandler = () => {
    setGameIsOver(true);
  };

  const resetGameHandler = () => {
    setPickedNumber(null);
    setGameIsOver(false);
  };
  return (
    <>
      <StatusBar style="auto" />
      <LinearGradient
        // colors 배열에 있는 색상으로 자동 그라데이션 적용
        colors={[Colors.primary700, Colors.primary300, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          // ImageBackground는 View와 Image 태그의 조합
          source={require("./assets/images/background.png")}
          style={styles.screen} // View컴포넌트에 적용되는 스타일
          imageStyle={styles.backgroundImage} // Image컴포넌트에 적용되는 스타일
          resizeMode="cover"
        >
          <SafeAreaView
            // SafeAreaView : 컨텐츠가 모바일 화면 상단의 노치와 겹치지 않도록 조절
            style={styles.screen}
          >
            {gameIsOver ? (
              <GameOverScreen onRestart={resetGameHandler} />
            ) : pickedNumber ? (
              <GameScreen
                userNumber={pickedNumber}
                onGameOver={gameOverHandler}
                onRestart={resetGameHandler}
              />
            ) : (
              <StartGameScreen onPickNumber={pickNumberHandler} />
            )}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  // RN은 기본적으로 flex/column. 높이는 컨텐츠에 필요한 양만큼만 자리를 차지
  // root에 flex:1 스타일을 먹여야 화면 전체를 차지하게 됨.
  rootScreen: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
