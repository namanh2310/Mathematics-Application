import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

import Template from '../../../../Components/Template';
import {simpson13Method} from '../../../../apis/diffInt.api';

const Simpson13Rule = ({navigation}) => {
  const [input, setInput] = useState({
    function: '0.2+25x-200x^2+675x^3-900x^4+400x^5',
  });
  const [result, setResult] = useState('0.2+25x-200x^2+675x^3-900x^4+400x^5');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (name, text) => {
    setInput({...input, [name]: text});
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await simpson13Method(input)
      .then(res => {
        if (res.data.message) {
          setErrorMessage(res.data.message);
        } else {
          navigation.navigate('Simpson 1/3 Rule SOL', {
            data: res.data.data,
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
      <Text style={styles.title}>SIMPSON 1/3 RULE</Text>
      <View style={styles.input}>
        <View style={styles.functionField}>
          <TextInput
            defaultValue={result}
            placeholder="Function"
            onChangeText={text => handleChange('function', text)}
            style={styles.inputField}
          />
        </View>
        <View style={styles.variableFields}>
          <TextInput
            placeholder="a"
            onChangeText={text => handleChange('a', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />
          <TextInput
            placeholder="b"
            onChangeText={text => handleChange('b', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Calculate</Text>
      </TouchableOpacity>

      <Text style={{fontFamily: 'Kanit-Medium', color: 'red', fontSize: 16}}>
        {errorMessage}
      </Text>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: '0%',
          right: '0%',
        }}
        onPress={toggleModal}>
        <FontAwesomeIcon icon={faQuestionCircle} size={48} color="#b497f0" />
      </TouchableOpacity>
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
    fontSize: 28,
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
  },
  variableFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
  },
  variableField: {
    flex: 0.48,
  },
  submitButton: {
    height: 48,
    backgroundColor: '#2874fc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    flex: 0.48,
    height: 48,
    backgroundColor: '#28f1fc',
    justifyContent: 'center',
    borderRadius: 12,
  },
  typeText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  submitText: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'white',
  },
});

export default Simpson13Rule;
