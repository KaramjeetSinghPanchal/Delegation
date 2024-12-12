// src/navigation/Tabnavigation.js

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DelegationBot from '../Screens/DelegationBot'; // Ensure correct import
import Dashboard from '../Screens/Dashboard'; // Ensure correct import
import {Image} from 'react-native';
import TaskManagement from '../Screens/TaskManagement';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Usermanagement from '../Screens/Usermanagement';
const Tab = createBottomTabNavigator();

const Tabnavigation = () => {
  return (
    <Tab.Navigator>
      {/* Dashboard Screen */}
      <Tab.Screen
        name="Dashboard"
        component={Dashboard} // Ensure the component is correctly passed
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/home.png')} // Local image for the icon
              style={{width: 35, height: 35}}// Customize size
              // Customize size
            />
          ),
          tabBarLabel: () => null, // Hide the label
        }}
      />

      {/* Delegation Bot Screen */}

      <Tab.Screen
        name="DelegationBot"
        component={DelegationBot} // Ensure the component is correctly passed
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/delegationbot.png')} // Local image for the icon
              style={{width: 50, height: 50}} // Customize size
            />
          ),
          tabBarLabel: () => null, // Hide the label
        }}
      />

      {/* User Management Screen */}
      <Tab.Screen
        name="Usermanagement"
        component={Usermanagement} // Ensure the component is correctly passed
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/Usermanagementt.png')}
              style={{width: 39.74, height: 39.74}}
            />
          ),
          tabBarLabel: () => null,
        }}
      />

  {/* Task Management Screen */}
      <Tab.Screen
        name="Taskmanagement"
        component={TaskManagement} // Ensure the component is correctly passed
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/Taskmanagement.png')} // Local image for the icon
              style={{width: 39.74, height: 39.74}}// Customize size
              // Customize size
            />
          ),
          tabBarLabel: () => null, // Hide the label
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabnavigation;
