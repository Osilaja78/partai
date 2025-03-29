"use client"

import { useRef, useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowLeft, Calendar, MapPin, Users, Sparkles, Gift, Activity } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedProgressBar from "~/components/animations/animated-progress-bar";
import FadeInView from "~/components/animations/fade-in-view";
import SlideInView from "~/components/animations/slide-in-view";
import AnimatedButton from "~/components/animations/animated-button";
import StaggeredList from "~/components/animations/staggered-list";
import { useAuth } from "~/context/auth";

// Mock data - in a real app, this would come from context or state
// const eventData = {
//   title: "Summer Beach Party",
//   description: "Join us for a fun day at the beach with games, food, and music!",
//   date: new Date(2025, 6, 15), // July 15, 2025
//   venue: "Oceanview Pavilion",
//   address: "202 Coastal Highway, Beachfront",
//   theme: "Tropical Paradise",
//   costume: "Beach Resort Wear",
//   demographic: "Mixed - Family Friendly",
//   activities: ["Photo Booth with Props", "Beach Volleyball Tournament", "Sandcastle Building Contest"],
//   favors: ["Custom Drinkware", "Personalized Beach Towels"],
//   bannerImage: "/placeholder.svg?height=200&width=400",
// }

export default function ReviewScreen() {
  const { colors } = useTheme();
  const {user, token, eventData} = useAuth();

  const [bannerImage, setBannerImage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const confettiAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Animate the banner scaling up
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [])

  const handleBack = () => {
    router.back();
  }

  const handleCreate = () => {
    // Animate confetti before navigating
    Animated.timing(confettiAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Save final event data and create the event
      setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 500);
    })
  }

  const formatDate = (date: any) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const getBannerImage = async () => {
    try {
      console.log("Fetching banner image");
      setError('');
      setIsLoading(true);

      const response = await fetch('http://192.168.43.32:8002/ai/generate-banner', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: eventData?.selectedTheme }),
      });

      const data = await response.json();
      
      if (response.status === 403) router.replace('/(auth)/login');
      if (!response.ok) throw new Error(data.detail || 'Something went wrong! Please try again.');

      // if (response.ok) setBannerImage(data.url);
      setBannerImage((prev) => {
        const image = data.url;
        return image;
      })
      console.log(bannerImage);
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      setIsLoading(false);
    }
  }
  
  useFocusEffect(
    useCallback(() => {
      getBannerImage();
    }, [])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <FadeInView duration={300}>
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={1} />
          <Text style={[styles.stepText, {color: colors.text}]}>Step 9 of 9</Text>
        </View>
      </FadeInView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <SlideInView direction="down" distance={20} duration={600}>
          <Text style={[styles.stepTitle, {color: colors.text}]}>Review & Create</Text>
        </SlideInView>

        <SlideInView direction="up" distance={20} duration={600} delay={100}>
          <Text style={[styles.description, {color: colors.text}]}>Review your event details before creating. Everything looks great!</Text>
        </SlideInView>

        <Animated.View style={[styles.bannerContainer, { transform: [{ scale: scaleAnim }] }]}>
          {bannerImage && <Image source={{ uri: bannerImage }} style={styles.bannerImage} />}
          <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.bannerGradient}>
            <Text style={styles.bannerTitle}>{eventData?.name}</Text>
            <Text style={styles.bannerDate}>{formatDate(eventData?.date)}</Text>
          </LinearGradient>
        </Animated.View>

        <StaggeredList itemDelay={150} initialDelay={300} duration={500} distance={30} direction="up">
          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <View style={styles.sectionHeader}>
              <Calendar size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>Event Details</Text>
            </View>
            <Text style={[styles.eventDescription, {color: colors.text}]}>{eventData?.description}</Text>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, {color: colors.text}]}>Date:</Text>
              <Text style={[styles.detailValue, {color: colors.text}]}>{formatDate(eventData?.date)}</Text>
            </View>
          </View>

          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <View style={styles.sectionHeader}>
              <MapPin size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>Venue</Text>
            </View>
            <Text style={[styles.venueName, {color: colors.text}]}>{eventData?.selectedVenue.split('|')[0]}</Text>
            <Text style={[styles.venueAddress, {color: colors.text}]}>{eventData?.selectedVenue.split('|')[1]}</Text>
          </View>

          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <View style={styles.sectionHeader}>
              <Sparkles size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>Theme & Attire</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, {color: colors.text}]}>Theme:</Text>
              <Text style={[styles.detailValue, {color: colors.text}]}>{eventData?.selectedTheme.split('|')[0]}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, {color: colors.text}]}>Dress Code:</Text>
              <Text style={[styles.detailValue, {color: colors.text}]}>{eventData?.selectedCostume.split('|')[0] + '. ' + eventData?.selectedCostume.split('|')[1]}</Text>
            </View>
          </View>

          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <View style={styles.sectionHeader}>
              <Users size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>Attendees</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, {color: colors.text}]}>Demographics:</Text>
              <Text style={[styles.detailValue, {color: colors.text}]}>{eventData?.demographics}</Text>
            </View>
          </View>

          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <View style={styles.sectionHeader}>
              <Activity size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>Activities</Text>
            </View>
            <View style={styles.listContainer}>
              {eventData?.selectedFunActivities.map((activity, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={[styles.listBullet, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.listText, {color: colors.text}]}>{activity.title} | {activity.description}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <View style={styles.sectionHeader}>
              <Gift size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, {color: colors.text}]}>Party Favors</Text>
            </View>
            <View style={styles.listContainer}>
              {eventData?.selectedPartyFavours.map((favor, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={[styles.listBullet, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.listText, {color: colors.text}]}>{favor.title} | {favor.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </StaggeredList>
      </ScrollView>

      <FadeInView duration={600} delay={1200}>
        <View style={styles.footer}>
          <AnimatedButton
            title="Back"
            leftIcon={<ArrowLeft size={18} color={colors.text} />}
            style={{ backgroundColor: colors.card }}
            textStyle={{ color: colors.text }}
            onPress={handleBack}
          />

          <AnimatedButton
            title="Create Event"
            style={{ backgroundColor: colors.primary }}
            textStyle={{ color: colors.text }}
            onPress={handleCreate}
          />
        </View>
      </FadeInView>

      {/* Confetti animation overlay */}
      <Animated.View
        style={[
          styles.confettiContainer,
          {
            opacity: confettiAnim,
            transform: [
              {
                translateY: confettiAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-300, 600],
                }),
              },
            ],
          },
        ]}
        pointerEvents="none"
      >
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <View
              key={i}
              style={[
                styles.confetti,
                {
                  left: `${Math.random() * 100}%`,
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  backgroundColor: [colors.primary, "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"][
                    Math.floor(Math.random() * 5)
                  ],
                  transform: [{ rotate: `${Math.random() * 360}deg` }],
                },
              ]}
            />
          ))}
      </Animated.View>
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
  bannerContainer: {
    height: 380,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bannerGradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  bannerDate: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  eventDescription: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.7,
    flexShrink: 0,
  },
  detailValue: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
    maxWidth: '95%',
    flex: 1,
    flexWrap: 'wrap',
  },
  venueName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  venueAddress: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  listBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  listText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
  },
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  confetti: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 2,
  },
})

