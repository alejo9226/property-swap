import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { REACT_APP_SERVER_URL } from '@env'
import { COLORS } from '../../../../constants/theme'

export default function Home({ setIsLoggedIn }) {

  const [properties, setProperties] = useState([])

  useEffect(() => {
    async function getProperties () {
      try {
        const token = await AsyncStorage.getItem('token')
        const { data } = await axios({
          baseURL: REACT_APP_SERVER_URL,
          method: 'GET',
          url: `/property`,
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        console.log('propertiesirras', data.data)
        setProperties([...data.data])
      } catch (err) {
        alert(`${err}`)
      }
    }
    getProperties()
  }, [])

  const onLogoutPress = async () => {
    await AsyncStorage.removeItem('token')
    setIsLoggedIn(false)
    setProperties([])
  }
  console.log('total properties', properties)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 50,
        backgroundColor: COLORS.background
      }}
    >
      <TouchableOpacity
        onPress={() => onLogoutPress()}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      {!!properties && properties.length > 0 ? (
        <FlatList 
          style={{
            padding: 10
          }}
          data={properties}
          renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: '90%',
              alignSelf: 'center'
            }}
          >
            <View>
              <Image 
                style={{
                  width: '100%',
                  height: 200,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
                source={{ uri: item.pictures && item.pictures.length > 0 ? item.pictures[1] : '' }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                padding: 5,
              }}
            >
              <View>
                <Text>Apartamento</Text>
              </View>
              <View>
                <Text>Ciudad</Text>
              </View>
              <View>
                <Text>{item.address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item._id}`}
      />
      ) : <Text>No properties to show.</Text>}
      

     
    </SafeAreaView>
  )
}