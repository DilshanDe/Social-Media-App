import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text>Index</Text>
      <Button title="Welcome" onPress={() => navigation.navigate('welcome')} />
    </View>
  );
}
