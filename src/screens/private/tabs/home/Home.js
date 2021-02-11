import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { REACT_APP_SERVER_URL } from '@env'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ViewProperty from './ViewProperty'
import GetProperties from './GetProperties'
import PostSwap from './PostSwap'


const Stack = createStackNavigator()

export default function Home({ setIsLoggedIn }) {

  const [properties, setProperties] = useState([])

  return (
    <NavigationContainer
      independent={true}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="GetProperties">
          {props => <GetProperties {...props} setIsLoggedIn={setIsLoggedIn} properties={properties} setProperties={setProperties} />}
        </Stack.Screen>
        <Stack.Screen name="ViewProperty">
          {props => <ViewProperty {...props} setIsLoggedIn={setIsLoggedIn}/>}
        </Stack.Screen>
        <Stack.Screen name="PostSwap">
          {props => <PostSwap {...props} setIsLoggedIn={setIsLoggedIn}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}