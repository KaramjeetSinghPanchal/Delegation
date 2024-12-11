import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Forgetpassword from '../Screens/Forgetpassword';
import HomeScreen from '../Screens/HomeScreen';
import OTP from '../Screens/OTP';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}>
          <Stack.Screen
            name="HomeScreen"
            options={{
              animation: 'fade',
            }}
            component={HomeScreen}
          />
          <Stack.Screen name="Forgetpassword" component={Forgetpassword} />

          <Stack.Screen name="OTP" component={OTP} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
