import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// touchable은 더이상 권장하지 않음. 터치 가능한 영역은 pressable 컴포넌트 사용 권장.

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
    // style 속성에 배열로 여러 스타일 속성 객체를 담을 수 있다.
    <View style={[style.buttonContainer, customStyle?.buttonContainer]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => (pressed ? [style.pressd] : [])}
        android_ripple={{ color: "#032955" }} // android 물결효과 
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
    borderRadius: 20,
    elevation: 2, // android 그림자 설정
    overflow: "hidden", // android_ripple의 물결효과가 영역을 벗어날 수 있으므로 overflow-hidden 속성 부여
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
