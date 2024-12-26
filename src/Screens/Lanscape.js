import { StyleSheet, Text, View,Dimensions } from 'react-native'
import { useEffect,useState } from 'react';
import React from 'react'

const Lanscape = () => {
    const [screenwidth, setscreenwidth] = useState(
        Dimensions.get('window').width,
      );
      const [screenheight, setscreenheight] = useState(
        Dimensions.get('window').height,
      );
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({window}) => {
          setscreenheight(window.height);
          setscreenwidth(window.width);
        });
        return () => {
          subscription.remove();
        };
      }, []);

      const isLandscape = screenwidth>screenheight;

  return (
    isLandscape
  )
}
    
export default Lanscape 
 
const styles = StyleSheet.create({}) 
 