import { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '~/context/auth';
import { useTheme } from '~/context/theme-context';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const { token, loading } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!loading) {
        if (token) {
          router.replace('/(tabs)/home')
        } else {
          router.replace('/(auth)/welcome');
        }
      }
    });
  }, [loading, token]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim, color: colors.text }]}>
        Partai
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: '#fff',
    letterSpacing: 2,
  },
});