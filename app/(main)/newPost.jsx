import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { hp, wp } from '../../helpers/comman'
import { theme } from '../../constants/theme'
import { ScrollView } from 'react-native'
import Avatar from '../../components/Avatar'
import { useAuth } from '../../context/AuthContext'
import RichTextEditor from '../../components/RichTextEditor'
import { useRouter } from 'expo-router'
import { useState } from 'react'


const NewPost = () => {
  const{user}= useAuth();
  const bodyRef=useRef("");
  const editorRef=useRef(null);
  const router=useRouter();
  const[loading,setLoading]=useState(false);
  const[file,setFile]=useState(file);
  return (
    <ScreenWrapper bg='white'>
      <View style={styles.container}>
          <Header title="Create Post"/>
          <ScrollView contentContainerStyle={{gap:20}}>
            {/*avatar*/}
            <View style={styles.header}>
              <Avatar
              uri={user?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
              />
              <View style={{gap:2}}>
                <Text style={styles.username}>
                  {
                    user && user.name
                  }
                </Text>
                <Text style={styles.publicText}>
                  Public
                </Text>
              </View>
            </View>
            <View style={styles.textEditor}>
              <RichTextEditor editorRef={editorRef} onChange={body=>bodyRef.current=body}/>
            </View>
          </ScrollView>

      </View>
    
    </ScreenWrapper>
  )
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:12,
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: '600',
    color: '#000',
  },
  publicText:{
    fontSize:hp(1.7),
    fontWeight:theme.fonts.medium,
    color:theme.colors.textLight,

  },
  textEditor:{

  },
  title: {
    color: theme.colors.text,
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold,
    textAlign:'center',
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