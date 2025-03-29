"use client"
import { Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "~/context/theme-context";

const eventTypes = [
  { id: "birthday", label: "Birthday" },
  { id: "wedding", label: "Wedding" },
  { id: "corporate", label: "Corporate" },
  { id: "social", label: "Social Gathering" },
  { id: "concert", label: "Concert" },
  { id: "festival", label: "Festival" },
  { id: "dinner", label: "Dinner" },
  { id: "other", label: "Other" },
]

export default function EventTypeSelector({ selectedType, onSelectType }: { selectedType: string; onSelectType: (type: string) => void }) {
  const { colors } = useTheme()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {eventTypes.map((type) => (
        <TouchableOpacity
          key={type.id}
          style={[
            styles.typeButton,
            {
              backgroundColor: selectedType === type.id ? colors.primary : colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() => onSelectType(type.id)}
        >
          <Text style={[styles.typeButtonText, { color: selectedType === type.id ? "#FFFFFF" : colors.text }]}>
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
})
