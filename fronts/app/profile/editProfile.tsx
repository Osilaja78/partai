import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowLeft, Camera } from "lucide-react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import FadeInView from "~/components/animations/fade-in-view";
import SlideInView from "~/components/animations/slide-in-view";
import AnimatedButton from "~/components/animations/animated-button";
import { useAuth } from "~/context/auth";

// Mock user data - in a real app, this would come from your state management or API

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");
  
  const { user, token, updateUser } = useAuth();

  const router = useRouter();
  
  const initialUserData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNumber: user?.phoneNumber,
    bio: user?.bio,
    profilePicture: user?.profilePicture,
  }
  const [userData, setUserData] = useState(initialUserData);

  // Check for changes to enable/disable save button
  useEffect(() => {
    const hasUserDataChanged =
      userData.firstName !== user?.firstName ||
      userData.lastName !== user?.lastName ||
      userData.phoneNumber !== user?.phoneNumber ||
      userData.bio !== user?.bio ||
      imageBase64 !== ""

    setHasChanges(hasUserDataChanged);
  }, [userData, imageBase64])

  // Request permissions for camera and media library
  useEffect(() => {
    ;(async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync()
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
        Alert.alert(
          "Permissions Required",
          "Please grant camera and photo library permissions to change your profile picture.",
          [{ text: "OK" }],
        )
      }
    })()
  }, [])

  const handleInputChange = (field: any, value: any) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true);

    try {
      setError('');

      const payload = {
        first_name: userData.firstName || '',
        last_name: userData.lastName || '',
        profile_picture_url: userData.profilePicture || '',
        phone_number: userData.phoneNumber || '',
        bio: userData.bio || '',
      };
      console.log(payload.profile_picture_url)

      const response = await fetch('http://192.168.43.32:8002/user-profile', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.status === 403) router.replace('/(auth)/login');
      if (!response.ok) throw new Error(data.detail || 'Something went wrong! Please try again.');

      if (response.ok) {
        updateUser({
          firstName: payload.first_name,
          lastName: payload.last_name,
          phoneNumber: payload.phone_number,
          bio: payload.bio,
          profilePicture: payload.profile_picture_url
        });
        setIsSaving(false);
        router.replace('/(tabs)/profile');
      }
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      setIsSaving(false);
    }
  }

  const handleTakePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      })

      if (!result.canceled && result.assets && result.assets[0]) {
        setUserData((prev) => ({
          ...prev,
          profilePicture: result.assets[0].uri,
        }))

        // Store base64 string to send to backend
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64)
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take picture. Please try again.")
    }
  }

  const handleChooseFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      })

      if (!result.canceled && result.assets && result.assets[0]) {
        setUserData((prev) => ({
          ...prev,
          profilePicture: result.assets[0].uri,
        }))

        // Store base64 string to send to backend
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64)
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select image. Please try again.")
    }
  }

  const handleRemovePhoto = () => {
    setUserData((prev) => ({
      ...prev,
      profilePicture: "/placeholder.svg?height=200&width=200",
    }))
    setImageBase64("")
  }

  const showImageOptions = () => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      {
        text: "Take Photo",
        onPress: handleTakePicture,
      },
      {
        text: "Choose from Library",
        onPress: handleChooseFromLibrary,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ])
  }

  const goBack = () => {
    if (hasChanges) {
      Alert.alert("Discard Changes", "You have unsaved changes. Are you sure you want to go back?", [
        {
          text: "Discard",
          onPress: () => router.back(),
          style: "destructive",
        },
        {
          text: "Keep Editing",
          style: "cancel",
        },
      ])
    } else {
      router.back()
    }
  }

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <View style={[styles.header, { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Profile</Text>
          <View style={styles.headerRight} />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <SlideInView direction="down" distance={30} duration={600}>
            <View style={styles.profileHeader}>
              {
                userData.profilePicture ?
                <Image source={{ uri: userData.profilePicture }} style={styles.avatar} />
                :
                <View style={styles.avatarPlaceholder}>
                  <Text style={[styles.avatarText, { color: colors.text }]}>{user?.email ? user.email[0].toUpperCase() : 'P'}</Text>
                </View>
              }
                <TouchableOpacity
                  style={[styles.editImageButton, { backgroundColor: colors.primary }]}
                  onPress={showImageOptions}
                >
                  <Camera size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
          </SlideInView>

          <View style={styles.formContainer}>
            <SlideInView direction="up" distance={30} duration={600} delay={200}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>First Name</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Enter first name"
                  placeholderTextColor={colors.muted}
                  value={userData?.firstName ?? ''}
                  onChangeText={(text) => handleInputChange("firstName", text)}
                />
              </View>
            </SlideInView>

            <SlideInView direction="up" distance={30} duration={600} delay={300}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Last Name</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Enter last name"
                  placeholderTextColor={colors.muted}
                  value={userData?.lastName ?? ''}
                  onChangeText={(text) => handleInputChange("lastName", text)}
                />
              </View>
            </SlideInView>

            <SlideInView direction="up" distance={30} duration={600} delay={400}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Phone Number</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Enter phone number"
                  placeholderTextColor={colors.muted}
                  keyboardType="phone-pad"
                  value={userData?.phoneNumber ?? ''}
                  onChangeText={(text) => handleInputChange("phoneNumber", text)}
                />
              </View>
            </SlideInView>

            <SlideInView direction="up" distance={30} duration={600} delay={500}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Bio</Text>
                <TextInput
                  style={[styles.input, styles.bioInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                  placeholder="Tell us about yourself"
                  placeholderTextColor={colors.muted}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={userData?.bio ?? ''}
                  onChangeText={(text) => handleInputChange("bio", text)}
                />
              </View>
            </SlideInView>
          </View>
        </ScrollView>

        <FadeInView duration={600} delay={600}>
          <View style={styles.footer}>
            <AnimatedButton
              title={isSaving ? "Saving..." : "Save Changes"}
              style={[
                styles.saveButton,
                {
                  backgroundColor: colors.primary,
                  opacity: hasChanges && !isSaving ? 1 : 0.7,
                },
              ]}
              textStyle={styles.saveButtonText}
              onPress={handleSave}
              disabled={!hasChanges || isSaving}
            />
          </View>
        </FadeInView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  profileHeader: {
    position: "relative",
    marginBottom: 32,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: "30%",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FF4D8F",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#121212",
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#FFFFFF",
  },
  bioInput: {
    height: 120,
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: "top",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
  },
  saveButton: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  error: {
    color: '#FF6584',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
})
