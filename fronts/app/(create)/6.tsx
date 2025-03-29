"use client"

import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "~/context/auth";

const demographicOptions = [
  {
    id: "adults",
    name: "Adults Only",
    description: "Event suitable for guests 18+ or 21+ depending on venue and activities.",
    icon: "🍸",
  },
  {
    id: "kids",
    name: "Kids Only",
    description: "Event designed specifically for children with age-appropriate activities.",
    icon: "🧸",
  },
  {
    id: "mixed",
    name: "Mixed - Family Friendly",
    description: "Event suitable for all ages with activities for both adults and children.",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: "teens",
    name: "Teenagers",
    description: "Event designed for teenagers with age-appropriate activities and supervision.",
    icon: "🎮",
  },
  {
    id: "seniors",
    name: "Seniors",
    description: "Event catered to older adults with appropriate accommodations and activities.",
    icon: "🧓",
  },
  {
    id: "other",
    name: "Other",
    description: "Custom demographic or specific group not listed above.",
    icon: "✨",
  },
]

export default function DemographicsScreen() {
  const { colors } = useTheme();
  const { updateEventData } = useAuth();

  const [selectedDemographic, setSelectedDemographic] = useState("");

  const handleNext = async () => {
    // Save data to global state or context here
    await updateEventData({demographics: selectedDemographic});
    router.push("/(create)/7");
  }

  const handleBack = () => {
    router.back();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(6 / 9) * 100}%`, backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.stepText, {color: colors.text}]}>Step 6 of 9</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.stepTitle, {color: colors.text}]}>Attendee Demographics</Text>

        <Text style={[styles.description, {color: colors.text}]}>
          Select the primary demographic of people who will be attending your event. This helps us suggest appropriate
          activities and accommodations.
        </Text>

        <View style={styles.optionsContainer}>
          {demographicOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                {
                  backgroundColor: colors.card,
                  borderColor: selectedDemographic === option.name ? colors.primary : colors.border,
                  borderWidth: selectedDemographic === option.name ? 2 : 1,
                },
              ]}
              onPress={() => setSelectedDemographic(option.name)}
            >
              <View style={styles.optionContent}>
                <Text style={[styles.optionIcon, {color: colors.text}]}>{option.icon}</Text>
                <View style={styles.optionTextContent}>
                  <Text style={[styles.optionName, {color: colors.text}]}>{option.name}</Text>
                  <Text style={[styles.optionDescription, {color: colors.text}]}>{option.description}</Text>
                </View>
              </View>
              {selectedDemographic === option.id && (
                <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
                  <Check size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]} onPress={handleBack}>
          <ArrowLeft size={18} color={colors.text} style={styles.buttonIconLeft} />
          <Text style={[styles.buttonText, {color: colors.text}]}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
              opacity: selectedDemographic ? 1 : 0.7,
            },
          ]}
          onPress={handleNext}
          disabled={!selectedDemographic}
        >
          <Text style={[styles.buttonText, {color: colors.text}]}>Next</Text>
          <ArrowRight size={18} color={colors.text} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#2A2A2A",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  stepText: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.7,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  optionTextContent: {
    flex: 1,
  },
  optionName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  selectedBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  aiSuggestion: {
    padding: 16,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 8,
  },
  aiSuggestionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 8,
  },
  aiSuggestionText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  buttonIcon: {
    marginLeft: 8,
  },
  buttonIconLeft: {
    marginRight: 8,
  },
});

