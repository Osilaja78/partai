import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '~/context/theme-context';
import AnimatedButton from '~/components/animations/animated-button';
import SlideInView from '~/components/animations/slide-in-view';
import Blob from '~/components/animations/blob';

export default function WelcomeScreen() {
  const { colors, isDark } = useTheme();
  
  const router = useRouter();

  const navigateToSignin = () => {
    router.push("/(auth)/login");
  }

  const navigateToSignup = () => {
    router.push("/(auth)/signup");
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <Blob size={300} color="rgba(255, 77, 0, 0.7)" duration={10000} delay={0} />
      <Blob size={250} color="rgba(255, 200, 100, 0.5)" duration={15000} delay={2000} />
      <Blob size={200} color="rgba(255, 50, 200, 0.4)" duration={20000} delay={4000} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: colors.text}]}>Welcome to Partai</Text>
          <Text style={[styles.subtitle, {color: colors.text}]}>Your personal event planning companion</Text>
        </View>

        <SlideInView direction="up" distance={30} duration={600} delay={700}>
          <AnimatedButton
            title="Sign In"
            style={[styles.button, { backgroundColor: colors.primary }]}
            textStyle={[styles.buttonText, { color: isDark ? "#FFFFFF" : "#121212" }]}
            onPress={navigateToSignin}
          />
        </SlideInView>

        <SlideInView direction="up" distance={30} duration={600} delay={700}>
          <AnimatedButton
            title="Sign Up"
            style={[styles.secondaryButton, { backgroundColor: colors.background }]}
            textStyle={[styles.buttonText, { color: isDark ? "#FFFFFF" : "#121212" }]}
            onPress={navigateToSignup}
          />
        </SlideInView>

        {/* <View style={styles.buttonContainer}>
          <Link href={{ pathname: '/(auth)/login' }} asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </Link>

          <Link href={{ pathname: '/(auth)/signup'}} asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Create Account</Text>
            </TouchableOpacity>
          </Link>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 40,
    color: '#fff',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#999',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    // backgroundColor: '#6C63FF',
    height: 50,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 24,
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fff',
  },
  secondaryButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
});