import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  eventData: EventData | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
  updateEventData: (updatedData: Partial<EventData>) => Promise<void>;
  deleteEventData: () => Promise<void>;
};

type User = {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  profilePicture: string | null;
  phoneNumber: string | null;
  bio: string | null;
};

type EventData = {
  name: string;
  description: string;
  date: Date | string;
  location: string;
  selectedVenue: string;
  selectedTheme: string;
  selectedCostume: string;
  demographics: string;
  selectedFunActivities: {title: string, description: string}[];
  selectedPartyFavours: {title: string, description: string}[];
  eventBanner: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('userDetails');
      const storedEventData = await AsyncStorage.getItem('eventData');

      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedEventData) setEventData(JSON.parse(storedEventData));
      setIsLoading(false);
    };

    loadAuthData();
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem('authToken', newToken);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userDetails');
  };

  const updateEventData = async (updatedData: Partial<EventData>) => {
    setEventData(prev => {
      const newEventData: EventData = {
        name: updatedData.name ?? prev?.name ?? '',
        description: updatedData.description ?? prev?.description ?? '',
        date: updatedData.date ?? prev?.date ?? new Date(),
        location: updatedData.location ?? prev?.location ?? '',
        selectedVenue: updatedData.selectedVenue ?? prev?.selectedVenue ?? '',
        selectedTheme: updatedData.selectedTheme ?? prev?.selectedTheme ?? '',
        selectedCostume: updatedData.selectedCostume ?? prev?.selectedCostume ?? '',
        demographics: updatedData.demographics ?? prev?.demographics ?? '',
        selectedFunActivities: updatedData.selectedFunActivities ?? prev?.selectedFunActivities ?? [],
        selectedPartyFavours: updatedData.selectedPartyFavours ?? prev?.selectedPartyFavours ?? [],
        eventBanner: updatedData.eventBanner ?? prev?.eventBanner ?? '',
      };
      
      AsyncStorage.setItem('eventData', JSON.stringify(newEventData)); // No await needed
      console.log('New data:', newEventData); // Log the NEW value
      return newEventData; // Return the updated state
    });
  };

  const deleteEventData = async () => {
    setEventData(null);
    await AsyncStorage.removeItem('eventData');
  }

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!user) {
      const newUser = {
        email: updatedUser.email || null,
        id: updatedUser.id || null,
        firstName: null,
        lastName: null,
        profilePicture: null,
        phoneNumber: null,
        bio: null,
      };
      setUser(newUser);
      await AsyncStorage.setItem('userDetails', JSON.stringify(newUser));
    } else {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      await AsyncStorage.setItem('userDetails', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, eventData, login, logout, updateUser, updateEventData, deleteEventData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);