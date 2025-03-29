"use client"

import React, { useRef } from "react"
import { Animated, TouchableOpacity, StyleSheet, type ViewStyle, type StyleProp, Easing } from "react-native"

interface AnimatedCardProps {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  isSelected?: boolean
  disabled?: boolean
}

export default function AnimatedCard({
  onPress,
  style,
  children,
  isSelected = false,
  disabled = false,
}: AnimatedCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  // Add a subtle bounce effect when selected
  React.useEffect(() => {
    if (isSelected) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.03,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isSelected])

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View style={[styles.container, style, { transform: [{ scale: scaleAnim }] }]}>{children}</Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
})

