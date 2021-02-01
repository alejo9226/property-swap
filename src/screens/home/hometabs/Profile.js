import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View, Image, Button, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from '../styles';
import { REACT_APP_SERVER_URL } from '@env'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

export default function Profile({ navigation, setIsLoggedIn }) {
  const formState = {
    fullName: '',
    email: '',
    password: '',
    properties: '',
  }
  const [currentUser, setCurrentUser] = useState(null)
  const [cameraRollPermission, setCameraRollPermission] = useState('denied')
  const [profilePic, setProfilePic] = useState(null)
  const [form, setForm] = useState(formState)
  

  useEffect(() => {
    async function getProfileInfo ()  {
      try {
        const token = await AsyncStorage.getItem('token')
        const { data } = await axios({
          baseURL: REACT_APP_SERVER_URL,
          method: 'GET',
          url: `/user/single`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCurrentUser(data.data)
        setForm({
          ...form, 
          fullName: data.data.fullName,
          email: data.data.email,
          password: data.data.password,
          properties: data.data.property ? `${data.data.property}` : 'You don\'t have properties'
        })
      } catch (err) {
        console.log(err)
      }
    }

    getProfileInfo()
  }, [])

  useEffect(() => {
    Permissions.askAsync(Permissions.MEDIA_LIBRARY)
      .then(({ status }) => setCameraRollPermission(status))
  }, [])

  const pickImage = async () => {
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
  const nameHandleChange = (text) => {
    setForm({ ...form, fullName: text })
  }
  const emailHandleChange = (text) => {
    setForm({ ...form, email: text })
  }
  const passwordHandleChange = (text) => {
    setForm({ ...form, password: text })
  }

  const onLogoutPress = async () => {
    await AsyncStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  const addProperty = () => {
    navigation.navigate('AddProperty')
  }

  console.log('currentUser desde profile', currentUser)
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
      >
        <View style={styles.container}>
          <ImageBackground
            style={styles.profilePic}
            source={!!profilePic ? { uri: profilePic.uri } : require('../../../../assets/icon.png') }
          >
          {cameraRollPermission === 'granted' && (
            <TouchableOpacity
              style={styles.addPicButton}
              onPress={() => pickImage()}
            >
              <Image
                source={require('../../../../assets/add-icon.png')}
                style={styles.addPicButtonIcon}
              />
            </TouchableOpacity>
          )}
          </ImageBackground>
        </View>
        <View>
          <Text>Name</Text>
          <TextInput 
            onChangeText={nameHandleChange}
            style={styles.input}
            value={form.fullName}
          />
          <Text>Email</Text>
          <TextInput 
            onChangeText={emailHandleChange}
            style={styles.input}
            value={form.email}
          />
          <Text>Password</Text>
          <TextInput 
            onChangeText={passwordHandleChange}
            style={styles.input}
            value={form.password}
          />
          <Text>Properties</Text>
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
              onPress={addProperty}
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
       

      </KeyboardAwareScrollView>
    </View>
  )
}