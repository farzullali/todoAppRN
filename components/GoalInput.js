import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal } from "react-native";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function textInputGoalEvent(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalEvent() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }

  return (
    <Modal visible={props.visible} animationType="slide" transparent={false}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your course goals"
          style={styles.textInputStyle}
          onChangeText={textInputGoalEvent}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyleItem}>
            <Button title="Add Goal" onPress={addGoalEvent} />
          </View>
          <View style={styles.buttonStyleItem}>
            <Button title="Cancel" onPress={props.onCancel}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 30,
    marginBottom: 20,
    justifyContent: "center",
  },
  textInputStyle: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
    // alignItems: "center",
  },
  buttonStyleItem: {
    width: 150,
    marginHorizontal: 10,
  }
});
