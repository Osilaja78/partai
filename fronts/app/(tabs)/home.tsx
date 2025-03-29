// import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Search, Camera, Palette } from 'lucide-react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useEffect, useState } from 'react';
// import { useAuth } from '~/context/auth';
// import { useTheme } from '~/context/theme-context';
// import { useRouter } from 'expo-router';

// const featuredEvents = [
//   {
//     id: 1,
//     name: 'Verona Reserve',
//     type: 'Private dining',
//     rating: 4.5,
//     reviews: 573,
//     image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//   },
//   {
//     id: 2,
//     name: 'Ember & Oak',
//     type: 'Private dining',
//     rating: 4.7,
//     reviews: 428,
//     image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//   }
// ];

// const upcomingEvents = [
//   {
//     id: 1,
//     month: 'MAR',
//     day: '30',
//     title: 'Birthday Lunch Celebration',
//     venue: 'The Carriage House Dining Club',
//     image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//   },
//   {
//     id: 2,
//     month: 'JUN',
//     day: '19',
//     title: 'Indie Music Festival',
//     venue: 'The Concorde Pavilion',
//     image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//   },
//   {
//     id: 3,
//     month: 'AUG',
//     day: '11',
//     title: 'Private Wedding Reception',
//     venue: 'Sable Room at Maison 12',
//     image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
//   }
// ];

// export default function HomeScreen() {

//   const [error, setError] = useState('');

//   const { token, user, updateUser } = useAuth();
//   const { colors } = useTheme();

//   const router = useRouter();

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
//       <ScrollView>
//         <View className="px-4">
//           {/* Search Bar */}
//           <View className="flex-row items-center bg-[#1A1A1A] rounded-full p-3 mb-6">
//             <Search size={20} color="#666" />
//             <TextInput
//               placeholder="Search"
//               placeholderTextColor="#666"
//               className="flex-1 ml-2 text-white"
//             />
//             <View className="flex-row">
//               <Camera size={20} color="#666" className="mr-2" />
//               <Palette size={20} color="#666" />
//             </View>
//           </View>

//           {/* Featured Section */}
//           <Text className="text-white text-xl font-bold mb-4">Featured this Season 🔥</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {featuredEvents.map((event) => (
//               <TouchableOpacity
//                 key={event.id}
//                 className="mr-4 rounded-xl overflow-hidden"
//                 style={{ width: 280 }}>
//                 <Image
//                   source={{ uri: event.image }}
//                   className="w-full h-40 rounded-xl"
//                 />
//                 <View className="mt-2">
//                   <Text className="text-white font-bold">{event.name}</Text>
//                   <View className="flex-row items-center">
//                     <Text className="text-gray-400 text-sm">{event.type}</Text>
//                     <Text className="text-gray-400 text-sm mx-2">•</Text>
//                     <Text className="text-white">{event.rating}</Text>
//                     <Text className="text-gray-400 text-sm ml-1">({event.reviews} reviews)</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>

//           {/* Your Events Section */}
//           <Text className="text-white text-xl font-bold mt-8 mb-4" style={[{color: colors.text}]}>Your Events</Text>
//           {upcomingEvents.map((event) => (
//             <TouchableOpacity
//               key={event.id}
//               // className="flex-row items-center mb-4 bg-[#1A1A1A] rounded-xl p-3"
//               style={styles.featuredEventCard}>
//               <Image
//                 source={{ uri: event.image }}
//                 className="w-16 h-16 rounded-lg"
//               />
//               <View className="flex-1 ml-4">
//                 <Text className="text-white font-bold" style={[{color: colors.text}]}>{event.title}</Text>
//                 <Text className="text-gray-400 text-sm" style={[{color: colors.text}]}>{event.venue}</Text>
//               </View>
//               <View className="items-center">
//                 <Text className="text-primary font-bold" style={[{color: colors.text}]}>{event.month}</Text>
//                 <Text className="text-white" style={[{color: colors.text}]}>{event.day}</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#121212",
//     paddingTop: 30
//   },
//   featuredEventsContainer: {
//     paddingRight: 16,
//   },
//   featuredEventCard: {
//     width: 200,
//     height: 150,
//     borderRadius: 12,
//     overflow: "hidden",
//     marginRight: 12,
//   },
// })

import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Camera, Plus } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/theme-context";
import { Link, useRouter } from "expo-router";
import { useAuth } from "~/context/auth";
import BlobBackground from "~/components/animations/animated-blob";

const FeaturedEvent = ({ title, subtitle, reviews, image }:{title: string, subtitle: string, reviews: string, image: {uri: string}}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.featuredEventCard}>
      <Image source={image} style={styles.featuredEventImage} />
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.featuredEventGradient}>
        <View style={styles.featuredEventContent}>
          <Text style={styles.featuredEventTitle}>{title}</Text>
          <View style={styles.featuredEventDetails}>
            <Text style={styles.featuredEventSubtitle}>{subtitle}</Text>
            {reviews && <Text style={styles.featuredEventReviews}>{reviews}</Text>}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const ActionButton = ({ title, icon, primary = false, href }: {title: string, icon: any, primary: boolean, href: string}) => {
  const { colors } = useTheme()

  const button = (
    <View
      style={[
        styles.actionButton,
        primary ? { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border } : {},
      ]}
    >
      {icon}
      <Text style={[styles.actionButtonText, primary ? { marginLeft: 8, color: colors.text } : {}]}>{title}</Text>
    </View>
  )

  if (href) {
    return (
      <Link href={{ pathname: href as any }} asChild>
        <TouchableOpacity>{button}</TouchableOpacity>
      </Link>
    )
  }

  return <TouchableOpacity>{button}</TouchableOpacity>
}

const EventItem = ({ month, day, title, location, image }: {month: string, day: string, title: string, location: string, image: any}) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity style={[styles.eventItem, {backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 8}]}>
      <Image source={image} style={styles.eventItemImage} />
      <View style={styles.eventDateContainer}>
        <Text style={[styles.eventMonth, {color: colors.text}]}>{month}</Text>
        <Text style={[styles.eventDay, {color: colors.text}]}>{day}</Text>
      </View>
      <View style={styles.eventItemContent}>
        <Text style={[styles.eventItemTitle, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.eventItemLocation, {color: colors.text}]}>{location}</Text>
      </View>
      {/* <View style={styles.eventItemAction}>
        <View style={styles.eventItemActionDot} />
      </View> */}
    </TouchableOpacity>
  )
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const { token, user, updateUser } = useAuth();

  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        const response = await fetch('http://192.168.43.32:8002/user-info', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: user?.id }),
        });

        if (response.status === 403) router.replace('/(auth)/login');
    
        const data = await response.json();
    
        if (response.ok) {
          updateUser({
            firstName: data.profile.first_name,
            lastName: data.profile.last_name,
            bio: data.profile.bio,
            phoneNumber: data.profile.phone_number,
            profilePicture: data.profile.profile_picture_url
          });
        }
    
      } catch (e: any) {
        setError(e.message || 'An error occurred');
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: colors.background, borderWidth: 1, borderColor: 'gray' }]}>
            <Search size={18} color={colors.muted} />
            <TextInput style={[styles.searchInput, {color: colors.text}]} placeholder="Search" placeholderTextColor={colors.muted} />
            <View style={styles.searchActions}>
              <TouchableOpacity style={styles.searchAction}>
                <View style={styles.colorPicker} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Featured this Season 🔥</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredEventsContainer}
          >
            <FeaturedEvent
              title="Verona Reserve"
              subtitle="Private dining"
              reviews="[372 Reviews]"
              image={{ uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" }}
            />
            <FeaturedEvent
              title="Ember & Oal"
              subtitle="Private dining"
              reviews="[372 Reviews]"
              image={{ uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" }}
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Start creating now</Text>
          <View style={styles.actionsContainer}>
            <ActionButton title="Create New" icon={<Plus size={18} color={colors.text} />} primary href="/create" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Your Events</Text>
          <View style={styles.eventsContainer}>
            <EventItem
              month="MAR"
              day="30"
              title="Birthday Lunch Celebration"
              location="The Carriage House Dining Club"
              image={{ uri: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" }}
            />
            <EventItem
              month="JUN"
              day="19"
              title="Indie Music Festival"
              location="The Concorde Pavilion"
              image={{ uri: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" }}
            />
            <EventItem
              month="AUG"
              day="11"
              title="Private Wedding Reception"
              location="Sable Room at Maison 12"
              image={{ uri: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    marginLeft: 8,
    fontSize: 14,
  },
  searchActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchAction: {
    marginLeft: 12,
  },
  colorPicker: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF4D8F",
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    transform: [{ rotate: "45deg" }],
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  featuredEventsContainer: {
    paddingRight: 16,
  },
  featuredEventCard: {
    width: 200,
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
  },
  featuredEventImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  featuredEventGradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 12,
  },
  featuredEventContent: {},
  featuredEventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  featuredEventDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  featuredEventSubtitle: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  featuredEventReviews: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 12,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 20,
  },
  eventsContainer: {
    marginTop: 8,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  eventItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  eventDateContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  eventMonth: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  eventDay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  eventItemContent: {
    flex: 1,
    marginLeft: 12,
  },
  eventItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  eventItemLocation: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
    marginTop: 2,
  },
  eventItemAction: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  // eventItemActionDot: {
  //   width: 6,
  //   height: 6,
  //   borderRadius: 3,
  //   backgroundColor: "#121212",
  // },
})


