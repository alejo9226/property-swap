import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, Modal } from 'react-native'
import { REACT_APP_SERVER_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { COLORS } from '../../../../constants/theme';


export default function OutgoingSwaps () {
  const [outgoingSwaps, setOutgoingSwaps] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [currentSwap, setCurrentSwap] = useState(null)

  let token;


  useEffect(() => {
    async function getOutgoingSwaps () {
      try {
        token = await AsyncStorage.getItem('token')
        const { data } = await axios({
          baseURL: REACT_APP_SERVER_URL,
          url: '/swap/out',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setOutgoingSwaps(data.data)
      } catch (err) {
        alert(err.message)
      }
    }
    getOutgoingSwaps()
  }, [])

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

  console.log('swaps', outgoingSwaps)
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
      {!!outgoingSwaps && outgoingSwaps.length > 0 ? (
        <FlatList 
        data={outgoingSwaps}
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
              >{`You sent a swap proposal to ${item.secondUser.fullName}`}</Text>
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
              <Text
                style={{
                  marginBottom: 10
                }}
              >
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >{`State: `}</Text>
              <Text>{`${item.state}`}</Text>
              </Text>
              <Text>{item.conditions}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item._id}`}
      />

      ) : <Text>You haven't proposed any swap</Text>}

    </SafeAreaView>
  )
}