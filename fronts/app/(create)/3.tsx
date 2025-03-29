"use client"

import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { useAuth } from "~/context/auth";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import AnimatedProgressBar from "~/components/animations/animated-progress-bar";
import FadeInView from "~/components/animations/fade-in-view";
import SlideInView from "~/components/animations/slide-in-view";
import AnimatedButton from "~/components/animations/animated-button";
import AnimatedCard from "~/components/animations/animated-card";
import StaggeredList from "~/components/animations/staggered-list";
import CheckAnimation from "~/components/animations/check-animation";


export default function VenueSuggestionsScreen() {
  const { colors } = useTheme();
  const { updateEventData } = useAuth();
  const { token, eventData, deleteEventData } = useAuth();

  const [suggestedVenues, setSuggestedVenues] = useState<{ id: number; name: string; address: string; image: string; rating: number }[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<{ id: number; name: string; address: string; image: string; rating: number } | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // const suggestedVenues = [
  //   {
  //     id: 1,
  //     name: "The Grand Ballroom",
  //     address: "123 Main Street, Downtown",
  //     image: "https://partyslate.imgix.net/photos/2711241/photo-253c4b4a-4755-4c57-b9f6-8492351fb58c.jpg?ixlib=js-2.3.2&auto=compress%2Cformat&bg=fff&cs=srgb",
  //     rating: 4.8,
  //   },
  //   {
  //     id: 2,
  //     name: "Riverside Gardens",
  //     address: "456 River Road, Waterfront District",
  //     image: "https://assets.site-static.com/userFiles/4308/image/Subdivisions/Garden-City/The-waterfront-district-garden-city-header.jpg",
  //     rating: 4.6,
  //   },
  //   {
  //     id: 3,
  //     name: "Skyline Terrace",
  //     address: "789 High Street, Uptown",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvNNh6KkVtrIGrv2j7mo28toKxTv5jlklGKw&s",
  //     rating: 4.9,
  //   },
  //   {
  //     id: 4,
  //     name: "The Vintage Loft",
  //     address: "101 Industrial Way, Arts District",
  //     image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/at%2Farchive%2Fa62a1baac11f9b0cc3fca165315fdd09c0ed0b7d",
  //     rating: 4.5,
  //   },
  //   {
  //     id: 5,
  //     name: "Oceanview Pavilion",
  //     address: "202 Coastal Highway, Beachfront",
  //     image: "https://static.wixstatic.com/media/cb3151_0fad9eb5767644019513cbe4589bb089~mv2.jpg/v1/fill/w_638,h_288,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Neighborhood_Maroubra-15_thoyrm_edited.jpg",
  //     rating: 4.7,
  //   },
  // ]

  const handleNext = () => {
    // Save data to global state or context here
    updateEventData({ selectedVenue: selectedVenue?.name + '|' + selectedVenue?.address + '|' + String(selectedVenue?.rating)});
    router.push("/(create)/4");
  }

  const handleBack = () => {
    router.back()
  }

  // const handleSkip = () => {
  //   router.push("/(create)/5")
  // }

  const getSuggestedLocations = async () => {
    try {
      console.log("Fetching locations!");
      setError('');
      setIsLoading(true);

      const response = await fetch('http://192.168.43.32:8002/ai/suggest-venues', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
        body: JSON.stringify({ user_location: eventData?.location}),
      });
      console.log(response);

      const data = await response.json();
      console.log(data.image);
      
      if (response.status === 403) router.replace('/(auth)/login');
      if (!response.ok) throw new Error(data.detail || 'Something went wrong! Please try again.');

      if (response.ok) setSuggestedVenues(data.venues);
      setSuggestedVenues((prev) => {
        const newVenues = data.venues;
        return newVenues;
      });
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (eventData?.description !== '') {
        getSuggestedLocations();
      }
    }, [])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <FadeInView duration={300}>
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={3 / 9} />
          <Text style={[styles.stepText, {color: colors.text}]}>Step 3 of 9</Text>
        </View>
      </FadeInView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <SlideInView direction="down" distance={20} duration={600}>
          <Text style={[styles.stepTitle, {color: colors.text}]}>Suggested Venues</Text>
        </SlideInView>

        <SlideInView direction="up" distance={20} duration={600} delay={100}>
          <Text style={[styles.description, {color: colors.text}]}>
            Based on your location, here are some venue suggestions for your event. Select one or skip to enter your own
            venue later.
          </Text>
        </SlideInView>

        {error && <Text style={styles.error}>{error}</Text>}

        <StaggeredList
          itemDelay={100}
          initialDelay={200}
          duration={500}
          distance={40}
          direction="up"
          style={styles.venuesContainer}
        >
          {suggestedVenues && suggestedVenues.map((venue) => (
            <AnimatedCard
              key={venue.id}
              onPress={() => setSelectedVenue(venue)}
              isSelected={selectedVenue?.id === venue.id}
              style={[
                styles.venueCard,
                {
                  backgroundColor: colors.card,
                  borderColor: selectedVenue?.id === venue.id ? colors.primary : colors.border,
                  borderWidth: selectedVenue?.id === venue.id ? 2 : 1,
                },
              ]}
            >
              <Image source={{ uri: venue.image }} style={styles.venueImage} />
              <View style={styles.venueContent}>
                <Text style={[styles.venueName, {color: colors.text}]}>{venue.name}</Text>
                <View style={styles.venueAddressContainer}>
                  <MapPin size={14} color={colors.muted} style={styles.venueAddressIcon} />
                  <Text style={[styles.venueAddress, {color: colors.text}]}>{venue.address}</Text>
                </View>
                <View style={styles.venueRatingContainer}>
                  <Text style={[styles.venueRating, {color: colors.text}]}>★ {venue.rating}</Text>
                </View>
              </View>
              <CheckAnimation isVisible={selectedVenue?.id === venue.id} backgroundColor={colors.primary} />
            </AnimatedCard>
          ))}
        </StaggeredList>

        {/* <FadeInView duration={600} delay={800}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={[styles.skipButtonText, { color: colors.primary }]}>Skip and enter my own venue later</Text>
          </TouchableOpacity>
        </FadeInView> */}
      </ScrollView>

      <FadeInView duration={600} delay={900}>
        <View style={styles.footer}>
          <AnimatedButton
            title="Back"
            leftIcon={<ArrowLeft size={18} color={colors.text} />}
            style={{ backgroundColor: colors.card }}
            textStyle={{ color: colors.text }}
            onPress={handleBack}
          />

          <AnimatedButton
            title="Next"
            rightIcon={<ArrowRight size={18} color={colors.text} />}
            style={{
              backgroundColor: colors.primary,
              opacity: selectedVenue ? 1 : 0.7,
            }}
            textStyle={{ color: colors.text }}
            onPress={handleNext}
            disabled={!selectedVenue}
          />
        </View>
      </FadeInView>
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
  venuesContainer: {
    marginBottom: 24,
  },
  venueCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
  },
  venueImage: {
    width: "100%",
    height: 200,
  },
  venueContent: {
    padding: 10,
  },
  venueName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  venueAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  venueAddressIcon: {
    marginRight: 4,
  },
  venueAddress: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  venueRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  venueRating: {
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "bold",
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
  },
  error: {
    color: '#FF6584',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
})

