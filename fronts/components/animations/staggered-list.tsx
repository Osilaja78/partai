"use client"

import React, { useEffect, useRef } from "react"
import { Animated, type ViewProps, View } from "react-native"

interface StaggeredListProps extends ViewProps {
  children: React.ReactNode[]
  itemDelay?: number
  initialDelay?: number
  duration?: number
  distance?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function StaggeredList({
  children,
  itemDelay = 50,
  initialDelay = 0,
  duration = 500,
  distance = 30,
  direction = "up",
  style,
  ...props
}: StaggeredListProps) {
  const animations = useRef(
    React.Children.map(children, (_, i) => ({
      opacity: new Animated.Value(0),
      translateX: new Animated.Value(direction === "left" ? distance : direction === "right" ? -distance : 0),
      translateY: new Animated.Value(direction === "up" ? distance : direction === "down" ? -distance : 0),
    })),
  ).current

  useEffect(() => {
    const animationSequence = (animations ?? []).map((anim, i) => {
      return Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration,
          delay: initialDelay + i * itemDelay,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateX, {
          toValue: 0,
          duration,
          delay: initialDelay + i * itemDelay,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateY, {
          toValue: 0,
          duration,
          delay: initialDelay + i * itemDelay,
          useNativeDriver: true,
        }),
      ])
    })

    Animated.parallel(animationSequence).start()
  }, [])

  return (
    <View style={style} {...props}>
      {React.Children.map(children, (child, i) => (
        <Animated.View
          style={{
            opacity: animations?.[i]?.opacity,
            transform: [{ translateX: animations?.[i]?.translateX || 0 }, { translateY: animations?.[i]?.translateY || 0 }],
          }}
        >
          {child}
        </Animated.View>
      ))}
    </View>
  )
}

