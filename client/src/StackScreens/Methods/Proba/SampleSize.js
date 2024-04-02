import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useState } from 'react';

import Template from '../../../Components/Template';
import { sampleSizeMethod } from '../../../apis/proba.api';

const SampleSize = ({ navigation }) => {
  const handleSubmit = async e => {
    e.preventDefault();
    await sampleSizeMethod(input).then(res => {
      if (res.data.message) {
        setErrorMessage(res.data.message);
      } else {
        navigation.navigate('Sample Size SOL', {
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
  const [input, setInput] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [result, setResult] = useState(null);
  const handleChange = (name, text) => {
    setInput({ ...input, N: 969696, [name]: text });
  };
  return (
    <Template>
      <Text style={styles.title}>SAMPLE SIZE CALCULATOR</Text>
      <View style={styles.input}>
        <View style={styles.functionField}>
          {/* <Text style={styles.noteText}>Probability of A:</Text> */}
          <View style={styles.firstValue}>
            <View style={styles.inputContainer}>
              <Text style={styles.noteText}>Confidence Level:</Text>
              <TextInput
                onChangeText={text => handleChange('lv', text)}
                style={styles.inputField}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.noteText}>Margin Error:</Text>
              <TextInput
                onChangeText={text => handleChange('e', text)}
                style={styles.inputField}
              />
            </View>
          </View>

          {/* <Text style={styles.noteText}>Probability of B:</Text> */}
          <View style={styles.firstValue}>
            <View style={styles.inputContainer}>
              <Text style={styles.noteText}>Pop. Proportion:</Text>
              <TextInput
                onChangeText={text => handleChange('p', text)}
                style={styles.inputField}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.noteText}>Population Size:</Text>
              <TextInput
                onChangeText={text => handleChange('N', text)}
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

export default SampleSize;
