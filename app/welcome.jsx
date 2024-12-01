import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { hp, wp } from '../helpers/comman';
import { theme } from '../constants/theme';
import Button from '../components/Button';
import { Pressable } from 'react-native';

export default function Welcome() {
  return (
    <ScreenWrapper bg='white'>
       <StatusBar barStyle="dark-content" backgroundColor="white" />
       <View style={styles.container}>
        {/*welcome*/}
        <Image style={styles.WelcomeImage} resizeMode='contain'source={require('../assets/images/welcome.png')}/>



        {/*title*/}
        <View style={{gap:20}}>
          <Text style={styles.title}>PickUp!</Text>
          <Text style={styles.punchline}>where every thought find a home and every image tells a story. </Text>
        </View>

        {/*footer*/}
        <View style={styles.footer}>
          <Button
          title='Geting Started'
          buttonStyle={{marginHorizontal:wp(3)}}
          onPress={()=>{}}
          
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>
              Already have and Account?
            </Text>
            <Pressable>
              <Text style={[styles.loginText]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>


       </View>
      
    </ScreenWrapper>
  );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-around',
    backgroundColor:"white",
    paddingHorizontal:wp(4)
  },
  WelcomeImage:{
    height:hp(30),
    width:wp(100),
    alignSelf:'center',
  },
  title:{
    color:theme.colors.text,
    fontSize:hp(4),
    textAlign:'center',
    fontWeight:theme.fonts.extraBold,

  },
  punchline:{
    textAlign:"center",
    paddingHorizontal:wp(10),
    fontSize:hp(1.7),
    color:theme.colors.text

  },
  footer:{
    gap:30,
    width:'100%',


  },
  bottomTextContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:6


  }
})

