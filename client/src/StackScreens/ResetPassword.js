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
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
// Dummy function to simulate sending reset link or OTP

const ResetPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [cf_password, setCf_Password] = useState('');
  const route = useRoute();

  const emailReset = route.params.emailReset;
  console.log(emailReset);
  const handleResetPW = e => {
    // e.preventDefault();
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Auth/change-pass', {
            email: emailReset,
            newPassword: password,
          }) //here
          .then(res => {
            if (!res.data.message) {
              navigation.navigate('TabNavigator');
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
          uri: 'https://cdn-icons-png.flaticon.com/512/6146/6146587.png',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>
        I am here to help you reset your password!
      </Text>
      <Text style={styles.subtitle}>Please enter your new password!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your new password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm your new password"
        onChangeText={text => setCf_Password(text)}
        value={cf_password}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          password === cf_password
            ? handleResetPW()
            : console.log('Passwords are unmatch!');
        }}>
        <Text style={styles.buttonText}>Reset Password</Text>
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
    marginVertical: 16,
    padding: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8252E7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetPassword;
