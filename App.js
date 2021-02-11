import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Signup, Login } from './src/screens/public'
import Tabs from './src/screens/private/tabs/Tabs'

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
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
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
