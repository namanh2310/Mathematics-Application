import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useState } from 'react';

import Template from '../../../Components/Template';
import { zScoreMethod } from '../../../apis/proba.api';

const ZScore = ({ navigation }) => {
  const [input, setInput] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (name, text) => {
    setInput({ ...input, [name]: text });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await zScoreMethod(input).then(res => {
      if (res.data.message) {
        setErrorMessage(res.data.message);
      } else {
        navigation.navigate('Z-score SOL', {
          data: res.data,
          input: input,
        });
        setErrorMessage(null);
      }
    }).catch(error => {
      if (error.response.status === 500) {
        setErrorMessage('Please re-check the input fields');
      } else if (error.response.status === 404) {
        setErrorMessage('Your are disconnecting with network!');
      }
    });
  };

  return (
    <Template>
      <Text style={styles.title}>Z-SCORE CALCULATOR</Text>
      <View style={styles.input}>
        <View style={styles.functionField}>
          {/* <Text style={styles.noteText}>Probability of A:</Text> */}
          <View style={styles.firstValue}>
            <View style={styles.inputContainer}>
              <Text style={styles.noteText}>Raw Score:</Text>
              <TextInput
                onChangeText={text => handleChange('x', text)}
                style={styles.inputField}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.noteText}>Population Mean:</Text>
              <TextInput
                onChangeText={text => handleChange('u', text)}
                style={styles.inputField}
              />
            </View>
          </View>

          {/* <Text style={styles.noteText}>Probability of B:</Text> */}
          <View style={styles.firstValue}>
            <View style={styles.inputContainer}>
              <Text style={styles.noteText}>Standard Deviation:</Text>
              <TextInput
                onChangeText={text => handleChange('o', text)}
                style={styles.inputField}
              />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Calculate</Text>
      </TouchableOpacity>
      <Text style={{ fontFamily: 'Kanit-Medium', color: 'red', fontSize: 16 }}>
        {errorMessage}
      </Text>
    </Template>
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
    paddingLeft: 24,
    marginBottom: '5%',
    fontSize: 22,
    width: '100%',
  },

  firstValue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondValue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '47%',
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

export default ZScore;
