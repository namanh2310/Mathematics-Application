import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {auth$} from '../Redux/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {registerRequest, loginRequest} from '../Redux/actions/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Background from '../Components/Background';
import axios from 'axios';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const auth = useSelector(auth$);

  const handleSubmit = e => {
    e.preventDefault();
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Auth/verify', {
            emailRegister,
            passwordRegister,
          }) //here
          .then(res => {
            if (!res.data.message) {
              navigation.navigate('Verify', {
                otp: res.data,
                emailRegister,
                passwordRegister,
                lastName,
                firstName,
                role,
                type: 'Register',
              });
            } else {
              setError(res.data.message);
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };

  return (
    <KeyboardAvoidingView
      behavior={'absolute'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
      style={styles.container}>
      <Background type={'Register'} />
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcomeTitle}>
          <Text style={styles.welcomeTextBold}>Register Now</Text>
          <Text style={styles.subWelcomeTextBold}>and do our part!</Text>
        </View>

        <View style={styles.inputField}>
          <View style={styles.userNameField}>
            <TextInput
              style={styles.firstNameInput}
              placeholder="First name"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              style={styles.lastNameInput}
              placeholder="Last name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
          <View style={styles.jobInput}>
            <TouchableOpacity
              style={
                role === 'Student'
                  ? [styles.jobStudent, {backgroundColor: '#8252E7'}]
                  : styles.jobStudent
              }
              onPress={() => setRole('Student')}>
              <Text style={styles.jobText}>Student</Text>
            </TouchableOpacity>
            {/* <View></View> */}
            <TouchableOpacity
              style={
                role === 'Teacher'
                  ? [styles.jobTeacher, {backgroundColor: '#8252E7'}]
                  : styles.jobTeacher
              }
              onPress={() => setRole('Teacher')}>
              <Text style={styles.jobText}>Teacher</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={emailRegister}
            onChangeText={text => setEmailRegister(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={passwordRegister}
            onChangeText={text => setPasswordRegister(text)}
          />

          {/* <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={passwordRegister}
            onChangeText={text => setPasswordRegister(text)}
          /> */}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.errorDisplay}>{error}</Text>
          <View style={styles.registerTitle}>
            <Text style={styles.registerTextNormal}>You have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
              <Text style={styles.registerTextHighlight}>Login now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#92c6fc',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  welcomeTitle: {
    width: '70%',
    gap: 0,
    marginTop: '4%',
    position: 'relative',
  },
  welcomeTextBold: {
    fontFamily: 'Kanit-Medium',
    fontSize: 42,
    textAlign: 'center',
    color: '#8252E7',
  },
  subWelcomeTextBold: {
    fontFamily: 'Kanit-Medium',
    fontSize: 24,
    textAlign: 'center',
    color: '#8252E7',
    opacity: 0.5,
  },
  welcomeText: {
    fontFamily: 'Kanit-Light',
    fontSize: 28,
    textAlign: 'center',
    color: '#f8f8ff',
  },
  inputField: {
    width: '88%',
    gap: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  jobInput: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#92c6fc',
    // paddingVertical: 16,
    // paddingHorizontal: 32,
    borderRadius: 36,
    justifyContent: 'space-around',
    height: 46,
    overflow: 'hidden',
  },
  jobText: {
    color: 'white',
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
  },
  jobStudent: {
    width: '50%',
    borderRightColor: '#fff',
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobTeacher: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameField: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstNameInput: {
    width: '48%',
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 18,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderTopLeftRadius: 36,
    borderBottomLeftRadius: 36,
  },
  lastNameInput: {
    width: '48%',
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 18,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderTopRightRadius: 36,
    borderBottomRightRadius: 36,
  },

  input: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 18,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 36,
  },
  forgotPass: {
    width: '100%',
    alignItems: 'center',
  },
  forgotPassText: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    width: '100%',
    height: 64,
    backgroundColor: '#6b77d0',
    justifyContent: 'center',
    borderRadius: 36,
  },
  buttonText: {
    fontFamily: 'Kanit-Medium',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 500,
    color: 'white',
  },
  registerTitle: {
    flexDirection: 'row',
    gap: 6,
  },
  registerTextNormal: {
    fontFamily: 'Kanit-Light',
    fontSize: 16,
    color: '#000',
  },
  registerTextHighlight: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
    color: '#6b77d0',
  },
  errorDisplay: {
    fontSize: 16,
    fontWeight: 800,
    color: 'red',
  },
});

export default Register;
