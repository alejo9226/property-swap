import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { REACT_APP_SERVER_URL } from '@env'
import { COLORS } from '../../../../constants/theme'

export default function GetProperties ({ setIsLoggedIn, navigation, properties, setProperties }) {

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

  const viewProperty = (id) => {
    navigation.navigate('ViewProperty', { id })
  }
  console.log('total properties', properties)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 50,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {!!properties && properties.length > 0 ? (
        <FlatList 
          style={{
            padding: 10
          }}
          data={properties}
          renderItem={({ item }) => (
          <TouchableOpacity
            onPress={viewProperty.bind(this, item._id)}
            style={{
              width: '99%',
              alignSelf: 'center',
              marginBottom: 10
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
                source={{ uri: item.pictures && item.pictures.length > 0 ? item.pictures[0] : '' }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                padding: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: '600',
                    fontSize: 16,
                  }}
                >{item.estateType}</Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'grey',
                    marginVertical: 5,
                    fontSize: 15
                  }}
                >{`${item.address}, ${item.city}, ${item.country}`}</Text>
              </View>
              <View>
                <Text>{item.user ? item.user.fullName : ''}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '80%',
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}
                >
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: '#f3f3f4',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image 
                      source={require('../../../../assets/images/bed.png')} 
                      resizeMode="contain"
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.primary
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,

                    }}
                  >{item.rooms}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: '#f3f3f4',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image 
                      source={require('../../../../assets/images/bathtub.png')} 
                      resizeMode="contain"
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.primary
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10
                    }}
                  >{item.toilets}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: '#f3f3f4',
                      justifyContent: 'center',
                      alignItems: 'center'

                    }}
                  >
                    <Image 
                      source={require('../../../../assets/images/assembly-area.png')} 
                      resizeMode="contain"
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.primary
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10
                    }}
                  >{`${item.area}m²`}</Text>
                </View>
                
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