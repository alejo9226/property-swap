import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View, Image, Button, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from '../home/styles';
import { REACT_APP_SERVER_URL } from '@env'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

export default function Profile({ navigation, setIsLoggedIn }) {
  const formState = {
    profilePic: '',
    fullName: '',
    email: '',
    password: '',
    property: '',
  }
  const [currentUser, setCurrentUser] = useState(null)
  const [cameraRollPermission, setCameraRollPermission] = useState('denied')
  const [profilePicEd, setProfilePicEd] = useState(null)
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
          profilePic: data.data.profilePic ? data.data.profilePic : '',
          fullName: data.data.fullName,
          email: data.data.email,
          password: data.data.password,
          property: !data.data.property ? '' : data.data.property,
        })
      } catch (err) {
        alert('We\'re having trouble to retrieve your info')
      }
    }

    getProfileInfo()
  }, [profilePicEd])

  useEffect(() => {
    Permissions.askAsync(Permissions.MEDIA_LIBRARY)
      .then(({ status }) => setCameraRollPermission(status))
  }, [])

  const pickImage = async () => {
    try {
      const data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        allowsMultipleSelection: true,
      })
  
      const imageData = new FormData()
      imageData.append('name', 'Image Upload');
      imageData.append('file_attachment', {
        ...data,
        name: 'image.jpg'
      })

      const token = await AsyncStorage.getItem('token')
      const response = await axios({  
        baseURL: REACT_APP_SERVER_URL,
        method: 'PUT',
        url: '/upload/user',
        data: imageData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      setProfilePicEd(data)
      alert('Image successfully saved')

    } catch (err) {
      alert('Try saving your image later')
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
  console.log('form', form)
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
      >
        <View style={styles.container}>
          <ImageBackground
            style={styles.profilePic}
            source={!!form.profilePic ? { uri: form.profilePic } : require('../../../../../assets/icon.png') }
          >
          {cameraRollPermission === 'granted' && (
            <TouchableOpacity
              style={styles.addPicButton}
              onPress={() => pickImage()}
            >
              <Image
                source={require('../../../../../assets/add-icon.png')}
                style={styles.addPicButtonIcon}
              />
            </TouchableOpacity>
          )}
          </ImageBackground>
        </View>
        <View>
          <Text
            style={styles.textLabel}
          >Name</Text>
          <TextInput 
            onChangeText={nameHandleChange}
            style={styles.input}
            value={form.fullName}
          />
          <Text
            style={styles.textLabel}
          >Email</Text>
          <TextInput 
            onChangeText={emailHandleChange}
            style={styles.input}
            value={form.email}
          />
          <Text
            style={styles.textLabel}
          >Password</Text>
          <TextInput 
            onChangeText={passwordHandleChange}
            style={styles.input}
            value={form.password}
          />
          <Text
            style={styles.textLabel}
          >Properties</Text>
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
              value={!form.property ? 'You don\'t have properties' : form.property}
            />
            {!form.property ? (
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
                  fontWeight: "bold",
                  flex: 1,
                }}
              >Add</Text>
            </TouchableOpacity>
            ) : <></>}
            
          </View>
        </View>
       

      </KeyboardAwareScrollView>
    </View>
  )
}