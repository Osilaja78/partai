import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Settings, Edit, LogOut, Calendar, Star, Bell, CreditCard, HelpCircle, Sun, Moon } from "lucide-react-native";
import { useTheme } from "~/context/theme-context";
import { useAuth } from "~/context/auth";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { token, user, logout } = useAuth();

  const router = useRouter();

  const firstLetter = user?.email ? user.email[0].toUpperCase() : 'P';

  // const [user, setUser] = useState({
  //   name: "Alex Johnson",
  //   email: "alex.johnson@example.com",
  //   bio: "I'm a software engineer and event organizer.",
  //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8LfUor-SDt3fb8P9EdZQ1ed0P_NBn_g1i2A&s",
  //   eventsHosted: 12,
  //   eventsAttended: 28,
  // })

  const menuItems = [
    { icon: <Calendar size={20} color={colors.text} />, title: "My Events", screen: "MyEvents" },
    // { icon: <Star size={20} color={colors.text} />, title: "Favorites", screen: "Favorites" },
    { icon: <Bell size={20} color={colors.text} />, title: "Notifications", screen: "Notifications" },
    // { icon: <CreditCard size={20} color={colors.text} />, title: "Payment Methods", screen: "PaymentMethods" },
    // { icon: <Settings size={20} color={colors.text} />, title: "Settings", screen: "Settings" },
    // { icon: <HelpCircle size={20} color={colors.text} />, title: "Help & Support", screen: "Help" },
  ]

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const handleEditProfile = () => {
    router.push("/profile/editProfile");
  };

  return (
    // <SafeAreaView style={styles.container} edges={["top"]}>
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleEditProfile}>
          <Edit size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          {/* <View style={styles.profileHeader}>
            <Image source={{ uri: user?.profilePicture }} style={styles.avatar} />
            <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]}>
              <Edit size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View> */}
          <View style={styles.profileHeader}>
            {user?.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={[styles.avatarText, { color: colors.text }]}>{firstLetter}</Text>
              </View>
            )}
          </View>

          <Text style={[styles.userName, { color: colors.text }]}>{user?.firstName ? user?.firstName + ' ' + user?.lastName : ''}</Text>
          <Text style={[styles.userEmail, { color: colors.text }]}>{user?.email}</Text>
          <Text style={[styles.userEmail, { color: colors.text }]}>{user?.bio ? user?.bio : ''}</Text>

          {/* <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.eventsHosted}</Text>
              <Text style={styles.statLabel}>Events Hosted</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.eventsAttended}</Text>
              <Text style={styles.statLabel}>Events Attended</Text>
            </View>
          </View>  */}
        </View>

        {/* Theme Toggle Section */}
        <View style={[styles.themeToggleContainer, { backgroundColor: colors.card }]}>
          <View style={styles.themeToggleLeft}>
            {isDark ? (
              <Moon size={20} color={colors.primary} style={styles.themeIcon} />
            ) : (
              <Sun size={20} color={colors.primary} style={styles.themeIcon} />
            )}
            <Text style={[styles.themeToggleText, { color: colors.text }]}>{isDark ? "Dark Mode" : "Light Mode"}</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary + "80" }}
            thumbColor={isDark ? colors.primary : "#f4f3f4"}
            ios_backgroundColor="#767577"
            onValueChange={toggleTheme}
            value={isDark}
          />
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.menuItem, { borderBottomColor: colors.border }]}>
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={[styles.menuItemTitle, { color: colors.text }]}>{item.title}</Text>
              </View>
              <View style={[styles.menuItemArrow, { borderColor: colors.muted }]} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={[styles.logoutButton, { borderColor: colors.border }]} onPress={handleLogout}>
          <LogOut size={20} color={colors.text} />
          <Text style={[styles.logoutText, { color: colors.text }]}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    margin: "auto",
    width: '90%',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileHeader: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
  },
  divider: {
    width: 1,
    height: 40,
    marginHorizontal: 16,
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 12,
  },
  menuItemArrow: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    transform: [{ rotate: "45deg" }],
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 24,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
  },
  themeToggleLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  themeIcon: {
    marginRight: 12,
  },
  themeToggleText: {
    fontSize: 16,
    fontWeight: "500",
  },
})

