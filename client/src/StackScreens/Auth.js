import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {auth$} from '../Redux/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {registerRequest, loginRequest} from '../Redux/actions/index';
import Background from '../Components/Background';
import MathView, {MathText} from 'react-native-math-view';

const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const [emailSignIn, setEmailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [status, setStatus] = useState('Login');
  const [error, setError] = useState(null);
  const auth = useSelector(auth$);

  useEffect(() => {
    auth.isLogin && navigation.navigate('TabNavigator');
  }, [auth]);

  const handleRegister = () => {
    dispatch(
      registerRequest({
        emailRegister,
        passwordRegister,
      }),
    );
  };

  const handleLogin = () => {
    dispatch(
      loginRequest({
        emailSignIn,
        passwordSignIn,
      }),
    );
    // console.log(auth.isLogin);
    // auth.isLogin &&
    //
    navigation.navigate('TabNavigator');
    if (!auth.isLogin) {
      setError('Invalid email or password, please try again!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
      style={styles.container}>
      {/* <MathText
        style={styles.mathText}
        value={`\\(\\sum \\)`}
        direction="ltr"
      /> */}
      <Background type={'Login'} />
      <View style={styles.welcomeTitle}>
        <Text style={styles.welcomeTextBold}>
          {/* {status === 'Login' ? 'AiMA!' : 'Register Now!'} */}
          <Text style={{color: '#f7f7f7'}}>A</Text>
          <Text>iMA</Text>
        </Text>
      </View>

      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={emailSignIn}
          onChangeText={text => setEmailSignIn(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={passwordSignIn}
          onChangeText={text => setPasswordSignIn(text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.errorDisplay}>{error}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Enter Email Forgot PW')}
          style={styles.forgotPass}>
          <Text style={styles.forgotPassText}>Forgot Password</Text>
        </TouchableOpacity>
        <View style={styles.registerTitle}>
          <Text style={styles.registerTextNormal}>Not a memeber? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerTextHighlight}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#92c6fc',
  },
  welcomeTitle: {
    width: '70%',
    gap: 12,
    marginTop: '4%',
    position: 'relative',
  },
  welcomeTextBold: {
    fontFamily: 'Kanit-Medium',
    fontSize: 84,
    textAlign: 'center',
    color: '#8252E7',
  },
  welcomeText: {
    fontFamily: 'Kanit-Light',
    fontSize: 28,
    textAlign: 'center',
    color: '#f8f8ff',
  },
  inputField: {
    width: '88%',
    gap: 24,
    alignItems: 'center',
    marginBottom: 24,
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

export default Auth;
