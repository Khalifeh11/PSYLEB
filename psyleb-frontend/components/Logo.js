import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import LogoSvg from '../assets/logo.svg'
import LogoPng from '../assets/logo.png'
import { SvgUri } from 'react-native-svg'
import { SvgXml } from 'react-native-svg';



const Logo = () => {
  return (
    <View style={styles.logo}>
        {/* <LogoSvg width={100} height={100} fill="#000"/> */}
        {/* <SvgUri width={100} height={100} uri='../assets/logo.svg'/> */}
        {/* <SvgXml width="200" height="200" xml={LogoSvg} />; */}
        <Image source={require('../assets/logo.png')}/>
    </View>
  )
}
const styles = StyleSheet.create({
    logo : {
        margin: 10
    }
})
export default Logo