import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function GoalItem(props) {
  const textDecorations = ["none", "line-through"];
  const textColors = ["white", "black"];
  const backgroundColorsView = ["purple", "grey"];

  const [doneTaskText, setDoneTaskText] = useState(0);
  const [checkboxState, setChecboxState] = useState(false);



  const hookedStyle = {
    textDecorationLine: textDecorations[doneTaskText],
    color: textColors[doneTaskText],
  };
  const hookedStyleView = {
    backgroundColor: backgroundColorsView[doneTaskText],
  };

  //value - statein faktiki ededi, options sechimler,
  const changeSettings = (value, options, setterFunction) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };






  return (
      <Pressable
        // onLongPress={props.onDelete.bind(this, props.id)}
        onPress={() => {
          changeSettings(doneTaskText, textDecorations, setDoneTaskText);
        }}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
    <View style={[styles.GoalStyle, hookedStyleView]}>
      <BouncyCheckbox
        size={20}
        fillColor="green"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        onPress={
          (isChecked) => {
            setChecboxState(isChecked);
            if (!checkboxState) {
              props.checkItem(props.id);
            }
          }
        }
        isChecked={false}
      />

        <Text style={[styles.textGoalStyle, hookedStyle]}>{props.text}</Text>
    </View>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  GoalStyle: {
    backgroundColor: "purple",
    margin: 5,
    padding: 5,
    color: "white",
    borderRadius: 6,
    flexDirection: 'row',
  },
  textGoalStyle: {
    color: "white",
    flexDirection: "row",
  },
  pressedItem: {
    opacity: 0.5,
  },
});
