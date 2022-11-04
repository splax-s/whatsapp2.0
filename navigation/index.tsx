/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import LinkingConfiguration from './LinkingConfiguration';
import {BottomTabNavigator} from './BottomTabNavigator';
import ChatScreen from '../screens/ChatScreen';
import ContactsScreen from '../screens/ContactsScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import NewGroupScreen from '../screens/NewGroupScreen';
import AddContactsToGroupScreen from '../screens/AddContactsToGroupScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Root"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{ }}
      />
      <Stack.Screen name="Group Info" component={GroupInfoScreen} />
      <Stack.Screen
      name="Contacts"
      component={ContactsScreen}
      />
      <Stack.Screen name="New Group" component={NewGroupScreen} />
      <Stack.Screen
          name="Add Contacts"
          component={AddContactsToGroupScreen}
        />
    </Stack.Navigator>
  );
}
