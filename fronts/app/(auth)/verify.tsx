import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/context/theme-context";
import { ArrowLeft } from "lucide-react-native"
import { router } from "expo-router"
import FadeInView from "~/components/animations/fade-in-view"
import SlideInView from "~/components/animations/slide-in-view"
import AnimatedButton from "~/components/animations/animated-button";
import { useAuth } from "~/context/auth";

export default function VerifyScreen() {
  const { colors } = useTheme();
  const { login, updateUser } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  const inputRefs = useRef<Array<React.RefObject<TextInput>>>([])
  const pulseAnim = useRef(new Animated.Value(1)).current
  

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    }
  }, [timeLeft])

  useEffect(() => {
    // Start pulsing animation for the first input
    startPulseAnimation()
  }, [])

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  const handleOtpChange = (text: any, index: any) => {
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)

    // Move to next input if current input is filled
    if (text && index < 5) {
      inputRefs.current[index + 1]?.current?.focus()
    }
  }

  const handleKeyPress = (e: any, index: any) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.current?.focus()
    }
  }

  const handleVerify = async () => {
    Keyboard.dismiss()
    setIsLoading(true)

    const code = Number(otp.join(''));

    try {
      setError('');
      const response = await fetch('http://192.168.43.32:8002/confirm-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: code }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || 'Registration failed');
  
      if (data.access_token) {
        await login(data.access_token);
        updateUser({email: data.user.email, id: data.user.id});
        router.push('/(tabs)/home');
      }
      setIsLoading(false);
      setError('');
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      setIsLoading(false);
    }
  }

  const handleResendOtp = () => {
    setTimeLeft(30)
    // Simulate resend OTP
  }

  const goBack = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <SlideInView direction="right" distance={20} duration={400}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </SlideInView>

        <SlideInView direction="down" distance={30} duration={600}>
          <Text style={styles.headerText}>Verification</Text>
          <Text style={styles.subtitleText}>We've sent a verification code to your email</Text>
        </SlideInView>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <Animated.View
              key={index}
              style={[styles.otpInputWrapper, index === 0 && !digit ? { transform: [{ scale: pulseAnim }] } : null]}
            >
              <TextInput
                ref={(ref) => {
                  if (!inputRefs.current[index]) {
                    inputRefs.current[index] = { current: ref } as React.RefObject<TextInput>;
                  }
                }}
                style={[
                  styles.otpInput,
                  {
                    backgroundColor: colors.card,
                    borderColor: digit ? colors.primary : colors.border,
                  },
                ]}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectionColor={colors.primary}
              />
            </Animated.View>
          ))}
        </View>

        <SlideInView direction="up" distance={30} duration={600} delay={400}>
          <AnimatedButton
            title={isLoading ? "Verifying..." : "Verify"}
            style={[
              styles.verifyButton,
              {
                backgroundColor: colors.primary,
                opacity: otp.every((digit) => digit) ? 1 : 0.7,
              },
            ]}
            textStyle={styles.verifyButtonText}
            onPress={handleVerify}
            disabled={isLoading || !otp.every((digit) => digit)}
          />
        </SlideInView>

        <FadeInView duration={800} delay={600}>
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            {timeLeft > 0 ? (
              <Text style={styles.timerText}>Resend in {timeLeft}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text style={[styles.resendLink, { color: colors.primary }]}>Resend</Text>
              </TouchableOpacity>
            )}
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
  keyboardAvoidingView: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.7,
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  otpInputWrapper: {
    width: "14%",
  },
  otpInput: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  verifyButton: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.7,
  },
  timerText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.5,
  },
  resendLink: {
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: '#FF6584',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
})

