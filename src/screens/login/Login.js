import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import axios from 'axios';
import { REACT_APP_SERVER_URL } from '@env'

export default function LoginScreen({ navigation, setIsLoggedIn }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
      navigation.navigate('Signup')
    }

    const onLoginPress = async () => {
      if (!email || !password) alert('Fill all fields')
      try  {
        const loggingUser = {
          email,
          password,
        }
  
        const { data } = await axios({
          method: 'POST',
          baseURL: REACT_APP_SERVER_URL,
          url: `/user/login`,
          data: loggingUser,
        })

        await AsyncStorage.setItem('token', data.token)
        setIsLoggedIn(true)
      } catch (error) {
        alert(`${error}`)
      }
    }

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">
          <Image
            style={styles.logo}
            source={require('../../../assets/icon.png')}
          />
          <TextInput
            style={styles.input}
            placeholder='E-mail'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}>
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text 
              style={styles.footerText}
            >Don't have an account?{` `}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
}