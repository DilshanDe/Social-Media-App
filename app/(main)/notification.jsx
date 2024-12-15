import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { fetchNotifications } from '../../Services/notificationService';
import { useAuth } from '../../context/AuthContext';
import { hp, wp } from '../../helpers/comman';
import ScreenWrapper from '../../components/ScreenWrapper';
import { ScrollView } from 'react-native';
import { router, useRouter } from 'expo-router';
import NotificationsItem from '../../components/NotificationsItem';
import Header from '../../components/Header';

const Notification = () => {
  const[notificatins,setNotifications]=useState([]);
  const{user}=useAuth();
  const router=useRouter();

  useEffect(()=>{
    getNotifications();

  },[]);

  const getNotifications= async()=>{
    let res = await fetchNotifications(user.id);
    if(res.success) setNotifications(res.data);
  }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title='Notifications'/>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listStyle}>
          {
            notificatins.map(item=>{
              return(
                <NotificationsItem
                item={item}
                key={item?.id}
                router={router}
                />
              )
            })
          }
          {
            notificatins.length==0 && (
              <Text style={styles.noData}>No Notifications yet</Text>
            )
          }
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  listStyle: {
    paddingVertical: 20,
    gap: 10,
  },
  noData: {
    fontSize: hp(1.8),
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  
})