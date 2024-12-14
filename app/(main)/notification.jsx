import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { fetchNotifications } from '../../Services/notificationService';
import { useAuth } from '../../context/AuthContext';

const Notification = () => {
  const[notificatins,setNotifications]=useState([]);
  const{user}=useAuth();

  useEffect(()=>{
    getNotifications();

  },[]);

  const getNotifications= async()=>{
    let res = await fetchNotifications(user.id);
    console.log("notifications:",res);
  }
  return (
    <View>
      <Text>Notification</Text>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})