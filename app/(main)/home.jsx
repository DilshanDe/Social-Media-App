import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import Button from '../../components/Button'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { hp, wp } from '../../helpers/comman'
import { theme } from '../../constants/theme'
import { Pressable } from 'react-native'
import Icon from '../../assets/icons'
import { useRouter } from 'expo-router'
import Avatar from '../../components/Avatar'
import User from '../../assets/icons/User'


const Home = () => {
    const{ user,setAuth}=useAuth();
    const router=useRouter();

   // console.log('user:',user);

    //const onLogut= async()=>{
      //  setAuth(null);
       // const{error}= await supabase.auth.signOut();
      //  if(error){
       //     Alert.alert('Sign out','Error signing out')
      //  }

    //}
  return (
    <ScreenWrapper bg='white'>
        <View style={styles.container}>
          {/*header*/}
          <View style={styles.header}>
            <Text style={styles.title}>PickUp</Text>
            <View style={styles.icons}>
              <Pressable onPress={()=>router.push('notification')}>
               <Icon  name='heart'size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
                
              </Pressable >
              <Pressable onPress={()=>router.push('newPost')}>
               <Icon  name='plus'size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
                
              </Pressable>
              <Pressable onPress={()=>router.push('profile')}>
               <Avatar
                uri={user?.image}
                size={hp(4.3)}
                rounded={theme.radius.sm}
                style={{borderWidth:2}}
               
               />
                
              </Pressable>
            </View>
          </View>

        </View>
     
      {/*<Button title='logout'onPress={onLogut}/>*/}
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous', 
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
})