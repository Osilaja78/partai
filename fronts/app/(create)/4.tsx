"use client"

import { useState, useRef, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import { useAuth } from "~/context/auth";
import AnimatedProgressBar from "~/components/animations/animated-progress-bar";
import FadeInView from "~/components/animations/fade-in-view";
import SlideInView from "~/components/animations/slide-in-view";
import AnimatedButton from "~/components/animations/animated-button";
import AnimatedCard from "~/components/animations/animated-card";
import StaggeredList from "~/components/animations/staggered-list";
import CheckAnimation from "~/components/animations/check-animation";

// const themeIdeas = [
//   {
//     id: 1,
//     name: "Tropical Paradise",
//     description: "Vibrant colors, palm trees, and island vibes for a relaxed, exotic atmosphere.",
//   },
//   {
//     id: 2,
//     name: "Vintage Hollywood Glamour",
//     description: "Classic elegance with gold accents, red carpet, and old-school movie star charm.",
//   },
//   {
//     id: 3,
//     name: "Neon Nights",
//     description: "Bold colors, glowing lights, and urban aesthetics for a modern, energetic feel.",
//   },
//   {
//     id: 4,
//     name: "Rustic Garden Party",
//     description: "Natural elements, wooden accents, and floral arrangements for a charming outdoor feel.",
//   },
//   {
//     id: 5,
//     name: "Cosmic Adventure",
//     description: "Space-themed with stars, planets, and galactic colors for an out-of-this-world experience.",
//   },
// ]

// const decorationIdeas = [
//   { id: 1, image: "/placeholder.svg?height=120&width=120", description: "Hanging lanterns" },
//   { id: 2, image: "/placeholder.svg?height=120&width=120", description: "Table centerpieces" },
//   { id: 3, image: "/placeholder.svg?height=120&width=120", description: "Entrance arch" },
//   { id: 4, image: "/placeholder.svg?height=120&width=120", description: "Themed backdrop" },
//   { id: 5, image: "/placeholder.svg?height=120&width=120", description: "Lighting setup" },
//   { id: 6, image: "/placeholder.svg?height=120&width=120", description: "Floor decorations" },
// ]

export default function ThemeIdeasScreen() {
  const { colors } = useTheme();
  const { token, eventData, updateEventData } = useAuth();

  const [themeIdeas, setThemeIdeas] = useState<{ title: string; description: string; }[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<{ title: string; description: string; } | null>(null);
  const [decorationIdeas, setDecorationIdeas] = useState([]);
  const [showDecorations, setShowDecorations] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const decorationsHeight = useRef(new Animated.Value(0)).current;
  const decorationsOpacity = useRef(new Animated.Value(0)).current;

  const handleNext = async () => {
    // Save data to global state or context here
    await updateEventData({selectedTheme: selectedTheme?.title + '|' + selectedTheme?.description})
    router.push("/(create)/5")
  }

  const handleBack = () => {
    router.back()
  }

  const getImageDecorations = async (theme: {title: string, description: string}) => {
    try {
      console.log("Fetching decoration ideas!");
      setError('');
      setIsImageLoading(true);

      const payload = {key: theme.title}
      console.log('Payload', payload);

      const response = await fetch('http://192.168.43.32:8002/ai/decoration-ideas', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.status === 403) router.replace('/(auth)/login');

      if (!response.ok) throw new Error(data.detail || 'Something went wrong! Please try again.');

      setDecorationIdeas((prev) => {
        const newImages = data.images;
        return newImages;
      });
      setIsImageLoading(false);
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      setIsImageLoading(false);
    }
  }

  const handleThemeSelect = async (theme: {title: string, description: string}) => {
    setSelectedTheme((prev) => {
      const newTheme = theme;
      return newTheme;
    });
    await getImageDecorations(theme);

    // Animate decorations section
    if (!showDecorations) {
      setShowDecorations(true)
      Animated.parallel([
        Animated.timing(decorationsHeight, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(decorationsOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }

  const getSuggestedThemes = async () => {
    try {
      console.log("Fetching themes!");
      setError('');
      setIsLoading(true);
      console.log(eventData?.description);

      const response = await fetch('http://192.168.43.32:8002/ai/suggest-themes', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
        body: JSON.stringify({ description: eventData?.description }),
      });

      const data = await response.json();
      
      if (response.status === 403) router.replace('/(auth)/login');
      if (!response.ok) throw new Error(data.detail || 'Something went wrong! Please try again.');

      setThemeIdeas((prev) => {
        const newTheme = data.themes;
        return newTheme;
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
      <FadeInView duration={300}>
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={4 / 9} />
          <Text style={[styles.stepText, {color: colors.text}]}>Step 4 of 9</Text>
        </View>
      </FadeInView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <SlideInView direction="down" distance={20} duration={600}>
          <Text style={[styles.stepTitle, {color: colors.text}]}>Theme Ideas</Text>
        </SlideInView>

        <SlideInView direction="up" distance={20} duration={600} delay={100}>
          <Text style={[styles.description, {color: colors.text}]}>
            Select a theme for your event to help guide decorations and overall atmosphere.
          </Text>
        </SlideInView>

        {isLoading && <Text style={[styles.loading, {color: colors.text}]}>Fetching AI suggestions ✨...</Text>}

        {!isLoading && <StaggeredList
          itemDelay={100}
          initialDelay={200}
          duration={500}
          distance={40}
          direction="up"
          style={styles.themesContainer}
          >
          {themeIdeas.map((theme, index) => (
            <AnimatedCard
            key={index}
              onPress={() => handleThemeSelect(theme)}
              isSelected={selectedTheme === theme}
              style={[
                styles.themeCard,
                {
                  backgroundColor: colors.card,
                  borderColor: selectedTheme?.title === theme.title ? colors.primary : colors.border,
                  borderWidth: selectedTheme?.title === theme.title ? 2 : 1,
                },
              ]}
              >
              <View style={styles.themeContent}>
                <Text style={[styles.themeName, {color: colors.text}]}>{theme.title}</Text>
                <Text style={[styles.themeDescription, {color: colors.text}]}>{theme.description}</Text>
              </View>
              <CheckAnimation isVisible={selectedTheme?.title === theme.title} backgroundColor={colors.primary} />
            </AnimatedCard>
          ))}
        </StaggeredList>}

        {isImageLoading && <Text style={[styles.loading, {color: colors.text}]}>Fetching AI decoration suggestions ✨...</Text>}
        
        {showDecorations && decorationIdeas.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>Decoration Ideas</Text>
            <Text style={[styles.sectionDescription, {color: colors.text}]}>Here are some decoration ideas based on your selected theme.</Text>
          </View>
        )}

        {
          showDecorations && decorationIdeas.length > 0 && (
            decorationIdeas.map((url, index) => (
              <Image key={index} source={{ uri: url }} style={[styles.decorationImage, {backgroundColor: colors.card}]} />
            ))
          )
        }

        {/* {showDecorations && decorationIdeas.length > 0 && (
          <Animated.View
            style={{
              opacity: decorationsOpacity,
              maxHeight: decorationsHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000],
              }),
              overflow: "hidden",
            }}
          >
            

            <StaggeredList
              itemDelay={80}
              initialDelay={0}
              duration={400}
              distance={30}
              direction="up"
              style={styles.decorationsGrid}
            >
              {decorationIdeas.map((decoration, index) => (
                <View key={index} style={[styles.decorationItem, { backgroundColor: colors.card }]}>
                  <Image source={{ uri: 'https://i.pinimg.com/originals/bd/56/eb/bd56eb94206e373e839a2422e10879a9.jpg' }} style={styles.decorationImage} />
                </View>
              ))}
            </StaggeredList>
          </Animated.View>
        )} */}
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
              opacity: selectedTheme ? 1 : 0.7,
            }}
            textStyle={{ color: colors.text }}
            onPress={handleNext}
            disabled={!selectedTheme}
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
  loading: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
  },
  themesContainer: {
    marginBottom: 24,
  },
  themeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  themeContent: {
    flex: 1,
  },
  themeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  themeDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 16,
  },
  decorationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  decorationItem: {
    width: "60%",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },
  decorationImage: {
    width: "100%",
    height: 300,
    marginBottom: 12,
    borderRadius: 8,
  },
  decorationDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    padding: 8,
    textAlign: "center",
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
})

