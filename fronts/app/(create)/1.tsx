import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowRight, Calendar } from "lucide-react-native";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import AnimatedProgressBar from "~/components/animations/animated-progress-bar";
import FadeInView from "~/components/animations/fade-in-view";
import SlideInView from "~/components/animations/slide-in-view";
import AnimatedButton from "~/components/animations/animated-button";
import { useAuth } from "~/context/auth";

export default function BasicInfoScreen() {
  const { colors } = useTheme();
  const { eventData, updateEventData } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "Select date"
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  }

  const handleNext = () => {
    updateEventData({
      name: title,
      description: description,
      date: date
    });
    router.push("/(create)/2");
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <FadeInView duration={300}>
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={1 / 9} />
          <Text style={[styles.stepText, {color: colors.text}]}>Step 1 of 9</Text>
        </View>
      </FadeInView>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <SlideInView direction="down" distance={20} duration={600}>
          <Text style={[styles.stepTitle, {color: colors.text}]}>Event Details</Text>
        </SlideInView>

        <SlideInView direction="up" distance={30} duration={600} delay={100}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, {color: colors.text}]}>Event Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter event name"
              placeholderTextColor={colors.muted}
              value={title || eventData?.name || ''}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
        </SlideInView>

        <SlideInView direction="up" distance={30} duration={600} delay={200}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, {color: colors.text}]}>Event Description</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Describe your event..."
              placeholderTextColor={colors.muted}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={description || eventData?.description || ''}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
        </SlideInView>

        <SlideInView direction="up" distance={30} duration={600} delay={300}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, {color: colors.text}]}>Event Date</Text>
            <TouchableOpacity
              style={[styles.dateButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Calendar size={20} color={colors.muted} style={styles.dateIcon} />
              <Text style={[styles.dateButtonText, {color: colors.text}]}>{formatDate(date) || formatDate(eventData?.date ?? date)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date || typeof eventData?.date === "string" ? new Date(eventData?.date || date) : eventData?.date || new Date(date)}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>
        </SlideInView>

        {/* <SlideInView direction="up" distance={30} duration={600} delay={400}>
          <View style={styles.aiSuggestion}>
            <Text style={styles.aiSuggestionTitle}>AI Suggestion</Text>
            <Text style={styles.aiSuggestionText}>
              Be specific in your event description to help guests understand what to expect. Include details about the
              occasion, special requirements, and any themes you're interested in.
            </Text>
          </View>
        </SlideInView> */}
      </ScrollView>

      <FadeInView duration={600} delay={500}>
        <View style={styles.footer}>
          <AnimatedButton
            title="Next"
            rightIcon={<ArrowRight size={18} color={colors.text} />}
            style={{ backgroundColor: colors.primary }}
            textStyle={{ color: colors.text }}
            onPress={handleNext}
            disabled={!title || !date || !description}
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
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#FFFFFF",
  },
  textArea: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#FFFFFF",
    minHeight: 120,
  },
  dateButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  dateIcon: {
    marginRight: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  aiSuggestion: {
    padding: 16,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 8,
    marginTop: 24,
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
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
  },
})


