import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { REACT_APP_SERVER_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../../../../constants/theme'


export default function ViewProperty ({ navigation, route }) {
  const [property, setProperty] = useState(null)
  let token = ''
  
  useEffect(() => {
    async function getProperty () {
      try {
        token = await AsyncStorage.getItem('token')
        const { data } = await axios({
          baseURL: REACT_APP_SERVER_URL,
          url: `/property/${route.params.id}`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log('propertyuseff', data.data)
        setProperty(data.data)

      } catch (err) {
        alert(err)
      }
    }
    getProperty()
  }, [])
  
  const proposeSwap = async () => {
    navigation.navigate('PostSwap', { property })
  }

  console.log('property', property)
  return (
    <View
      style={{
        paddingTop: 40
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text>Return</Text>
      </TouchableOpacity>
      <Text>You're in View Property</Text>
      {!!property && (
        <View>
          <Image 
            style={{
              width: '100%',
              height: 300,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            source={{ uri: property.pictures && property.pictures.length > 0 && property.pictures[0] }}
          />
          <TouchableOpacity
            onPress={proposeSwap}
            style={{
              backgroundColor: COLORS.primary,
              marginLeft: 30,
              marginRight: 30,
              marginTop: 20,
              height: 48,
              width: '85%',
              borderRadius: 5,
              alignItems: "center",
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: "bold"
              }}
            >Propose Swap</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}