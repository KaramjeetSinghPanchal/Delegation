// src/navigation/Tabnavigation.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DelegationBot from '../Screens/DelegationBot';
import Dashboard from '../Screens/Dashboard'; // Import Dashboard
import { Text } from '@react-navigation/elements';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const Tabnavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="none" component={Dashboard}
      options={() => ({
        tabBarIcon: () => (
          <Image 
            source={require('../assets/images/home.png')}  
            style={{ width: 30, height: 30 }} 
          />
        ),
        tabBarLabel: ()=> null
      })}
      />
      <Tab.Screen name="DelegationBot" 
      
      component={DelegationBot}
      options={() => ({
        tabBarIcon: () => (
          <Image 
            source={require('../assets/images/delegationbot.png')}  
            style={{ width: 50, height: 50 }} 
          />
        ),
        tabBarLabel: ()=> null
      })}
      />
      
    </Tab.Navigator>
  );
};

export default Tabnavigation;
