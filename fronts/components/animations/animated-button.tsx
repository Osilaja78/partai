"use client"

import type React from "react"
import { useRef } from "react"
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
} from "react-native"

interface AnimatedButtonProps {
  onPress: () => void
  title: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabled?: boolean
}

export default function AnimatedButton({
  onPress,
  title,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  disabled = false,
}: AnimatedButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.touchable, disabled && { opacity: 0.7 }]}
    >
      <Animated.View style={[styles.container, style, { transform: [{ scale: scaleAnim }] }]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>
    </TouchableOpacity>
  )
}

const View = Animated.createAnimatedComponent(TouchableOpacity)

const styles = StyleSheet.create({
  touchable: {
    overflow: "visible",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
})

