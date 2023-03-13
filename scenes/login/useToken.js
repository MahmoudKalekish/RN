
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';


export default function useToken() {
  const [token, setToken] = useState(AsyncStorage.getItem('token'));
  const [isSuper, setIsSuper] = useState(AsyncStorage.getItem('is_super'));

  const saveToken = (userToken, userIsSuper) => {
    AsyncStorage.setItem('token', userToken);
    AsyncStorage.setItem('is_super', userIsSuper);
    setToken(userToken);
    setIsSuper(userIsSuper);
  };

  return {
    token: token || '',
    isSuper: isSuper || '',
    setToken: saveToken,
  };
}