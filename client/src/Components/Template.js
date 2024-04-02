import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react';
import Header from './Header';
import Syntax from './Syntax';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faQuestion, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

const Template = ({children}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <>
      <Header />
      <View style={styles.container}>
        {children}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: '0%',
            right: '0%',
          }}
          onPress={toggleModal}>
          <FontAwesomeIcon icon={faQuestionCircle} size={48} color="#b497f0" />
        </TouchableOpacity>
        <Syntax visible={modalVisible} onClose={toggleModal} />
      </View>
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
    paddingLeft: 24,
    marginBottom: '5%',
    fontSize: 22,
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

export default Template;
