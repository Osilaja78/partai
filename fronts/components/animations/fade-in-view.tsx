"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Animated, type ViewProps } from "react-native"

interface FadeInViewProps extends ViewProps {
  duration?: number
  delay?: number
  initialOpacity?: number
  finalOpacity?: number
  children: React.ReactNode
}

export default function FadeInView({
  duration = 500,
  delay = 0,
  initialOpacity = 0,
  finalOpacity = 1,
  children,
  style,
  ...props
}: FadeInViewProps) {
  const opacity = useRef(new Animated.Value(initialOpacity)).current

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: finalOpacity,
      duration,
      delay,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={[
        {
          opacity,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  )
}

