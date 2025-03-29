// import '../global.css';

// import { Stack } from 'expo-router';
// import { AuthProvider } from '~/context/auth';
// import { ThemeProvider } from '~/context/theme-context';
// import { StatusBar } from 'react-native';
// import { useTheme } from '~/context/theme-context';

// export default function Layout() {
//   const {isDark} = useTheme();
//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <StatusBar barStyle={isDark ? "light-content" : 'dark-content'} />
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(tabs)" />
//           <Stack.Screen name="(auth)" />
//         </Stack>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

"use client"

import { Slot } from "expo-router"
import { StatusBar } from "react-native"
import { ThemeProvider } from "../context/theme-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import { SplashScreen } from "expo-router"
import { useEffect, useContext } from "react"
import { Platform, useColorScheme } from "react-native"
import * as Navigation from "expo-navigation-bar";
import { ThemeContext } from "../context/theme-context";
import { AuthProvider } from "~/context/auth"


export default function RootLayout() {

  const { isDark, colors } = useContext(ThemeContext);
  const systemTheme = useColorScheme();


  useEffect(() => {
    if (Platform.OS === "android") {
      Navigation.setBackgroundColorAsync(isDark ?? systemTheme === 'dark' 
        ? 'light-content' 
        : 'dark-content')
    }
  }, [isDark, colors.background])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <ThemeProvider>
            <ThemeAwareStatusBar />
            <Slot />
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

function ThemeAwareStatusBar() {
  const { isDark } = useContext(ThemeContext);
  const systemTheme = useColorScheme();
  
  // Fallback to system theme if context theme isn't available
  const barStyle = isDark ?? systemTheme === 'dark' 
    ? 'light-content' 
    : 'dark-content';

  return (
    <StatusBar
      barStyle={barStyle}
      backgroundColor="transparent"
      translucent
    />
  );
}
