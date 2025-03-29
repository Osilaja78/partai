"use client"

import { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowLeft, ArrowRight, Check, Edit } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import { useAuth } from "~/context/auth";

// const dressCode = [
//   {
//     id: 1,
//     name: "Elegant Formal Attire",
//     description: "Classic suits and evening gowns for a sophisticated atmosphere.",
//   },
//   {
//     id: 2,
//     name: "Tropical Resort Wear",
//     description: "Bright colors, floral patterns, and casual beach-inspired outfits.",
//   },
//   {
//     id: 3,
//     name: "Retro 80s Neon",
//     description: "Bold colors, leg warmers, and vintage accessories from the 1980s.",
//   },
//   {
//     id: 4,
//     name: "Masquerade Mystery",
//     description: "Formal attire with decorative masks for an air of mystery and elegance.",
//   },
//   {
//     id: 5,
//     name: "Futuristic Sci-Fi",
//     description: "Metallic fabrics, LED accessories, and space-inspired elements.",
//   },
// ]

export default function dressCodeScreen() {
  const { colors } = useTheme();
  const { token, eventData, updateEventData } = useAuth();

  const [dressCode, setDressCode] = useState<{ title: string; description: string; }[]>([]);
  const [selectedCostume, setSelectedCostume] = useState<{ title: string; description: string; } | null>(null);
  const [customCostume, setCustomCostume] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    // Save data to global state or context here
    await updateEventData({selectedCostume: selectedCostume?.title + '|' + selectedCostume?.description})
    router.push("/(create)/6")
  }

  const handleBack = () => {
    router.back()
  }

  const handleCostumeSelect = (dresscode: any) => {
    setSelectedCostume(dresscode);
    setShowCustomInput(false);
  }

  const handleCustomCostume = () => {
    setSelectedCostume(null);
    setShowCustomInput(true);
  }

  const getSuggestedThemes = async () => {
    try {
      console.log("Fetching themes!");
      setError('');
      setIsLoading(true);

      const response = await fetch('http://192.168.43.32:8002/ai/suggest-dress-code', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: eventData?.selectedTheme }),
      });

      const data = await response.json();
      
      if (response.status === 403) router.replace('/(auth)/login');
      if (!response.ok) throw new Error(data.detail || 'Something went wrong! Please try again.');

      // if (response.ok) setDressCode(data.dresscode);
      setDressCode((prev) => {
        const newDressCode = data.dresscode;
        return newDressCode;
      })
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSuggestedThemes();
    }, [])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(5 / 9) * 100}%`, backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.stepText, {color: colors.text}]}>Step 5 of 9</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.stepTitle, {color: colors.text}]}>Dress Code</Text>

        <Text style={[styles.description, {color: colors.text}]}>
          Select a dress code idea for your event, or create your own custom dress code.
        </Text>

        {isLoading && <Text style={[styles.loading, {color: colors.text}]}>Fetching AI suggestions ✨...</Text>}

        {!isLoading && <View style={styles.costumesContainer}>
          {dressCode.map((costume, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.costumeCard,
                {
                  backgroundColor: colors.card,
                  borderColor: selectedCostume?.title === costume.title ? colors.primary : colors.border,
                  borderWidth: selectedCostume?.title === costume.title ? 2 : 1,
                },
              ]}
              onPress={() => handleCostumeSelect(costume)}
            >
              <View style={styles.costumeContent}>
                <Text style={[styles.costumeName, {color: colors.text}]}>{costume.title}</Text>
                <Text style={[styles.costumeDescription, {color: colors.text}]}>{costume.description}</Text>
              </View>
              {selectedCostume?.title === costume.title && (
                <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
                  <Check size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.costumeCard,
              styles.customCostumeCard,
              {
                backgroundColor: colors.card,
                borderColor: showCustomInput ? colors.primary : colors.border,
                borderWidth: showCustomInput ? 2 : 1,
              },
            ]}
            onPress={handleCustomCostume}
          >
            <View style={styles.costumeContent}>
              <View style={styles.customCostumeHeader}>
                <Text style={[styles.costumeName, {color: colors.text}]}>Create Your Own</Text>
                <Edit size={16} color={colors.primary} />
              </View>
              <Text style={[styles.costumeDescription, {color: colors.text}]}>Define a custom costume or dress code for your event.</Text>
            </View>
          </TouchableOpacity>
        </View>}

        {showCustomInput && (
          <View style={styles.customInputContainer}>
            <Text style={[styles.label, {color: colors.text}]}>Your Custom Costume Theme</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Describe your costume or dress code idea"
              placeholderTextColor={colors.muted}
              value={customCostume}
              onChangeText={setCustomCostume}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        )}

        {/* <View style={styles.aiSuggestion}>
          <Text style={styles.aiSuggestionTitle}>AI Suggestion</Text>
          <Text style={styles.aiSuggestionText}>
            Based on your event theme, consider providing visual examples of the costume ideas to your guests. You might
            also want to suggest specific accessories or color schemes to help guests coordinate their outfits.
          </Text>
        </View> */}
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
              opacity: selectedCostume || (showCustomInput && customCostume) ? 1 : 0.7,
            },
          ]}
          onPress={handleNext}
          disabled={!(selectedCostume || (showCustomInput && customCostume))}
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
  costumesContainer: {
    marginBottom: 24,
  },
  costumeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  customCostumeCard: {
    borderStyle: "dashed",
  },
  costumeContent: {
    flex: 1,
  },
  customCostumeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  costumeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  costumeDescription: {
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
  customInputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#FFFFFF",
    minHeight: 100,
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
  loading: {
    fontSize: 20,
    opacity: 0.8,
  },
})

