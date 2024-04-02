import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Background from '../Components/Background';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux'; // Import useDispatch
import {registerRequest} from '../Redux/actions/index';

const Verify = ({navigation}) => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [error, setError] = useState(null);
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
  const route = useRoute();
  const dispatch = useDispatch(); // Get the dispatch function from redux

  const gen_otp = route.params.otp;
  const emailRegister = route.params.emailRegister;
  const emailReset = route.params.emailReset;
  const passwordRegister = route.params.passwordRegister;
  const firstName = route.params.firstName;
  const lastName = route.params.lastName;
  const role = route.params.role;
  const type = route.params.type;

  const handleRegister = () => {
    dispatch(
      registerRequest({
        // otp,
        emailRegister,
        passwordRegister,
        lastName,
        firstName,
        role,
      }),
    );
  };

  const handleOTPChange = (index, value) => {
    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to the next input
    if (index < 4 - 1 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = index => {
    const newOtp = [...otp];
    newOtp[index] = '';

    setOtp(newOtp);

    // Move to the previous input
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    const isInputValid = otp.every(digit => digit !== '');
    console.log(otp);
    console.log(gen_otp);
    if (isInputValid) {
      if (type !== 'Reset PW') {
        if (otp.join('') === gen_otp) {
          handleRegister();
          navigation.navigate('TabNavigator');
        } else {
          setError('OTP is not valid');
        }
      } else {
        if (otp.join('') === gen_otp) {
          navigation.navigate('Reset PW', {emailReset});
        } else {
          setError('OTP is not valid');
        }
      }
    }
  }, [otp]);

  return (
    <View style={styles.container}>
      <Background type={'Register'} />

      <Text style={styles.title}>Enter the OTP code sent to your email:</Text>

      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={value => handleOTPChange(index, value)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>
      <Text style={styles.errorDisplay}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8252E7',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderWidth: 3,
    borderColor: '#8252E7',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  errorDisplay: {
    fontSize: 16,
    fontWeight: 800,
    color: 'red',
  },
});

export default Verify;
