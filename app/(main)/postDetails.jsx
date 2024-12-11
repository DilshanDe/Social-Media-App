import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react';
import { fetchPostsDetails } from '../../Services/postService';
import { hp, wp } from '../../helpers/comman';
import { theme } from '../../constants/theme';
import { ScrollView } from 'react-native';
import PostCard from '../../components/PostCard';
import User from '../../assets/icons/User';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const PostDetails = () => {
   const{postId}= useLocalSearchParams();
   const{user}= useAuth();
   const router=useRouter();
   const[startLoading,setStartLoading]=useState(true);
   console.log('got the post id:',postId)

   const[post,setPost]=useState(null);

   useEffect(()=>{
    getPostDetails();

   },[]);

   const getPostDetails=async()=>{
    //fetch post detais
    let res =await fetchPostsDetails(postId);
    if(res.success) setPost(res.data);
    setStartLoading(false);
   }
   if(startLoading){
    return(
      <View style={styles.center}>
        <Loading/>
      </View>
    )
   }
  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}contentContainerStyle={styles.list}>
        <PostCard
         item={post}
         currentUser={user}
         router={router}
         hasShadow={false}
         showMoreIcon={false}
        />
      </ScrollView>
    </View>
  )
}

export default PostDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: wp(7),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  list: {
    paddingHorizontal: wp(4),
  },
  sendIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    height: hp(5.8),
    width: hp(5.8),
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium,
  },
  loading: {
    height: hp(5.8),
    width: hp(5.8),
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.3 }],
  },
})