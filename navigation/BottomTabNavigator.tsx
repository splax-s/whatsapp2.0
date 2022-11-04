import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SettingsScreen from '../screens/SettingsScreen';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';


const BottomTab = createBottomTabNavigator();

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation()

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: { backgroundColor: "whitesmoke" },
    headerStyle: { backgroundColor: "whitesmoke" },
    headerRight: () => (
        <TouchableOpacity onPress={()=> navigation.navigate("Contacts")}>
        <Entypo
          name="new-message"
          size={18}
          color={"royalblue"}
          style={{ marginRight: 15 }}
        />
        </TouchableOpacity>
      ),
      }}>
      <BottomTab.Screen name="Status" component={TabTwoScreen}
      options={{tabBarIcon: ({ color, size }) => (
        <Ionicons name="logo-whatsapp" size={size} color={color} />
      ),}}
      />
      <BottomTab.Screen
      name="Calls"
      component={TabTwoScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
      }}
      />
      <BottomTab.Screen
      name="Camera"
      component={TabTwoScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" size={size} color={color} />
          ),
      }}
      />
      <BottomTab.Screen
        name="Home"
        component={ChatsScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-chatbubbles-sharp" size={size} color={color} />
              ),
        }}
      />

      <BottomTab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
      }}
      />
    </BottomTab.Navigator>
  );
}
