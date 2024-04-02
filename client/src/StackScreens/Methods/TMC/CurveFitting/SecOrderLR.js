import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';
import Header from '../../../../Components/Header';
import Template from '../../../../Components/Template';
import {secOrderLRMethod} from '../../../../apis/curveFit.api';

const SecOrderLR = ({navigation}) => {
  const [input, setInput] = useState();
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (name, text) => {
    setInput({...input, [name]: text.split(',').map(parseFloat)});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await secOrderLRMethod(input)
      .then(res => {
        if (res.data.message) {
          setErrorMessage(res.data.message);
        } else {
          navigation.navigate('2nd-order Regression SOL', {
            data: res.data,
            steps: res.data.step,
          });
          setErrorMessage(null);
        }
      })
      .catch(error => {
        if (error.response.status === 500) {
          setErrorMessage('Please re-check the input fields');
        } else if (error.response.status === 404) {
          setErrorMessage('Your are disconnecting with network!');
        }
      });
  };

  return (
    <Template>
      <Text style={styles.title}>2nd ORDER LINEAR REGRESSION</Text>
      <View style={styles.input}>
        <View style={styles.functionField}>
          <View style={styles.firstValue}>
            <Text style={styles.noteText}>
              Provide X values seperated by commas
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder="1,2,3,..."
              onChangeText={text => handleChange('x', text)}
              style={styles.inputField}
              defaultValue="0,1,2,3,4,5"
            />
          </View>
          <View style={styles.firstValue}>
            <Text style={styles.noteText}>
              Provide Y values seperated by commas
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder="4,5,6,..."
              onChangeText={text => handleChange('y', text)}
              style={styles.inputField}
              defaultValue="2.1, 7.7, 13.6, 27.2, 40.9, 61.1"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Calculate</Text>
      </TouchableOpacity>
      <Text style={{fontFamily: 'Kanit-Medium', color: 'red', fontSize: 16}}>
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

export default SecOrderLR;
