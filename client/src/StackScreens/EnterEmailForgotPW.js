// Import necessary components and modules
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Background from '../Components/Background';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight, faBars} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const EnterEmailForgotPW = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleEmail = e => {
    e.preventDefault();
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Auth/verify-reset-pass', {
            email,
          }) //here
          .then(res => {
            if (!res.data.message) {
              navigation.navigate('Verify', {
                otp: res.data,
                emailReset: email,
                type: 'Reset PW',
              });
            } else {
              console.log(res.data.message);
            }
          });
      } catch (error) {
        // if (error.response.status === 500) {
        //   setErrorMessage('Please re-check the input fields');
        // } else if (error.response.status === 404) {
        //   setErrorMessage('Your are disconnecting with network!');
        // }
        console.log(error);
      }
    };
    getData();
  };
  return (
    <View style={styles.container}>
      <Background type={'Register'} />
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/6146/6146586.png',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Are you forgot your password?</Text>
      <Text style={styles.subtitle}>
        Enter your email to get the notification for reseting your password!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleEmail}>
        {/* <Text style={styles.buttonText}>Reset Password</Text> */}
        <FontAwesomeIcon
          style={styles.icon}
          icon={faArrowRight}
          size={32}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8252E7',
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 16,
    color: '#B891FF',
  },
  input: {
    width: '100%',
    height: 54,
    borderColor: '#8252E7',
    borderWidth: 3,
    borderRadius: 8,
    marginVertical: 24,
    padding: 8,
    fontSize: 16,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {},
});

export default EnterEmailForgotPW;
