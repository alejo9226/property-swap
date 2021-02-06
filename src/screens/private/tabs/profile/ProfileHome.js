import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddProperty from './AddProperty';
import Profile from './Profile';

const Stack = createStackNavigator()

export default function ProfileHome () {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
    <NavigationContainer
      independent={true}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Profile">
          {props => <Profile {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AddProperty">
          {props => <AddProperty {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
