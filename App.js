import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    //
  };

  const STATUS = {
    COMPLETED: 1,
    CANCELLED: 2,
  };
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          handleOnTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.COMPLETED);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus setFocusSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
      <Text>{JSON.stringify(focusHistory)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
