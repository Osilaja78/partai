"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/theme-context";
import { Link, useRouter, useFocusEffect } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import FadeInView from "~/components/animations/fade-in-view";
import AnimatedButton from "~/components/animations/animated-button";
import { useCallback } from "react";
import { useAuth } from "~/context/auth";

export default function CreateScreen() {
  const { colors } = useTheme()
  const router = useRouter()

  const { deleteEventData, eventData } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const deletePartialData = async () => {
        await deleteEventData();
      }
  
      deletePartialData();
      console.log("Partial event data deleted!");
    }, [])
  );

  const handleNext = () => {
    router.push('/(create)/1');
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, {color: colors.text}]}>Create Event</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.text}]}>Let's Create Your Event</Text>
        <Text style={[styles.description, {color: colors.text}]}>
          Create a memorable event in just a few steps. We'll guide you through the process and provide AI-powered
          suggestions along the way.
        </Text>

        <View style={styles.stepsContainer}>
          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary, borderColor: colors.border }]}>
              <Text style={[styles.stepNumberText, {color: colors.text}]}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, {color: colors.text}]}>Basic Information</Text>
              <Text style={[styles.stepDescription, {color: colors.text}]}>Event title, type, and essential details</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.stepNumberText, {color: colors.text}]}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, {color: colors.text}]}>Date, Time & Location</Text>
              <Text style={[styles.stepDescription, {color: colors.text}]}>When and where your event will take place</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.stepNumberText, {color: colors.text}]}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, , {color: colors.text}]}>Theme & Style</Text>
              <Text style={[styles.stepDescription, , {color: colors.text}]}>Decorations, dress code, and atmosphere</Text>
            </View>
          </View>
        </View>

        <FadeInView duration={600} delay={500}>
          {/* <View style={styles.footer}> */}
            <AnimatedButton
              title="Start Creating"
              rightIcon={<ArrowRight size={18} color={colors.text} />}
              style={{ backgroundColor: colors.primary }}
              textStyle={{ color: colors.text }}
              onPress={handleNext}
            />
          {/* </View> */}
        </FadeInView>

        {/* <Link href={"/(create)/1"} asChild>
          <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.startButtonText}>Start Creating</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Link> */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 32,
  },
  stepsContainer: {
    marginBottom: 40,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 24,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  stepContent: {
    marginLeft: 16,
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 8,
  },
})

