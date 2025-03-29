import { View, StyleSheet } from "react-native"
import { Tabs } from 'expo-router';
import { useTheme } from "~/context/theme-context";
import { User, Bookmark, Home as HomeIcon, BadgePlusIcon } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Chrome as Home, Calendar, CirclePlus as PlusCircle, Bookmark, User } from 'lucide-react-native';

const CustomTabBarIcon = ({ color, size, children }: { color: string; size: number, children: any }) => {
  return <View style={styles.iconContainer}>{children}</View>
}

const LogoIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoIcon}>
        <View style={styles.logoGradient} />
      </View>
    </View>
  )
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <CustomTabBarIcon color={color} size={size}>
              <HomeIcon size={24} color={color} />
            </CustomTabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create Event",
          tabBarIcon: ({ color, size }) => (
            <CustomTabBarIcon color={color} size={size}>
              <BadgePlusIcon size={40} color={color} />
            </CustomTabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <CustomTabBarIcon color={color} size={size}>
              <User size={24} color={color} />
            </CustomTabBarIcon>
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3B82F6",
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    transform: [{ rotate: "45deg" }],
  },
  ticketsIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticket: {
    width: 16,
    height: 20,
    borderWidth: 2,
    borderRadius: 2,
  },
})


// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#000',
//           borderTopWidth: 0,
//           paddingBottom: 8,
//           paddingTop: 8,
//           height: 60,
//         },
//         tabBarActiveTintColor: '#6C63FF',
//         tabBarInactiveTintColor: '#666',
//       }}>
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="events"
//         options={{
//           title: 'Events',
//           tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="create"
//         options={{
//           title: 'Create Event',
//           tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="saved"
//         options={{
//           title: 'Saved',
//           tabBarIcon: ({ color, size }) => <Bookmark size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
