import React, { useState } from 'react'
import { View, Text, TextInput, Modal } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { REACT_APP_SERVER_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import CalendarPicker from 'react-native-calendar-picker'
import axios from 'axios'
import { useEffect } from 'react'


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
        console.log('propiedades', data.data)
        setProperties(data.data)
      } catch (err) {
        alert(err.message)
      }
    }
    getProperties()
  }, [])

  

  const postSwap = async () => {

    if (
        !dates.START_DATE ||
        !dates.END_DATE || 
        !conditions ||
        !propertyToSwap
      ) throw new Error('You\'re missing info')

    const swap = {
      firstProperty: propertyToSwap,
      secondUser: user._id,
      secondProperty: _id,
      from: dates.START_DATE,
      to: dates.END_DATE,
      conditions,
    }
    console.log('swap', swap)

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
      console.log('data', data.data)
      setModalVisible(true)
    } catch (err) {
      alert(err.message)
    }
  }
  const onDateChange = (date, type) => {
    console.log('date', date)
    console.log('type', type)
    setDates({
      ...dates, [type]: date
    })
  }

  

  console.log('route.params.property', route.params.property)
  console.log('chosen dates', dates)
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
      <Modal
        visible={modalVisible}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
        >
          <View
            style={{

            }}
          >
            <Text>Swap sent!</Text>
            <TouchableHighlight
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Understood</Text>
            </TouchableHighlight>
          </View>

        </View>
      </Modal>
      <Text>Choose dates</Text>
      <CalendarPicker 
        allowRangeSelection={true}
        onDateChange={onDateChange}
      />
      <Text>Conditions</Text>
      <TextInput 
        value={conditions}
        onChangeText={(text) => setConditions(text)}
      />
      {!!properties && properties.length > 0 && (
        <>
        <Text>Choose property</Text>
        <Picker
          onValueChange={(val, i) => setPropertyToSwap(val)}
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
        onPress={postSwap}
      >
        <Text>Propose</Text>
      </TouchableOpacity>
    </View>
  )
}