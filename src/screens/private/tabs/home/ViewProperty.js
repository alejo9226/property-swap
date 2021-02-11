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

  return (
    <View
      style={{
        paddingTop: 40,
        paddingHorizontal: 10,
        backgroundColor: COLORS.background,
        flex: 1
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          padding: 10,
          width: 30,
          height: 30,
          zIndex: 1000,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 60,
          left: 20
          
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            zIndex: 50,
            elevation: 1000
          }}
        >
          <Image 
            source={require('../../../../assets/images/back.png')}
            style={{
              height: 15,
              width: 15,
            }}
          />
        </TouchableOpacity>
      </View>
      {!!property && (
        <View
          style={{
            marginTop: 10,
            flex: 1
          }}
        >
          <Image 
            style={{
              width: '100%',
              height: 300,
              borderRadius: 15,
            }}
            source={{ uri: property.pictures && property.pictures.length > 0 && property.pictures[0] }}
          />
          <View>
            <Text
              style={{
                color: COLORS.primary,
                fontWeight: '600',
                fontSize: 20,
                margin: 10,
              }}
            >{property.estateType}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10
            }}
          >
            <Image 
              style={{
                height: 15,
                width: 15
              }}
              source={require('../../../../assets/images/placeholder.png')}
            />
            <Text
              style={{
                color: 'grey',
                marginVertical: 5,
                fontSize: 16,
                marginLeft: 5
              }}
            >{`${property.address}, ${property.city}, ${property.country}`}</Text>
          </View>
          <View
            style={{
              margin: 10,
            
            }}
          >
            <Text>{property.description}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '70%',
              justifyContent: 'space-between',
              marginVertical: 10
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
                >{property.rooms}</Text>
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
              >{property.toilets}</Text>
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
              >{`${property.area}m²`}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                borderRadius: 5,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'flex-start'
              }}
            >
              <Image 
                style={{
                  width: 50,
                  height: 50
                }}
                source={ property.user.profilePic ? { uri: property.user.profilePic } : require('../../../../assets/images/icon.png') }
              />
              <View
                style={{
                  marginHorizontal: 10
                }}
              >
                <Text
                  style={{
                    marginBottom: 5,
                    fontSize: 16,
                    fontWeight: '600'
                  }}
                >{property.user ? property.user.fullName : ''}</Text>
                <Text>{`${property.user.email}`}</Text>
              </View>

            </View>
          </View>



          <TouchableOpacity
            onPress={() => proposeSwap()}
            style={{
              backgroundColor: COLORS.primary,
              marginTop: 20,
              height: 48,
              width: '100%',
              borderRadius: 5,
              alignItems: "center",
              justifyContent: 'center',
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