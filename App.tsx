import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  useWindowDimensions,
} from "react-native";

// npm i -> expo i : 현재 RN 버전에 알맞은 버전을 찾아 설치해줌.
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import SplashScreen from "expo-splash-screen";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [fontLoaded, fontError] = useFonts({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const [pickedNumber, setPickedNumber] = useState<number | null>(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);

  const pickNumberHandler = (number: number) => {
    setPickedNumber(number);
  };

  const gameOverHandler = (round: number) => {
    setGameIsOver(true);
    setRoundNumber(round);
  };

  const resetGameHandler = () => {
    setPickedNumber(null);
    setRoundNumber(0);
    setGameIsOver(false);
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  useEffect(() => {
    onLayoutRootView;
  }, [fontLoaded]);

  if (!fontLoaded) return null;

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
          style={styles.backgroundContainer} // View컴포넌트에 적용되는 스타일
          imageStyle={styles.backgroundImage} // Image컴포넌트에 적용되는 스타일
          resizeMode="cover"
        >
          <SafeAreaView
            // SafeAreaView : 컨텐츠가 모바일 화면 상단의 노치와 겹치지 않도록 조절
            style={styles.screen}
          >
            {gameIsOver ? (
              <GameOverScreen
                roundsNumber={roundNumber}
                userNumber={pickedNumber}
                onRestart={resetGameHandler}
              />
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
  backgroundContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
