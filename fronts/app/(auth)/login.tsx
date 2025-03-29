import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '~/context/auth';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '~/context/theme-context';
import SlideInView from '~/components/animations/slide-in-view';
import AnimatedButton from '~/components/animations/animated-button';
import FadeInView from '~/components/animations/fade-in-view';
import Blob from '~/components/animations/blob';
import { BlurView } from 'expo-blur';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, updateUser, user } = useAuth();
  const { colors, isDark } = useTheme();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError('');
      setIsLoading(true);
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch('http://192.168.43.32:8002/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.detail || 'Signin failed');

      if (data.access_token) {
        await login(data.access_token);
        await updateUser({email: data.user.email, id: data.user.id});
        router.replace('/(tabs)/home');
      }
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      setIsLoading(false);
    }
  };

  const navigateToSignup = () => {
    router.push("/(auth)/signup");
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* Background Blobs */}
      <Blob size={300} color="rgba(255, 77, 0, 0.7)" duration={10000} delay={0} />
      <Blob size={250} color="rgba(255, 200, 100, 0.5)" duration={15000} delay={2000} />
      <Blob size={200} color="rgba(255, 50, 200, 0.4)" duration={20000} delay={4000} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <SlideInView direction="down" distance={50} duration={800}>
            <View style={styles.logoContainer}>
              {/* <View style={[styles.logoCircle, { backgroundColor: isDark ? "#000" : "#f5f5f5" }]}>
                <View style={[styles.logoInner, { backgroundColor: colors.primary }]} />
              </View> */}
              <Text style={[styles.appName, { color: colors.text }]}>Partai</Text>
            </View>
          </SlideInView>

          <SlideInView direction="up" distance={30} duration={800} delay={200}>
            <Text style={[styles.welcomeText, { color: colors.text }]}>Welcome Back!</Text>
            <Text style={[styles.subtitleText, { color: colors.text, opacity: 0.7 }]}>
              Sign in to continue to your account
            </Text>
          </SlideInView>

          {error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.formContainer}>
            <SlideInView direction="up" distance={30} duration={600} delay={400}>
              <View style={styles.inputContainer}>
                <Mail size={20} color={colors.muted} style={styles.inputIcon} />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  placeholder="Email"
                  placeholderTextColor={colors.muted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </SlideInView>

            <SlideInView direction="up" distance={30} duration={600} delay={500}>
              <View style={styles.inputContainer}>
                <Lock size={20} color={colors.muted} style={styles.inputIcon} />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  placeholder="Password"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} color={colors.muted} /> : <Eye size={20} color={colors.muted} />}
                </TouchableOpacity>
              </View>
            </SlideInView>

            {/* <SlideInView direction="up" distance={30} duration={600} delay={600}>
              <TouchableOpacity style={styles.forgotPasswordContainer} onPress={navigateToForgotPassword}>
                <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>Forgot Password?</Text>
              </TouchableOpacity>
            </SlideInView> */}

            <SlideInView direction="up" distance={30} duration={600} delay={700}>
              <AnimatedButton
                title={isLoading ? "Signing in..." : "Sign In"}
                style={[styles.loginButton, { backgroundColor: colors.primary }]}
                textStyle={[styles.loginButtonText, { color: isDark ? "#FFFFFF" : "#121212" }]}
                onPress={handleLogin}
                disabled={isLoading || !email || !password}
              />
            </SlideInView>

            <FadeInView duration={800} delay={900}>
              <View style={styles.dividerContainer}>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.muted }]}>OR</Text>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              </View>
            </FadeInView>

            <FadeInView duration={800} delay={1000}>
              <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.googleButton}>
                <Image
                  source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>
                
              </View>
            </FadeInView>
          </View>

          <FadeInView duration={800} delay={1100}>
            <View style={styles.signupContainer}>
              <Text style={[styles.signupText, { color: colors.text, opacity: 0.7 }]}>Don't have an account? </Text>
              <TouchableOpacity onPress={navigateToSignup}>
                <Text style={[styles.signupLink, { color: colors.primary }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )

  // return (
  //   <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
  //     <Image
  //       source={{ uri: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30' }}
  //       style={StyleSheet.absoluteFillObject}
  //       blurRadius={20}
  //     />
  //     <View style={styles.overlay} />
      
  //     <View style={styles.content}>
  //       <View style={styles.header}>
  //         <Text style={styles.title}>Welcome back</Text>
  //         <Text style={styles.subtitle}>Sign in to continue planning amazing events</Text>
  //       </View>

  //       {error && <Text style={styles.error}>{error}</Text>}

  //       <View style={styles.form}>
  //         <View style={styles.inputContainer}>
  //           <Mail color="#666" size={20} />
  //           <TextInput
  //             style={styles.input}
  //             placeholder="Email"
  //             placeholderTextColor="#666"
  //             value={email}
  //             onChangeText={setEmail}
  //             autoCapitalize="none"
  //             keyboardType="email-address"
  //           />
  //         </View>

  //         <View style={styles.inputContainer}>
  //           <Lock color="#666" size={20} />
  //           <TextInput
  //             style={styles.input}
  //             placeholder="Password"
  //             placeholderTextColor="#666"
  //             value={password}
  //             onChangeText={setPassword}
  //             secureTextEntry
  //           />
  //         </View>

  //         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
  //           <Text style={styles.loginButtonText}>Sign In</Text>
  //           <ArrowRight color="#fff" size={20} />
  //         </TouchableOpacity>

  //         <TouchableOpacity style={styles.googleButton}>
  //           <Image
  //             source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
  //             style={styles.googleIcon}
  //           />
  //           <Text style={styles.googleButtonText}>Continue with Google</Text>
  //         </TouchableOpacity>

  //         <View style={styles.footer}>
  //           <Text style={styles.footerText}>Don't have an account?</Text>
  //           <Link href="/(auth)/signup" style={styles.signupLink}>
  //             <Text style={styles.signupText}>Sign up</Text>
  //           </Link>
  //         </View>
  //       </View>
  //     </View>
  //   </SafeAreaView>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 16,
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    transform: [{ rotate: "45deg" }],
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 20,
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    top: 14,
    zIndex: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 14,
    zIndex: 1,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 48,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  error: {
    color: '#FF6584',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
})


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24,
//   },
//   header: {
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 32,
//     fontFamily: 'Inter-Bold',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#999',
//     fontFamily: 'Inter-Regular',
//   },
//   form: {
//     gap: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 12,
//     padding: 16,
//     gap: 12,
//   },
//   input: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 16,
//     fontFamily: 'Inter-Regular',
//   },
//   loginButton: {
//     backgroundColor: '#6C63FF',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontFamily: 'Inter-Bold',
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     gap: 8,
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//   },
//   googleButtonText: {
//     color: '#000',
//     fontSize: 16,
//     fontFamily: 'Inter-Bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 24,
//     gap: 8,
//   },
//   footerText: {
//     color: '#999',
//     fontSize: 14,
//     fontFamily: 'Inter-Regular',
//   },
//   signupLink: {
//     padding: 4,
//   },
//   signupText: {
//     color: '#6C63FF',
//     fontSize: 14,
//     fontFamily: 'Inter-Bold',
//   },
//   error: {
//     color: '#FF6584',
//     fontSize: 14,
//     fontFamily: 'Inter-Regular',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
// });