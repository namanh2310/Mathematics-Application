import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import Template from '../../../Components/Template';
import { statisticMethod } from '../../../apis/proba.api';

const Statistic = ({ navigation }) => {
  const [input, setInput] = useState();
  const [result, setResult] = useState(null);

  const handleChange = text => {
    setInput(text.split(',').map(parseFloat));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await statisticMethod(input).then((res) => {
      if (res.data.message) {
        setErrorMessage(res.data.message);
      } else {
        navigation.navigate('Statistic Calculator SOL', {
          data: res.data,
          input: input,
          sum: input.join(',').replace(/,/g, '+'),
          product: input.join(',').replace(/,/g, '*'),
          productRes: eval(input.join(',').replace(/,/g, '*')),
        });
        if (error.response.status === 500) {
          setErrorMessage('Please re-check the input fields');
        } else if (error.response.status === 404) {
          setErrorMessage('Your are disconnecting with network!');
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Template>
      <Text style={styles.title}>STATISTIC CALCULATOR</Text>
      <View style={styles.input}>
        <View style={styles.functionField}>
          <View style={styles.firstValue}>
            <Text style={styles.noteText}>
              Provide values seperated by commas
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="P(A)"
              onChangeText={text => handleChange(text)}
              style={styles.inputField}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Calculate</Text>
      </TouchableOpacity>
      {result && <Text>{JSON.stringify(result)}</Text>}
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

export default Statistic;
