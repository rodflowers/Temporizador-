import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";

export const Timing = ({ handleChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="6s"
          onPress={() => handleChangeTime(0.1)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="15"
          onPress={() => handleChangeTime(15)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="20"
          onPress={() => handleChangeTime(20)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timingButton: {
    flex: 1,
    alignItems: "center",
  },
});
