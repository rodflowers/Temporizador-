import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  AsyncStorageStatic,
} from "react-native";
import { fontSizes, spacing } from "../../utils/sizes";

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  const saveFocusHistory = async () => {
    try {
      AsyncStorageStatic.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (err) {
      console.log(err);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorageStatic.getItem("focusHistory");

      if (history && JSON.stringify(history).length) {
        setFocusHistory(JSON.stringify(history));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFocusHistory();
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    saveFocusHistory();
    return () => {
      // cleanup
    };
  }, [focusHistory]);

  const historyItem = ({ item, index }) => {
    return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
        <Text style={styles.title}>Cosas en las que me he encofado</Text>
        {!!focusHistory.length && (
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: "center" }}
            data={focusHistory}
            renderItem={historyItem}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status === 1 ? "green" : "red",
    fontSize: fontSizes.md,
  }),
  title: {
    color: "#fff",
    fontSize: fontSizes.lg,
  },
});
