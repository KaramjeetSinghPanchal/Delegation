import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useEffect} from 'react';
import React from 'react';

const Inputbox = ({style, placeholder, iconn, isPasswordVisible,placeholderTextColor,value,onChangeText}) => {
  return (
    <View
      style={{
        marginLeft: -35,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
      }}>
      <TextInput
        placeholder={placeholder}
        style={style}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
      />
      <View
        style={{
          position: 'absolute',
          right: 10,
          justifyContent: 'center',
          top: 16,
        }}>
        {iconn}
      </View>
    </View>
  );
};

export default Inputbox;

const styles = StyleSheet.create({});
