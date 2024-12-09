import React from 'react';
import { View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';

export default function Index() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Add StatusBar with dark content */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Loading />
    </View>
  );
}

