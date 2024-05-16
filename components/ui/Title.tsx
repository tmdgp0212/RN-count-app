import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";

interface Props {
  text: string;
  customStyle?: {
    title?: { [name: string]: any };
  };
}

const Title = ({ text }: Props) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    textAlign: "center",
    color: "white",
    padding: 24,
    margin: 24,
  },
});

export default Title;
