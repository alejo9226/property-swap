import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Signup, Login, Tabs } from './src/screens';
import AddProperty from './src/screens/home/hometabs/misc/AddProperty';

const Stack = createStackNavigator()

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    async function checkForToken () {
      const token = await AsyncStorage.getItem('token')
      if (token) setIsLoggedIn(true)
      
    }
    checkForToken()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Tabs">
              {props => <Tabs {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {props => <Login {...props} setIsLoggedIn={setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {props => <Signup {...props} setIsLoggedIn={setIsLoggedIn}/>}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
