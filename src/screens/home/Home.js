import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

export default function Home({ navigation, route }) {

  useEffect(() => {
    async function validateUser () {
      const token = await AsyncStorage.getItem('token')
  
      if(!token) navigation.navigate('Login')
    }
    validateUser()
  })
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}