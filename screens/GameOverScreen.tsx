import React from "react";
import { Text, View } from "react-native";

const GameOverScreen = ({ onRestart }: { onRestart: () => void }) => {
  return (
    <View>
      <Text>Game Is Over</Text>
    </View>
  );
};

export default GameOverScreen;
