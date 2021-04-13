import React, { useState } from "react";
import { View, StyleSheet, Text, Vibration, Platform } from "react-native";
import { CountDown } from "../../components/CountDown";
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./Timing";
import { useKeepAwake } from "expo-keep-awake";

export const Timer = ({ focusSubject, handleOnTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const handleProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const handleChangeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const handleOnEnd = () => {
    // vibrate();
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    handleOnTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          handleProgress={handleProgress}
          handleOnEnd={handleOnEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Enfocandome en:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color="#5E84E2"
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing handleChangeTime={handleChangeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearButton}>
        <RoundedButton size={50} title="-" onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    paddingLeft: 25,
    paddingBottom: 25,
  },
});
