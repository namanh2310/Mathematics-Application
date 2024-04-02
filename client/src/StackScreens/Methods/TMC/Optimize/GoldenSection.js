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
import {useRoute} from '@react-navigation/native';

import Template from '../../../../Components/Template';
import {goldenSectionMethod} from '../../../../apis/optimize.api';

const GoldenSection = ({navigation}) => {
  const route = useRoute();
  const scan_funct = route.params.function;
  const scan_type = route.params.type;
  const [input, setInput] = useState({
    function: scan_funct
      ? replaceFunction(scan_funct)
      : 'x^5 - 5x^4 + x^3- 6x^2+7x+10',
    type: scan_type ? scan_type : '',
  });
  const [type, setType] = useState(scan_type ? scan_type : null);
  const [result, setResult] = useState(
    scan_funct ? replaceFunction(scan_funct) : 'x^5 - 5x^4 + x^3- 6x^2+7x+10',
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const replaceFunction = funct => {
    return funct.replace(/[{}]/g, '');
  };

  const handleChange = (name, text) => {
    setInput({...input, [name]: text});
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    setTimeout(() => {
      // After the action is completed, enable the button again
      setDisabled(false);

      // You can also perform additional actions here
    }, 2000);
    await goldenSectionMethod(input)
      .then(res => {
        if (res.data.message) {
          setErrorMessage(res.data.message);
        } else {
          navigation.navigate('Golden Section SOL', {
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
      <Text style={styles.title}>GOLDEN SECTION</Text>
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
            placeholder="xl"
            onChangeText={text => handleChange('xl', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />
          <TextInput
            placeholder="xu"
            onChangeText={text => handleChange('xu', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />
          <TextInput
            placeholder="error"
            onChangeText={text => handleChange('es', text)}
            style={{...styles.inputField, ...styles.variableField}}
          />
        </View>
        <View style={styles.typeFields}>
          <TouchableOpacity
            style={
              type === 'maximum'
                ? {borderWidth: 3, borderColor: '#2874fc', ...styles.type}
                : styles.type
            }
            onPress={() => {
              setType('maximum');
              handleChange('type', 'maximum');
            }}>
            <Text style={styles.typeText}>Maximum</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              type === 'minimum'
                ? {borderWidth: 3, borderColor: '#2874fc', ...styles.type}
                : styles.type
            }
            onPress={() => {
              setType('minimum');
              handleChange('type', 'minimum');
            }}>
            <Text style={styles.typeText}>Minimum</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={disabled}>
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
    paddingLeft: 24,
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
    flex: 0.3,
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

export default GoldenSection;
