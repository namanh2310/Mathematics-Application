import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useState } from 'react';

import Template from '../../../Components/Template';
import { proIndependMethod } from '../../../apis/proba.api';

const ProbaIndepend = ({ navigation }) => {
  const [input, setInput] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (name, text) => {
    setInput({ ...input, [name]: text });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await proIndependMethod(input).then((res) => {
      if (res.data.message) {
        setErrorMessage(res.data.message);
      } else {
        navigation.navigate('Independent Events SOL', {
          data: res.data,
          pA: input.A,
          pB: input.B,
          timeA: input.timeA,
          timeB: input.timeB,
        });
        setErrorMessage(null);
      }
    }).catch((error) => {
      if (error.response.status === 500) {
        setErrorMessage('Please re-check the input fields');
      } else if (error.response.status === 404) {
        setErrorMessage('Your are disconnecting with network!');
      }
    });
  };

  return (
    <Template>
      <Text style={styles.title}>INDEPENDENT EVENTS</Text>
      <View style={styles.input}>
        <View style={styles.functionField}>
          <Text style={styles.noteText}>Probability of A:</Text>
          <View style={styles.firstValue}>
            <TextInput
              placeholder="P(A)"
              onChangeText={text => handleChange('A', text)}
              style={styles.inputField}
            />
            <TextInput
              placeholder="times"
              onChangeText={text => handleChange('timeA', text)}
              style={styles.inputField}
            />
          </View>

          <Text style={styles.noteText}>Probability of B:</Text>
          <View style={styles.secondValue}>
            <TextInput
              placeholder="P(B)"
              onChangeText={text => handleChange('B', text)}
              style={styles.inputField}
            />
            <TextInput
              placeholder="times"
              onChangeText={text => handleChange('timeB', text)}
              style={styles.inputField}
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
    width: '47%',
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

export default ProbaIndepend;
