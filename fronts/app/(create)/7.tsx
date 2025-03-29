"use client"

import { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import { useAuth } from "~/context/auth";

// const activityIdeas = [
//   {
//     id: 1,
//     name: "Photo Booth with Props",
//     description: "Set up a themed photo area with fun props for memorable pictures.",
//     duration: "Throughout event",
//   },
//   {
//     id: 2,
//     name: "Interactive Trivia Game",
//     description: "Host a themed trivia contest with prizes for the winners.",
//     duration: "30-45 minutes",
//   },
//   {
//     id: 3,
//     name: "DIY Craft Station",
//     description: "Create a station where guests can make themed crafts to take home.",
//     duration: "Throughout event",
//   },
//   {
//     id: 4,
//     name: "Dance Competition",
//     description: "Organize a fun dance-off with different categories and prizes.",
//     duration: "20-30 minutes",
//   },
//   {
//     id: 5,
//     name: "Scavenger Hunt",
//     description: "Hide themed items around the venue for guests to find and win prizes.",
//     duration: "45-60 minutes",
//   },
//   {
//     id: 6,
//     name: "Karaoke Session",
//     description: "Set up a karaoke station with themed song selections.",
//     duration: "Throughout event",
//   },
//   {
//     id: 7,
//     name: "Group Games",
//     description: "Organize team-building games that encourage guest interaction.",
//     duration: "30-45 minutes",
//   },
// ]

export default function ActivitiesScreen() {
  const { colors } = useTheme();
  const { token, eventData, updateEventData } = useAuth();

  const [activityIdeas, setActivityIdeas] = useState<{ title: string; description: string; }[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<{ title: string; description: string; }[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    updateEventData({ selectedFunActivities:  selectedActivities});
    router.push("/(create)/8");
  }

  const handleBack = () => {
    router.back();
  }

  const toggleActivity = (activity: any) => {
    if (selectedActivities.some((a) => a.title === activity.title)) {
      setSelectedActivities(selectedActivities.filter((a) => a.title !== activity.title));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  }

  const getSuggestedThemes = async () => {
    try {
      console.log("Fetching themes!");
      setError('');
      setIsLoading(true);

      const response = await fetch('http://192.168.43.32:8002/ai/fun-activities', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: eventData?.selectedTheme, demographics: eventData?.demographics }),
      });

      const data = await response.json();
      
      if (response.status === 403) router.replace('/(auth)/login');
      if (!response.ok) throw new Error(data.detail || 'Something went wrong! Please try again.');

      // if (response.ok) setActivityIdeas(data.activities);
      setActivityIdeas((prev) => {
        const newIdeas = data.activities;
        return newIdeas;
      });
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
          <View style={[styles.progressFill, { width: `${(7 / 9) * 100}%`, backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.stepText, {color: colors.text}]}>Step 7 of 9</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.stepTitle, {color: colors.text}]}>Fun Activities</Text>

        <Text style={[styles.description, {color: colors.text}]}>
          Select activities to keep your guests entertained during the event. You can choose multiple options.
        </Text>

        {isLoading && <Text style={[styles.loading, {color: colors.text}]}>Fetching AI suggestions ✨...</Text>}

        <View style={styles.activitiesContainer}>
          {activityIdeas.map((activity, index) => {
            const isSelected = selectedActivities.includes(activity)
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.activityCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
                onPress={() => toggleActivity(activity)}
              >
                <View style={styles.activityContent}>
                  <Text style={[styles.activityName, {color: colors.text}]}>{activity.title}</Text>
                  <Text style={[styles.activityDescription, {color: colors.text}]}>{activity.description}</Text>
                  {/* <View style={styles.activityDurationContainer}>
                    <Text style={styles.activityDurationLabel}>Duration:</Text>
                    <Text style={styles.activityDuration}>{activity.duration}</Text>
                  </View> */}
                </View>
                {isSelected && (
                  <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
                    <Check size={16} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={styles.selectionSummary}>
          <Text style={[styles.selectionSummaryText, {color: colors.text, backgroundColor: colors.card}]}>
            {selectedActivities.length === 0
              ? "No activities selected yet"
              : `Selected ${selectedActivities.length} ${selectedActivities.length === 1 ? "activity" : "activities"}`}
          </Text>
        </View>

        {/* <View style={styles.aiSuggestion}>
          <Text style={styles.aiSuggestionTitle}>AI Suggestion</Text>
          <Text style={styles.aiSuggestionText}>
            Consider the flow of your event when planning activities. Start with ice-breakers, then move to more
            engaging activities, and end with something memorable. Also, have backup activities ready in case some don't
            resonate with your guests.
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
              opacity: selectedActivities.length > 0 ? 1 : 0.7,
            },
          ]}
          onPress={handleNext}
          disabled={selectedActivities.length === 0}
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
  activitiesContainer: {
    marginBottom: 24,
  },
  activityCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  activityDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 8,
  },
  activityDurationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityDurationLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    opacity: 0.7,
    marginRight: 4,
  },
  activityDuration: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
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

