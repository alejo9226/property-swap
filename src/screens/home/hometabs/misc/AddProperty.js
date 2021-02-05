import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native'
import { useState } from 'react/cjs/react.development'
import styles from './styles'
import * as ImagePicker from 'expo-image-picker'
import { REACT_APP_SERVER_URL } from '@env'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function AddProperty () {
  const formState = {
    address: '',
    coordinates: '',
    rooms: '',
  }

  const [form, setForm] = useState(formState)
  const [pics, setPics] = useState([])

  const addressHandleChange = (text) => {
    setForm({ ...form, address: text })
  }
  const coordinatesHandleChange = (text) => {
    setForm({ ...form, coordinates: text })
  }
  const roomsHandleChange = (text) => {
    setForm({ ...form, rooms: text })
  }

  const addPictures = async () => {
    try {
      const data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
      })
      setPics([...pics, data])
    } catch (err) {

    }
  }

  const onPropertyAddition = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await axios({  
        baseURL: REACT_APP_SERVER_URL,
        method: 'POST',
        url: '/property/add',
        data: form,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })      

      if (pics.length > 0) {

        const imageData = new FormData()
        imageData.append('name', 'Image Upload');
        pics.forEach((pic, i) => imageData.append(`file_attachment_${i}`, {...pic, name: `image${i}.jpg`}))

        const response = await axios({  
          baseURL: REACT_APP_SERVER_URL,
          method: 'PUT',
          url: '/upload/property',
          data: imageData,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        })      
        alert('Property added successfully')
      }
    } catch (err) {
      alert('We\'re in trouble to add your image')
    }
  }

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.textLabel}
      >Address</Text>
      <TextInput 
        onChangeText={addressHandleChange}
        style={styles.input}
        value={form.address}
      />
      <Text
        style={styles.textLabel}
      >Coordinates</Text>
      <TextInput 
        onChangeText={coordinatesHandleChange}
        style={styles.input}
        value={form.coordinates}
      />
      <Text
        style={styles.textLabel}
      >Rooms</Text>
      <TextInput 
        onChangeText={roomsHandleChange}
        style={styles.input}
        value={form.rooms}
      />
      <Text
        style={styles.textLabel}
      >Pictures</Text>
      <View
        style={{
          height: 125,
          marginTop: 15,
        }}
      >

      {/*   <SafeAreaView
          style={styles.scrollView}
        >
           */}
            <FlatList
              horizontal={true}
              style={styles.scrollView}
              ListHeaderComponent={
                <View
                  style={styles.views}
                >
                  <TouchableOpacity
                    onPress={addPictures}
                    style={{
                      borderWidth: 1,
                      borderColor: 'purple',
                      backgroundColor: 'red',
                      alignItems: "center",
                      justifyContent: 'center',
                      height: 48,
                    }}  
                  >
                    <Text
                      style={styles.addPic}
                    >Add</Text>
                  </TouchableOpacity>
                </View>
              }
              
              data={pics}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginHorizontal: 2
                  }}
                >
                  <Image 
                    style={{
                      width: 100,
                      height: 100
                    }}
                    source={{ uri: item.uri }}
                  />
                </View>
              )}
              keyExtractor={(item) => `${item.uri}`}
            />
          
        {/* </SafeAreaView> */}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onPropertyAddition()}
      >
        <Text style={styles.buttonTitle}>Add property</Text>
      </TouchableOpacity>
    </View>
  )
}