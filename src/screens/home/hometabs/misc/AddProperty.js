import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react/cjs/react.development'
import styles from './styles'
import * as ImagePicker from 'expo-image-picker'

export default function AddProperty () {
  const formState = {
    address: '',
    coordinates: '',
    rooms: '',
    pictures: [],
  }

  const [form, setForm] = useState(formState)

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
      console.log(data)
      setProfilePic(data)
    } catch (err) {

    }
  }

  return (
    <View>
      <Text>Address</Text>
      <TextInput 
        onChangeText={addressHandleChange}
        style={styles.input}
        value={form.address}
      />
      <Text>Coordinates</Text>
      <TextInput 
        onChangeText={coordinatesHandleChange}
        style={styles.input}
        value={form.coordinates}
      />
      <Text>Rooms</Text>
      <TextInput 
        onChangeText={roomsHandleChange}
        style={styles.input}
        value={form.rooms}
      />
      <Text>Pictures</Text>
      <View
        style={{
          borderWidth: 1,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <TextInput 
          editable={false}
          style={styles.propertyInput}
          value={form.properties}
        />
        <TouchableOpacity
          onPress={addPictures}
          style={{
            backgroundColor: 'red',
            alignItems: "center",
            justifyContent: 'center',
            flex: 1,
            height: 48,

          }}  
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold"
            }}
          >Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}