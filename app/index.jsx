import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';

export default function Index() {
  const navigation = useNavigation();

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Loading/>
      
    </View>
  );
}
