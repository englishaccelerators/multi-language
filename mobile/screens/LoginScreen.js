import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View>
      <Text>Login Page</Text>
      <Button title="Go to Dictionary" onPress={() => navigation.navigate('Dictionary')} />
    </View>
  );
}
