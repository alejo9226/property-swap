import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, Modal } from 'react-native'
import { REACT_APP_SERVER_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../../../constants/theme';
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'


export default function IncomingSwaps () {
  const [incomingSwaps, setIncomingSwaps] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [currentSwap, setCurrentSwap] = useState(null)
  const [notificationPermission, setNotificationPermission] = useState('denied')

  let token;
  useEffect(() => {
    Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({ status }) => setNotificationPermission(status))
  }, [])

  useEffect(() => {
    async function getIncomingSwaps () {
      try {
        token = await AsyncStorage.getItem('token')
        const { data } = await axios({
          baseURL: REACT_APP_SERVER_URL,
          url: '/swap/in',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('data.data', data.data)
        setIncomingSwaps(data.data)
      } catch (err) {
        alert(err.message)
      }
    }
    getIncomingSwaps()
  }, [])

  async function registerForPushNotificationsAsync() {
    const notifToken = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('notifToken', notifToken)
  }

  const viewSwap = (swap) => {
    setCurrentSwap(swap)
    setModalVisible(true)
  }

  const handleSwap = async (state) => {
    //await registerForPushNotificationsAsync()
    token = await AsyncStorage.getItem('token')
    try {
      const { data } = await axios({
        baseURL: REACT_APP_SERVER_URL,
        url: `/swap/${currentSwap._id}/${state}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('data.data', data.data)
      alert(`Swap ${state}`)
      setModalVisible(false)
    } catch (err) {
      alert(err.message)
    }
    console.log('accepting swap..')
  }

  const formatShortDate = (date) => {
    console.log('date', date)
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formatDate = newDate.toLocaleDateString("en-AU", options);
    console.log('formatDate', formatDate)
    return formatDate;
  };

  console.log('incomingswaps', incomingSwaps)
  console.log('notificationPermission', notificationPermission)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      
      <Modal
        visible={modalVisible}
        transparent={true}
      
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              margin: 20,
              width: '70%',
              backgroundColor: COLORS.background,
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              alignItems: 'space-around',
              justifyContent: 'center',
              shadowRadius: 3.84,
              elevation: 5
            }}
          >
            <View
              style={{
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  alignSelf: 'center'
                }}
              >Swap sent!</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around'
                }}
              >
                <TouchableHighlight
                  onPress={() => handleSwap('Declined')}
                  style={{
                    backgroundColor: COLORS.primary,
                    borderRadius:  5,
                    marginTop: 15,
                    alignSelf: 'center',
                    padding: 10,
                    height: 35,
                    alignItems: "center",
                    justifyContent: 'center'
                  }}
                >
                  <Text
                    style={{
                      color: 'white'
                    }}
                  >Decline</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => handleSwap('Accepted')}
                  style={{
                    backgroundColor: COLORS.primary,
                    borderRadius:  5,
                    marginTop: 15,
                    alignSelf: 'center',
                    padding: 10,
                    height: 35,
                    alignItems: "center",
                    justifyContent: 'center'
                  }}
                >
                  <Text
                    style={{
                      color: 'white'
                    }}
                  >Accept</Text>
                </TouchableHighlight>
              </View>
            </View>

          </View>
        </View>
      </Modal>
      {!!incomingSwaps && incomingSwaps.length > 0 ? (
        <FlatList 
          data={incomingSwaps}
          style={{
            padding: 10,
            width: '100%'
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: '100%'
              }}
              onPress={() => viewSwap(item)}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  width: '99%',
                  padding: 10,
                  borderRadius: 5
                  
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 10
                  }}
                >{`${item.firstUser.fullName} wants to swap his/her place with you`}</Text>
                <Text
                  style={{
                    marginBottom: 10
                  }}
                >
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
                >{`Dates: `}</Text>
                <Text>{`${formatShortDate(item.from)} - ${formatShortDate(item.to)}`}</Text>
                </Text>
                <Text>{item.conditions}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item._id}`}
        />

      ) : <Text>You don't have proposals yet</Text>}

    </SafeAreaView>
  )
}