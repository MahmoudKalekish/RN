import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <View style={styles.screen__content}>
          <Formik initialValues={{ email: "", password: "" }} onSubmit={handleLogin}>
            {({ handleChange, handleSubmit, values }) => (
              <>
                <StatusBar style="auto" />
                <View style={styles.login__field}>
                  <TextInput
                    style={styles.login__input}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={handleChange("email")}
                    value={values.email}
                  />
                </View>
                <View style={styles.login__field}>
                  <TextInput
                    style={styles.login__input}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    value={values.password}
                  />
                </View>
                <TouchableOpacity style={styles.buttonLogin__submit} onPress={handleSubmit}>
                  <Text style={styles.button__text}>LOGIN</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.screen__background}>
          <View style={styles.screen__background__shape4}></View>
          <View style={styles.screen__background__shape3}></View>
          <View style={styles.screen__background__shape2}></View>
          <View style={styles.screen__background__shape1}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: '100vh',
    overflowY: 'hidden',
    background: '#141b2d',
  },
  screen: {		
    background: 'linear-gradient(90deg, #201c39, #000000)',	
    position: 'relative',
    // height: '600px',
    // width: '500px',
    boxShadow: '0px 0px 10px #4cceac'
  },
  screen__content: {
    zIndex: 1,
    position: 'relative',	
    // height: '100%',
  },
  screen__background: {		
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // width: 200,
    // height: 200,
    backgroundColor: '#f00',
    borderRadius: 0,
    overflow: 'hidden',
  },
  
  screen__background__shape1: {
    // height: '520px',
    // width: '520px',
    background: '#FFF',
    // top: '-50px',
    // right: '120px',
    // borderRadius: '0 72px 0 0',
    transform: 'rotate(45deg)',
    position: 'absolute',
  },
  
  screen__background__shape2: {
    // height: '220px',
    // width: '220px',
    background: 'linear-gradient(270deg, #4cceac, #5D54A4 )',
    // top: '-172px',
    // right: 0,
    // borderRadius: '32px',
    transform: 'rotate(45deg)',
    position: 'absolute',
  },
  
  screen__background__shape3: {
    // height: '540px',
    // width: '190px',
    background: 'linear-gradient(270deg, #5D54A4, #4cceac)',
    // top: '-24px',
    // right: 0,
    // borderRadius: '32px',
    transform: 'rotate(45deg)',
    position: 'absolute',
  },
  
  screen__background__shape4: {
    // height: '400px',
    // width: '200px',
    background: 'linear-gradient(270deg, #4cceac, #5D54A4)',
    // top: '420px',
    // right: '50px',
    // borderRadius: '60px',
    transform: 'rotate(45deg)',
    position: 'absolute',
  },
  
  login: {
    // width: '500px',
    padding: '30px',
    paddingTop: '156px',
  },
  
  login__field: {
    position: 'relative',
  },
  
  login__icon: {
    position: 'absolute',
    top: '30px',
    color: '#7875B5',
  },
  
  login__input: {
    border: 'none',
    background: 'none',
    padding: '10px',
    paddingLeft: '24px',
    fontWeight: '700',
    // width: '75%',
    transition: '.2s',
  },
  
  login__submit: {
    background: '#fff',
    fontSize: '14px',
    marginTop: '30px',
    marginLeft: '25px',
    padding: '16px 20px',
    borderRadius: '5px',
    border: '1px solid #D4D3E8',
    textTransform: 'uppercase',
    fontWeight: '700',
    flex: 1,
    alignItems: 'center',
    color: '#4C489D',
    cursor: 'pointer',
    transition: '.2s',
  },
});