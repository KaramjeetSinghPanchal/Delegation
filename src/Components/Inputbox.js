import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useEffect } from 'react'
import React from 'react'

const Inputbox = ({style,placeholder}) => {
  useEffect(() => {
  console.warn(placeholder);
  
  }, [])
  return (
    <View style={{marginLeft:-35,paddingTop:10}}>
      <TextInput placeholder={placeholder} style={style} placeholderTextColor="#aaa"  > </TextInput>
    </View>
  )
}

export default Inputbox

const styles = StyleSheet.create({})