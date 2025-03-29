"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Animated, type ViewProps, Easing } from "react-native"

type SlideDirection = "up" | "down" | "left" | "right"

interface SlideInViewProps extends ViewProps {
  duration?: number
  delay?: number
  direction?: SlideDirection
  distance?: number
  children: React.ReactNode
}

export default function SlideInView({
  duration = 500,
  delay = 0,
  direction = "up",
  distance = 50,
  children,
  style,
  ...props
}: SlideInViewProps) {
  const translateX = useRef(
    new Animated.Value(direction === "left" ? distance : direction === "right" ? -distance : 0),
  ).current
  const translateY = useRef(
    new Animated.Value(direction === "up" ? distance : direction === "down" ? -distance : 0),
  ).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateX }, { translateY }],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  )
}

