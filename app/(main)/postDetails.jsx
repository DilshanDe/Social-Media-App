import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react';
import { fetchPostsDetails } from '../../Services/postService';

const PostDetails = () => {
   const{postId}= useLocalSearchParams();
   console.log('got the post id:',postId)

   const[post,setPost]=useState(null);

   useEffect(()=>{
    getPostDetails();

   },[]);

   const getPostDetails=async()=>{
    //fetch post detais
    let res =await fetchPostsDetails(postId);
   }
  return (
    <View>
      <Text>PostDetails</Text>
    </View>
  )
}

export default PostDetails

const styles = StyleSheet.create({})