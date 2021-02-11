import React, { useState } from 'react'
import { View, Text, TextInput, Modal, Image } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { REACT_APP_SERVER_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import CalendarPicker from 'react-native-calendar-picker'
import axios from 'axios'
import { useEffect } from 'react'
import { COLORS } from '../../../../constants/theme'


export default function PostSwap ({ navigation, route }) {

  const { property: { user, _id } } = route.params
  let token;


  const datesState = {
    START_DATE: '',
    END_DATE: ''
  }
  const [dates, setDates] = useState(datesState)
  const [conditions, setConditions] = useState('')
  const [properties, setProperties] = useState([])
  const [propertyToSwap, setPropertyToSwap] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    async function getProperties () {
      try {
        token = await AsyncStorage.getItem('token')
        const { data } = await axios({
          baseURL: REACT_APP_SERVER_URL,
          url: '/property/own',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        setProperties(data.data)
      } catch (err) {
        alert(err.message)
      }
    }
    getProperties()
  }, [dates])

  

  const postSwap = async () => {

    if (
        !dates.START_DATE ||
        !dates.END_DATE || 
        !conditions 
      ) throw new Error('You\'re missing info')

    const swap = {
      firstProperty: route.params.property,
      secondUser: user._id,
      secondProperty: _id,
      from: dates.START_DATE,
      to: dates.END_DATE,
      conditions,
    }

    try {
      token = await AsyncStorage.getItem('token')
      const { data } = await axios({
        baseURL: REACT_APP_SERVER_URL,
        method: 'POST',
        url: '/swap/add',
        data: swap,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      setModalVisible(true)
    } catch (err) {
      alert(err.message)
    }
  }
  const onDateChange = (date, type) => {
    setDates({
      ...dates, [type]: date
    })
  }

  

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 40,
        backgroundColor: COLORS.background,
        paddingHorizontal: 15
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          zIndex: 50,
          elevation: 1000,
          height: 30,
          width: 30,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
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
                <TouchableHighlight
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    backgroundColor: COLORS.primary,
                    width: '90%',
                    borderRadius:  5,
                    marginTop: 15,
                    alignSelf: 'center',
                    height: 35,
                    alignItems: "center",
                    justifyContent: 'center'
                  }}
                >
                  <Text
                    style={{
                      color: 'white'
                    }}
                  >Understood</Text>
                </TouchableHighlight>
              </View>

            </View>
          </View>
        </Modal>
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
          fontWeight: '600'
        }}
      >Choose dates</Text>
      <View
        style={{
          marginTop: 20
        }}
      >
        <CalendarPicker 
          allowRangeSelection={true}
          onDateChange={onDateChange}
          previousTitleStyle={{
            color: COLORS.primary
          }}
          nextTitleStyle={{
            color: COLORS.primary
          }}
          selectedRangeStyle={{
            backgroundColor: 'white'
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
          fontWeight: '600'
        }}
      >Conditions</Text>
      <TextInput 
        value={conditions}
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
          height: 68,
          marginTop: 10,
          marginBottom: 10,
          padding: 10
        }}
        onChangeText={(text) => setConditions(text)}
      />
      {!!properties && properties.length > 0 && (
        <>
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            fontWeight: '600'
          }}
        >Choose property</Text>
        <Picker
          selectedValue={propertyToSwap}
          style={{
            height: 50,
            marginBottom: 100,
            marginTop: 0
          }}
          onValueChange={(itemValue, itemIndex) => setPropertyToSwap(itemValue)}
        >
          {properties.map(property => {
            return (
              <Picker.Item 
                label={property.address} 
                value={property._id} 
                key={property._id}
              />
            )
          })}
          
        </Picker>
        </>
      ) }
      <TouchableOpacity
        onPress={() => postSwap()}
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
        >Propose</Text>
      </TouchableOpacity>
    </View>
  )
}