import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen'
import { LinearGradient } from 'expo-linear-gradient';



const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.16.110:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error('Invalid email or password.');
      }

      // Check if the response contains a token or other authentication data
      const data = await response.json();
      const token = data.token;

      if (token) {
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', token);
        onLogin();
      } else {
        setError('An error occurred during login.');
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container1}>
      <LinearGradient
        colors={['#201c39', '#000000']}
        style={styles.viewcontainer}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}>
          <View style={styles.viewcontent}>
            <View style={styles.viewform}>
              <View style={styles.viewfield}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  placeholderTextColor={'black'}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.viewfield}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={'black'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>SIGN IN</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.error}>{error}</Text>
            </View>
          </View>
        <View style={styles.screenBackground}>
          <LinearGradient
            colors={['#4cceac', '#5D54A4']}
            style={styles.screenBackgroundShape4}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}>
          </LinearGradient>
          <LinearGradient
            colors={['#4cceac', '#5D54A4']}
            style={styles.screenBackgroundShape3}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
          </LinearGradient>
          <LinearGradient
            colors={['#4cceac', '#5D54A4']}
            style={styles.screenBackgroundShape2}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}>
          </LinearGradient>
          <View style={styles.screenBackgroundShape1}></View>
        </View>
      </LinearGradient>

    </View>
  );
};

const HomePage = ({ onLogout }) => {
  const handleLogout = async () => {
    // Remove the token from AsyncStorage
    await AsyncStorage.removeItem('token');
    // Perform logout logic here
    onLogout();
  };

  return (
    <View style={styles.container2}>
      <HomeScreen />
      <TouchableOpacity style={styles.logoutbutton} onPress={handleLogout}>
        <Text style={styles.logoutbuttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there is a token in AsyncStorage
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <HomePage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141b2d'
  },
  container2:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative'
  },
  logoutbutton:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4cceac',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 20
  },
  logoutbuttonText:{
    color: '#141b2d',
    fontSize: 16,
    fontWeight: 'bold'
  },
  viewcontainer:{
    position: 'relative',
    width: '80%',
    height: '60%',
    shadowColor: '#4cceac',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent:'center',
    alignItems: 'center',
  },
  viewcontent:{
    zIndex: 1,
    position: 'relative',
  },
  viewfield:{
    position: 'relative'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginTop: 20,
    marginRight: 80,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D4D3E8',
    borderStyle: 'solid',
    width: '80%'
  },
  button: {
    fontSize: 14,
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D4D3E8',
    borderStyle: 'solid',
    width: '38%'
  },
  buttonText: {
    color: '#4C489D',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  screenBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
  screenBackgroundShape1: {
    transform: [{rotate: '45deg'}],
    position: 'absolute',
    top: -20,
    right: 60,
    width: 420,
    height: 360,
    borderTopRightRadius: 50,
    backgroundColor: '#FFF',
  },
  screenBackgroundShape2: {
    position: 'absolute',
    transform: [{rotate: '45deg'}],
    top: -172,
    right: -20,
    width: 160,
    height: 220,
    borderRadius: 32,
    backgroundColor: '#BABAE6',
  },
  screenBackgroundShape3: {
    position: 'absolute',
    transform: [{rotate: '135deg'}],
    top: 80,
    left: 10,
    width: 500,
    height: 170,
    borderRadius: 32,
    backgroundColor: '#4cceac',
  },
  screenBackgroundShape4: {
    position: 'absolute',
    transform: [{rotate: '45deg'}],
    top: 380,
    right: 50,
    width: 200,
    height: 400,
    borderRadius: 40,
    backgroundColor: '#BABAE6',
  },
});

export default App;
