import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator, BottomTapBar } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './hometabs/Home'
import Profile from './hometabs/Profile'
import axios from 'axios'
import Settings from './hometabs/Settings'
import { REACT_APP_SERVER_URL } from '@env'

const Tab = createBottomTabNavigator()

export default function Tabs ({ setIsLoggedIn }) {
  
  
  return (
    <Tab.Navigator tabBarOptions={{
      showLabel: false,
      style: {
        backgroundColor: 'transparent',
        borderTopWidth: 0
      },
    }} 
    >
      <Tab.Screen name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../../assets/home-black-shape.png')} 
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FC6D3F" : "#CDCDD2"
              }}
            />
          )
        }}
      >
        {props => <Home {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
            source={require('../../../assets/user.png')} 
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? "#FC6D3F" : "#CDCDD2"
            }}
            />
          )
        }}
      >
        {props => <Profile {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

