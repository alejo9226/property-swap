import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Settings() {

  return (
    <View>
      <Text>Settings Screen</Text>
      <TouchableOpacity
        onPress={() => onLogoutPress()}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}