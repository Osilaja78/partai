import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowLeft, ArrowRight, MapPin, Navigation } from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "~/context/auth";

export default function VenueLocationScreen() {
  const { colors } = useTheme();
  const [location, setLocation] = useState("");
  // const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const { eventData, updateEventData, deleteEventData } = useAuth();

  const handleNext = () => {
    updateEventData({location: location});
    router.push("/(create)/3");
  };

  const handleBack = async () => {
    router.back();
  };

  // const handleUseCurrentLocation = () => {
  //   setUseCurrentLocation(true)
  //   // In a real app, you would use geolocation here
  //   setLocation("Current Location")
  // }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(2 / 9) * 100}%`, backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.stepText, {color: colors.text}]}>Step 2 of 9</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.stepTitle, {color: colors.text}]}>Venue Location</Text>

        <Text style={[styles.description, {color: colors.text}]}>
          Enter a location to find venue suggestions, or use your current location to see venues nearby.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, {color: colors.text}]}>Location</Text>
          <View style={styles.locationInputContainer}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter city, neighborhood, or address"
              placeholderTextColor={colors.muted}
              value={location || eventData?.location}
              onChangeText={setLocation}
            />
            <TouchableOpacity
              style={[styles.locationButton, { backgroundColor: colors.primary }]}
              // onPress={handleUseCurrentLocation}
            >
              <MapPin size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.currentLocationButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          // onPress={handleUseCurrentLocation}
        >
          <Navigation size={20} color={colors.primary} style={styles.currentLocationIcon} />
          <Text style={[styles.currentLocationText, , {color: colors.text}]}>Use my current location</Text>
        </TouchableOpacity>

        <View style={[styles.mapPlaceholder, {backgroundColor: colors.border}]}>
          <Text style={[styles.mapPlaceholderText, {color: colors.text}]}>Map will appear here</Text>
        </View>

        {/* <View style={styles.aiSuggestion}>
          <Text style={styles.aiSuggestionTitle}>AI Suggestion</Text>
          <Text style={styles.aiSuggestionText}>
            Based on your event type and date, we recommend looking for venues with indoor and outdoor options. Popular
            areas for similar events include downtown districts and waterfront locations.
          </Text>
        </View> */}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]} onPress={handleBack}>
          <ArrowLeft size={18} color={colors.text} style={styles.buttonIconLeft} />
          <Text style={[styles.buttonText, {color: colors.text}]}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleNext}
          disabled={!location}
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#FFFFFF",
  },
  locationButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  currentLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
  },
  currentLocationIcon: {
    marginRight: 8,
  },
  currentLocationText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  mapPlaceholderText: {
    color: "#6B7280",
    fontSize: 16,
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
})

