import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { REACT_APP_SERVER_URL } from '@env'

export default function Home({ setIsLoggedIn }) {

  const [properties, setProperties] = useState([])

  useEffect(() => {
    async function getProperties () {
      try {
        const token = await AsyncStorage.getItem('token')
        const properties = await axios({
          baseURL: REACT_APP_SERVER_URL,
          method: 'GET',
          url: `/property`,
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        setProperties(properties.data)
      } catch (err) {
        alert(`${err}`)
      }
    }
    getProperties()
  }, [])

  const onLogoutPress = async () => {
    await AsyncStorage.removeItem('token')
    setIsLoggedIn(false)
  }
  console.log('properties', properties)
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => onLogoutPress()}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      {!!properties && properties.length > 0 ? (
        <FlatList 
        data={properties}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button
              title="view more"
              onPress={() => navigation.navigate('Post', { id: item.id })}
            />
          </View>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
      ) : <Text>No properties to show.</Text>}
      

     
    </View>
  )
}