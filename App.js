import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Button,
  Text,
  Pressable,
} from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";


export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setNewCourseGoal] = useState([]);
  const [isCheckItemId, setIsCheckItemId] = useState([]);


  function changeModalVisible() {
    setModalIsVisible(true);
  }
  function cancelModalVisible() {
    setModalIsVisible(false);
  }

  function addGoalEvent(enteredGoalText) {
    if (enteredGoalText === "") {
      Alert.alert("Null error", "Goal name does not empty");
    } else {
      // console.log(enteredGoalText);
      setNewCourseGoal((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: Math.random().toString() },
      ]);
      setModalIsVisible(false);
    }
  }

  function deleteAllItems() {
    Alert.alert('Delete All', 'Are you Sure?', [
      {
        text: "Cancel",
        onPress: () => { },
        style: "cancel"
      },
      { text: "OK", onPress: () => setNewCourseGoal([]) }
    ])
      ;
  }

  function deleteItemHandler(id) {
    setNewCourseGoal(
      courseGoals.filter((goal) => {
        return goal.id !== id;
      })
    );
  }

  function deleteSelectedItem() {
    let tempArray = courseGoals;
    let tempIDArray = isCheckItemId;
    for (let i = 0; i < tempIDArray.length; i++) {
      tempArray = tempArray.filter((goal) => { return goal.id !== tempIDArray[i] })
    }
    setNewCourseGoal(tempArray);
    setIsCheckItemId([]);
  }

  function buttonDeleteSelectedStatus() {
    if (isCheckItemId.length > 0)
      return true;
    else
      return false
  }

  function checkedItem(id) {
    // if(check){
    setIsCheckItemId((currentItems) => [...currentItems, id]);
    // }else{

    // }
  }

  return (
    <View style={styles.appContainer}>
      <View style={{ paddingHorizontal: 20 }}>
        <Button
          title="Add Goal"
          color={"purple"}
          onPress={changeModalVisible}
        ></Button>
      </View>

      <GoalInput
        visible={modalIsVisible}
        onAddGoal={addGoalEvent}
        onCancel={cancelModalVisible}

      />

      {
        courseGoals && courseGoals.length > 0 ? (
          <View style={styles.listGoalsContainer}>
            <FlatList
              data={courseGoals}
              renderItem={(itemData) => {
                return (
                  <GoalItem
                    text={itemData.item.text}
                    // onDelete={deleteItemHandler}
                    id={itemData.item.id}
                    checkItem={checkedItem}
                  />
                );
              }}
              alwaysBounceVertical={false}
              keyExtractor={(item, index) => {
                return item.id;
              }}
            />
          </View>) : (
          <View style={styles.emptyViewContainer}>
            <Text style={styles.emptyText}>
              Your goals list is empty.
              Please, add new goals, and feel free
            </Text>
          </View>
        )
      }

      {/* //conditional rendering
          // 
              >>>>>>>> checkpoint <<<<<<<<<<<<<<
          */}
      {
        //  courseGoals?.length > 0
        courseGoals && courseGoals.length > 0 ? (
          <View style={styles.menuContainer}>
            <View style={styles.menuItems}>
              <Button title="Delete All" color={"red"} onPress={deleteAllItems} />
            </View>
            <View style={styles.menuItems}>
              <Button title='Delete Selected' color={'orange'} onPress={deleteSelectedItem} />
            </View>
          </View>
        ) : null
      }

    </View>
  );
}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 50,
  },

  listGoalsContainer: {
    flex: 5,
    marginTop: 16
  },
  menuContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent: 'center'
  },
  menuItems: {
    marginHorizontal: 16
  },
  emptyViewContainer: {
    marginTop: 10,
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'yellow'
  },
  emptyText: {
    fontSize: 16,
    fontStyle: "italic"
  }
});
