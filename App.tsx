import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [pickedNumber, setPickedNumber] = useState<number | null>(null);
  const pickNumberHandler = (number: number) => {
    setPickedNumber(number);
  };
  return (
    <LinearGradient
      colors={["#e8f0ff", "#bdcae4", "#bdcae4"]}
      style={styles.rootScreen}
    >
      <ImageBackground // ImageBackground는 View와 Image 태그의 조합
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.screen} // View컴포넌트에 적용되는 스타일
        imageStyle={styles.backgroundImage} // Image컴포넌트에 적용되는 스타일
      >
        {/* SafeAreaView : 컨텐츠가 모바일 화면 상단의 노치와 겹치지 않도록 조절 */}
        <SafeAreaView style={styles.screen}>
          {pickedNumber ? (
            <GameScreen />
          ) : (
            <StartGameScreen onPickNumber={pickNumberHandler} />
          )}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // RN은 기본적으로 flex/column. 높이는 컨텐츠에 필요한 양만큼만 자리를 차지
  // root에 flex:1 스타일을 먹여야 화면 전체를 차지하게 됨.
  rootScreen: {
    flex: 1,
    backgroundColor: "#e8f0ff",
  },
  screen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
