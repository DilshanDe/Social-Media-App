import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Index</Text>
      <Button title="Welcome" onPress={() => navigation.navigate('welcome')} />
    </View>
  );
}
