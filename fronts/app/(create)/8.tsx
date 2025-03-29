"use client"

import { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import { useAuth } from "~/context/auth";

const partyFavors = [
  {
    id: 1,
    name: "Personalized Gift Bags",
    description: "Custom gift bags with themed items and personalized thank you notes.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Custom Photo Frames",
    description: "Themed photo frames with pictures taken during the event.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Gourmet Treat Boxes",
    description: "Boxes of premium chocolates, cookies, or other treats.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Themed Keychains",
    description: "Custom keychains that match your event theme.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Mini Plants or Succulents",
    description: "Small potted plants with decorative containers.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Custom Drinkware",
    description: "Personalized cups, mugs, or water bottles.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function PartyFavorsScreen() {
  const { colors } = useTheme();
  const { token, eventData, updateEventData } = useAuth();

  const [partyFavors, setPartyFavors] = useState<{ title: string; description: string; }[]>([]);
  const [selectedFavors, setSelectedFavors] = useState<{ title: string; description: string; }[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    // Save data to global state or context here
    await updateEventData({selectedPartyFavours: selectedFavors})
    router.push("/(create)/9");
  }

  const handleBack = () => {
    router.back();
  }

  const toggleFavor = (favour: any) => {
    if (selectedFavors.some((a) => a.title === favour.title)) {
      setSelectedFavors((prev) => {
        const newFavors = selectedFavors.filter((a) => a.title !== favour.title);
        return newFavors;
      });
    } else {
      setSelectedFavors((prev) => {
        const newFavors = [...selectedFavors, favour];
        return newFavors;
      });
    }
  }

  const getSuggestedPartyFavours = async () => {
    try {
      console.log("Fetching party favours!");
      setError('');
      setIsLoading(true);

      const response = await fetch('http://192.168.43.32:8002/ai/suggest-party-favours', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: eventData?.selectedTheme }),
      });

      const data = await response.json();
      
      if (response.status === 403) router.replace('/(auth)/login');
      if (!response.ok) throw new Error(data.detail || 'Something went wrong! Please try again.');

      if (response.ok) setPartyFavors(data.party_favours);
      console.log(eventData);
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSuggestedPartyFavours();
    }, [])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(8 / 9) * 100}%`, backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.stepText, {color: colors.text}]}>Step 8 of 9</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.stepTitle, {color: colors.text}]}>Party Favors</Text>

        <Text style={[styles.description, {color: colors.text}]}>
          Select party favors to thank your guests for attending. You can choose multiple options.
        </Text>

        {isLoading && <Text style={[styles.loading, {color: colors.text}]}>Fetching AI suggestions ✨...</Text>}

        {!isLoading && <View style={styles.favorsGrid}>
          {partyFavors.map((favor, index) => {
            const isSelected = selectedFavors.includes(favor)
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.favorCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
                onPress={() => toggleFavor(favor)}
              >
                {/* <Image source={{ uri: favor.image }} style={styles.favorImage} /> */}
                <View style={styles.favorContent}>
                  <Text style={[styles.favorName, {color: colors.text}]}>{favor.title}</Text>
                  <Text style={[styles.favorDescription, {color: colors.text}]}>{favor.description}</Text>
                </View>
                {isSelected && (
                  <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
                    <Check size={16} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>}

        <View style={styles.selectionSummary}>
          <Text style={[styles.selectionSummaryText, {color: colors.text, backgroundColor: colors.card}]}>
            {selectedFavors.length === 0
              ? "No party favors selected yet"
              : `Selected ${selectedFavors.length} ${selectedFavors.length === 1 ? "favor" : "favors"}`}
          </Text>
        </View>

        {/* <View style={styles.aiSuggestion}>
          <Text style={styles.aiSuggestionTitle}>AI Suggestion</Text>
          <Text style={styles.aiSuggestionText}>
            Party favors that align with your event theme create a cohesive experience. Consider practical items that
            guests will actually use rather than discard. For eco-conscious events, sustainable options like plants or
            reusable items are excellent choices.
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
              opacity: selectedFavors.length > 0 ? 1 : 0.7,
            },
          ]}
          onPress={handleNext}
          disabled={selectedFavors.length === 0}
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
  favorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  favorCard: {
    width: "48%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
  },
  favorImage: {
    width: "100%",
    height: 100,
  },
  favorContent: {
    padding: 12,
  },
  favorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  favorDescription: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  selectedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectionSummary: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  selectionSummaryText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
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

