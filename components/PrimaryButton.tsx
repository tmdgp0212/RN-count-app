import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  onPress?: () => void;
  customStyle?: {
    buttonContainer?: { [name: string]: any };
    buttonText?: { [name: string]: any };
  };
  children: React.ReactNode;
}

const PrimaryButton = ({ onPress, customStyle, children }: Props) => {
  return (
    <View style={[style.buttonContainer, customStyle?.buttonContainer]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => (pressed ? [style.pressd] : [])}
        android_ripple={{ color: "#032955" }}
      >
        <Text style={[style.buttonText, customStyle?.buttonText]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    margin: 4,
    backgroundColor: "#042c81",
    borderRadius: 5,

    elevation: 2,
    // android_ripple의 물결효과가 영역을 벗어날 수 있으므로 overflow-hidden 속성 부여
    overflow: "hidden",
  },
  buttonText: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "white",
    textAlign: "center",
  },
  pressd: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
