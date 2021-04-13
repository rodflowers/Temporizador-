import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({
  minutes = 1,
  isPaused,
  handleProgress,
  handleOnEnd,
}) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const interval = React.useRef(null);

  const countTimeDown = () => {
    setMillis((time) => {
      if (time === 0) {
        // do more stuff here
        clearInterval(interval.current);
        handleOnEnd();
        return time;
      }
      const timeLeft = time - 1000;
      // report de progress
      handleProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
    return () => {
      // cleanup
    };
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countTimeDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
});
