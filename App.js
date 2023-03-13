import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from './scenes/dashboard/index';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

// async function loginUser(credentials) {
//   return fetch('http://localhost:8000/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // In React Native, use AsyncStorage to save data locally
//     // See https://reactnative.dev/docs/asyncstorage
//     return data;
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     throw error;
//   });
// }

// const navigation = useNavigation();





export default function App() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await loginUser({
        username,
        password
      });
      // Save token and is_super value in app state or AsyncStorage
      console.log(response.token, response.is_super);
      NavigationContainer.navigate('Dashboard'); // Navigate to Dashboard after successful login
    } catch (error) {
      console.error('Error:', error);
      alert('Error: Invalid Username or Password');
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {() => (
            <View>
              <Text>Username</Text>
              <TextInput
                value={username}
                onChangeText={setUserName}
              />
              <Text>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          )}
        </Stack.Screen>
        {/* Define Dashboard component */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
