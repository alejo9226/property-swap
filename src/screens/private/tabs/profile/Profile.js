import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View, Image, Button, ImageBackground, Touchable } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import profileStyles from './profileStyles';
import { REACT_APP_SERVER_URL } from '@env'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { COLORS } from '../../../../constants/theme'

export default function Profile({ navigation, setIsLoggedIn, addProperty, setProperties}) {
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
        console.log('response.data', data)
        setCurrentUser(data.data)
        setForm({
          ...form, 
          profilePic: data.data.profilePic ? data.data.profilePic : '',
          fullName: data.data.fullName,
          email: data.data.email,
          password: data.data.password,
          property: !data.data.property ? '' : `${data.data.property.estateType} in ${data.data.property.address}, ${data.data.property.city}`,
        })
      } catch (err) {
        alert('We\'re having trouble to retrieve your info')
      }
    }

    getProfileInfo()
  }, [profilePicEd, addProperty])

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
      })
      const imageData = new FormData()
      imageData.append('name', 'Image Upload');
      imageData.append('file_attachment', {
        ...data,
        name: `image_${Math.floor(Math.random() * 1000)}.jpg`
      })
      const token = await AsyncStorage.getItem('token')

      console.log('REACT_APP_SERVER_URL', REACT_APP_SERVER_URL)
      const response = await axios({  
        baseURL: REACT_APP_SERVER_URL, 
        url: '/upload/user',
        method: 'PUT',
        data: imageData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      
      setProfilePicEd(data)
      alert('Image successfully saved')

    } catch (err) {
      console.log(err)
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

  const postProperty = () => {
    navigation.navigate('AddProperty')
  }

  const onLogoutPress = async () => {
    await AsyncStorage.removeItem('token')
    setIsLoggedIn(false)
    setProperties([])
  }
  console.log('form', form)
  return (
    <View style={profileStyles.containerOuter}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
      >
        <View style={profileStyles.containerInner}>
          <View
            style={{
              borderRadius: 50,
            }}
          >
            <Image
              style={profileStyles.profilePic}
              source={!!form.profilePic ? { uri: form.profilePic } : require('../../../../assets/images/icon.png') }
            />
          {cameraRollPermission === 'granted' && (
            <View
              style={profileStyles.addPicView}
            >
              <TouchableOpacity
                style={{
                  zIndex: 50,
                  elevation: 1000
                }}
                onPress={() => pickImage()}
              >
                <Image
                  source={require('../../../../assets/images/photo-camera.png')}
                  style={profileStyles.addPicButtonIcon}
                />
              </TouchableOpacity>
            </View>
          )}
          </View>
        </View>
        <View>
          <Text
            style={profileStyles.textLabel}
          >Name</Text>
          <TextInput 
            onChangeText={nameHandleChange}
            style={profileStyles.input}
            value={form.fullName}
          />
          <Text
            style={profileStyles.textLabel}
          >Email</Text>
          <TextInput 
            onChangeText={emailHandleChange}
            style={profileStyles.input}
            value={form.email}
          />
          <Text
            style={profileStyles.textLabel}
          >Property</Text>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 30,
              paddingTop: 10,
              flexWrap: 'wrap'
            }}
          >
            <TextInput 
              editable={false}
              style={{
                width: !form.property ? '100%' : '100%',
                backgroundColor: 'white',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderTopRightRadius: !form.property ? 0 : 5,
                borderBottomRightRadius: !form.property ? 0 : 5,
                height: 48,
                paddingLeft: 16
              }}
              value={!form.property ? 'You don\'t have properties' : form.property}
            />
            {!form.property ? (
              <View
                style={{
                  position: 'absolute',
                  right: 35,
                  top: 15
                }}
              >
                <Button 
                  onPress={() => postProperty()}
                  title="Add"
                  color="#841584"
                />
              </View>

            ) : <></>}
          </View>
        </View>
       
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            height: 48,
            width: '85%',
            borderRadius: 5,
            alignItems: "center",
            justifyContent: 'center'
          }}
          onPress={() => onLogoutPress()}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: "bold"
            }}
          >Logout</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  )
}