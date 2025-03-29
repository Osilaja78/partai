"use client"
import { Stack } from "expo-router"
import { useTheme } from "~/context/theme-context"

export default function CreateEventLayout() {
  const { colors } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackVisible: true,
        headerTitle: "Create Event",
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  )
}

