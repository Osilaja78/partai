"use client"

import { useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useTheme } from "~/context/theme-context";

interface AnimatedProgressBarProps {
  progress: number // 0 to 1
  height?: number
}

export default function AnimatedProgressBar({ progress, height = 4 }: AnimatedProgressBarProps) {
  const { colors } = useTheme();
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start()
  }, [progress])

  return (
    <View style={[styles.container, { height, backgroundColor: "#2A2A2A", borderRadius: height / 2 }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
            backgroundColor: colors.primary,
            height,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    marginTop: 25,
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
  },
})

