import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator, BottomTapBar } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './home/Home';
import ProfileHome from './profile/ProfileHome';
import { COLORS } from '../../../constants/theme'
import RetrieveSwaps from './swaps/RetrieveSwaps';


const Tab = createBottomTabNavigator()

export default function Tabs ({ setIsLoggedIn }) {
  
  
  return (
    <Tab.Navigator 
      tabBarOptions={{
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
              source={require('../../../../assets/home-black-shape.png')} 
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : "#CDCDD2"
              }}
            />
          )
        }}
      >
        {props => <Home {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen 
        name="ProfileHome"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
            source={require('../../../../assets/user.png')} 
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : "#CDCDD2"
            }}
            />
          )
        }}
      >
        {props => <ProfileHome {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen 
        name="RetrieveSwaps"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
            source={require('../../../../assets/shuffle.png')} 
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : "#CDCDD2"
            }}
            />
          )
        }}
      >
        {props => <RetrieveSwaps {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

