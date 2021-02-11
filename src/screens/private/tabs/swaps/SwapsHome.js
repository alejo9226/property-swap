import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import IncomingSwaps from './IncomingSwaps'
import OutgoingSwaps from './OutgoingSwaps'
import { NavigationContainer } from '@react-navigation/native'

const Tab = createMaterialTopTabNavigator()

export default function SwapsHome () {
  return (
    <NavigationContainer
      independent={true}
    >
      <Tab.Navigator
        tabBarOptions={{
          style: {
            paddingTop: 50
          }
        }}
      >
        <Tab.Screen name="Proposals" component={IncomingSwaps} />
        <Tab.Screen name="Proposed" component={OutgoingSwaps} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}