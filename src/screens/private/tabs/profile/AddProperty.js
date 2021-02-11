import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native'
import { useState } from 'react/cjs/react.development'
import styles from './styles'
import * as ImagePicker from 'expo-image-picker'
import { REACT_APP_SERVER_URL } from '@env'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function AddProperty ({ navigation, setAddProperty }) {

  const formState = {
    estateType: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    coordinates: '',
    rooms: '',
    toilets: '',
    area: ''
  }

  const [form, setForm] = useState(formState)
  const [pics, setPics] = useState([])

  const descriptionHandleChange = (text) => {
    setForm({ ...form, description: text })
  }
  const addressHandleChange = (text) => {
    setForm({ ...form, address: text })
  }
  const cityHandleChange = (text) => {
    setForm({ ...form, city: text })
  }
  const stateHandleChange = (text) => {
    setForm({ ...form, state: text })
  }
  const countryHandleChange = (text) => {
    setForm({ ...form, country: text })
  }
  const coordinatesHandleChange = (text) => {
    setForm({ ...form, coordinates: text })
  }
  const roomsHandleChange = (text) => {
    setForm({ ...form, rooms: text })
  }
  const toiletsHandleChange = (text) => {
    setForm({ ...form, toilets: text })
  }
  const areaHandleChange = (text) => {
    setForm({ ...form, area: text })
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
      if (pics.length === 0) throw new Error('You are missing info')
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
        setAddProperty(true)
        navigation.navigate('Profile')
      }
    } catch (err) {
      alert('We\'re in trouble to add your image')
    }
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
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
          top: 0,
          left: 15
          
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
      <Picker
        selectedValue={form.estateType}
        onValueChange={(itemValue, itemIndex) =>
          setForm({ ...form, estateType: itemValue })
        }
        style={{height: 150, width: '100%'}}
      >
        <Picker.Item label="Apartment" value="Apartment" />
        <Picker.Item label="Land" value="Land" />
        <Picker.Item label="Detached" value="Detached" />
      </Picker>
      <Text
        style={styles.textLabel}
      >Description</Text>
      <TextInput 
        onChangeText={descriptionHandleChange}
        style={styles.textarea}
        value={form.description}
        multiline={true}
        numberOfLines={5}
      />
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
      >City</Text>
      <TextInput 
        onChangeText={cityHandleChange}
        style={styles.input}
        value={form.city}
      />
      <Text
        style={styles.textLabel}
      >State</Text>
      <TextInput 
        onChangeText={stateHandleChange}
        style={styles.input}
        value={form.state}
      />
      <Text
        style={styles.textLabel}
      >Country</Text>
      <TextInput 
        onChangeText={countryHandleChange}
        style={styles.input}
        value={form.country}
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
      >Toilets</Text>
      <TextInput 
        onChangeText={toiletsHandleChange}
        style={styles.input}
        value={form.toilets}
      />
      <Text
        style={styles.textLabel}
      >Area in m²</Text>
      <TextInput 
        onChangeText={areaHandleChange}
        style={styles.input}
        value={form.area}
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
              contentContainerStyle={{
                alignItems: 'center',
                paddingHorizontal: 16
              }}
              ListHeaderComponent={
                <View
                  style={styles.views}
                >
                  <TouchableOpacity
                    onPress={addPictures}
                    style={{
                      height: 30,
                      width: 30,
                      borderColor: 'purple',
                      alignItems: "center",
                      justifyContent: 'center',
                      borderRadius: 50,
                      height: 48,
                    }}  
                  >
                    <Image 
                      style={{
                        width: 18,
                        height: 18,
                        tintColor: 'white'
                      }}
                      source={require('../../../../assets/images/add-icon.png')}
                    />
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
    </KeyboardAwareScrollView>
  )
}