import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import Header from '../../../../Components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { multiOrderLRMethod } from '../../../../apis/curveFit.api';

const MulOrderLR = ({ navigation }) => {
  const [input, setInput] = useState();
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (name, text) => {
    setInput({ ...input, [name]: text.split(',').map(parseFloat) });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await multiOrderLRMethod(input).then(res => {
      if (res.data.message) {
        setErrorMessage(res.data.message);
      } else {
        navigation.navigate('Multi-order Regression SOL', {
          data: res.data,
        });
        setErrorMessage(null);
      }
    }).catch(error => {
      if (error.response.status === 500) {
        setErrorMessage('Please re-check the input fields');
      } else if (error.response.status === 404) {
        setErrorMessage('Your are disconnecting with network!');
      }
    })
  };

  return (
    <>
      <Header nav={'TMCList'} />
      <KeyboardAwareScrollView
        style={styles.container}
        behavior={'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}>
        <Text style={styles.title}>MULTI-ORDER LINEAR REGRESSION</Text>
        <View style={styles.input}>
          <View style={styles.functionField}>
            <View style={styles.firstValue}>
              <Text style={styles.noteText}>
                Provide x1 values seperated by commas
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={2}
                placeholder="1,2,3,..."
                onChangeText={text => handleChange('x1', text)}
                style={styles.inputField}
                defaultValue="0,2,2.5,1,4,7"
              />
            </View>
            <View style={styles.firstValue}>
              <Text style={styles.noteText}>
                Provide x2 values seperated by commas
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={2}
                placeholder="4,5,6,..."
                onChangeText={text => handleChange('x2', text)}
                style={styles.inputField}
                defaultValue="0,1,2,3,6,2"
              />
            </View>
            <View style={styles.firstValue}>
              <Text style={styles.noteText}>
                Provide y values seperated by commas
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={2}
                placeholder="7,8,9,..."
                onChangeText={text => handleChange('y', text)}
                style={styles.inputField}
                defaultValue="5,10,9,0,3,27"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Calculate</Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Kanit-Medium', color: 'red', fontSize: 16 }}>
          {errorMessage}
        </Text>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },
  title: {
    fontFamily: 'Candal-Regular',
    color: 'black',
    fontSize: 26,
  },
  input: {
    marginBottom: '5%',
    marginTop: '5%',
  },
  functionField: {
    // flex: 1,
  },
  inputField: {
    borderWidth: 3,
    borderColor: '#2874fc',
    borderRadius: 12,
    paddingLeft: 16,
    marginBottom: '5%',
    fontSize: 22,
    textAlignVertical: 'top',
  },
  noteText: {
    fontSize: 18,
    color: 'black',
    marginBottom: '1%',
  },

  submitButton: {
    height: 48,
    backgroundColor: '#2874fc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitText: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'white',
  },
});

export default MulOrderLR;
