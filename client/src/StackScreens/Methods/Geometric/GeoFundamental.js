import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import MathView from 'react-native-math-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { RECTANGLE, SQUARE, TRIANGLE } from '../../../Image';
import Header from '../../../Components/Header';
import { auth$ } from '../../../Redux/selectors';
import { geometricFunction } from '../../../apis/geo.api';

const data = [
  {
    image: SQUARE,
    syntax: 'Square(a)',
    placeholder: 'a',
    geoType: [
      {
        type: 'Area',
        formula: 'a \\cdot a =',
      },
      {
        type: 'Perimemter',
        formula: 'a \\cdot 4 =',
      },
    ],
    nav: 'square',
    length: 1,
    math: input => {
      try {
        return `a = ${input[0]}`;
      } catch (error) {
        console.log(error);
      }
    },
  },
  {
    image: RECTANGLE,
    syntax: 'Rectangle(a, b)',
    placeholder: 'a, b',
    geoType: [
      {
        type: 'Area',
        formula: 'a \\cdot b =',
      },
      {
        type: 'Perimemter',
        formula: '2(a + b) =',
      },
    ],
    nav: 'rectangle',
    length: 2,
    math: input =>
      `a = ${input[0]}, b = ${input[1] !== undefined ? input[1] : ''}`,
  },
  {
    image: TRIANGLE,
    syntax: 'Triangle(a, b, c, h)',
    placeholder: 'a, b, c, h',
    geoType: [
      {
        type: 'Area',
        formula: '(a \\cdot h)/2 =',
      },
      {
        geoName: 'Perimemter',
        formula: 'a + b + c =',
      },
    ],
    nav: 'triangle',
    length: 4,
    math: input =>
      `a = ${input[0]}, b = ${input[1] !== undefined ? input[1] : ''}, c = ${input[2] !== undefined ? input[2] : ''
      }, h = ${input[3] !== undefined ? input[3] : ''}  `,
  },
];

const GeoFundamental = ({ navigation }) => {
  const auth = useSelector(auth$);
  const [check, setCheck] = useState(false);
  const [input, setInput] = useState({});
  const [type, setType] = useState(null);
  const [geometric, setGeometric] = useState('square');

  const filteredData = data.filter(item => item.nav === geometric);

  const mapData = filteredData.map((el, key) => (
    <View key={key} style={styles.containerGeometric}>
      <View style={styles.interactField}>
        <View style={styles.left}>
          <Image
            style={styles.imagee}
            source={{
              uri: el.image,
            }}
          />
          {input.value && check ? (
            <MathView math={el.math(input.value)} />
          ) : (
            <Text style={styles.syntax}>{el.syntax}</Text>
          )}
        </View>
        <View style={styles.right}>
          <TextInput
            placeholder={el.placeholder}
            style={styles.inputField}
            onChangeText={text => {
              handleChange('value', text.split(','));
              setCheck(false);
            }}
          />
          <TouchableOpacity
            onPress={() => setCheck(true)}
            style={styles.checkButton}>
            <FontAwesomeIcon icon={faSquareCheck} color={'#2874fc'} size={36} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.typeField}>
        <TouchableOpacity
          style={
            type === 'Area'
              ? { borderWidth: 3, borderColor: '#2874fc', ...styles.type }
              : styles.type
          }
          onPress={() => {
            setType('Area');
            handleChange('type', 'Area');
          }}>
          <Text style={styles.typeText}>Area</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            type === 'Perimeter'
              ? { borderWidth: 3, borderColor: '#2874fc', ...styles.type }
              : styles.type
          }
          onPress={() => {
            setType('Perimeter');
            handleChange('type', 'Perimeter');
          }}>
          <Text style={styles.typeText}>Perimeter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            type === 'Volume'
              ? { borderWidth: 3, borderColor: '#2874fc', ...styles.type }
              : styles.type
          }
          onPress={() => {
            setType('Volume');
            handleChange('type', 'Volume');
          }}>
          <Text style={styles.typeText}>Volume</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            type === 'Surface area'
              ? { borderWidth: 3, borderColor: '#2874fc', ...styles.type }
              : styles.type
          }
          onPress={() => {
            setType('Surface area');
            handleChange('type', 'Surface area');
          }}>
          <Text style={styles.typeText}>Surface area</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.geoType}>
        <TouchableOpacity
          style={
            geometric === 'square'
              ? { borderWidth: 3, borderColor: '#205cc9', ...styles.geoButton }
              : styles.geoButton
          }
          onPress={() => setGeometric('square')}>
          <Text style={styles.buttonText}>Square</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            geometric === 'rectangle'
              ? { borderWidth: 3, borderColor: '#205cc9', ...styles.geoButton }
              : styles.geoButton
          }
          onPress={() => setGeometric('rectangle')}>
          <Text style={styles.buttonText}>Rectangle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            geometric === 'triangle'
              ? { borderWidth: 3, borderColor: '#205cc9', ...styles.geoButton }
              : styles.geoButton
          }
          onPress={() => setGeometric('triangle')}>
          <Text style={styles.buttonText}>Triangle</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={e => handleSubmit(el.nav, el.geoType, e)}>
        <Text style={styles.submitText}>Calculate</Text>
      </TouchableOpacity>
    </View>
  ));

  const handleSubmit = async (nav, geoType, e) => {
    e.preventDefault();

    await geometricFunction(nav, input).then(res => {
      try {
        navigation.navigate('GeoFundamentalSOL', {
          data: res.data,
          shape: nav,
          type: geoType,
        });
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleChange = (name, text) => {
    setInput({ ...input, [name]: text });
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150}>
        <Header nav={'TabNavigator'} />

        {mapData}
      </KeyboardAvoidingView>
    </>
  );
};

export default GeoFundamental;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerGeometric: {
    flex: 1,
    paddingHorizontal: '3%',
  },
  title: {
    fontFamily: 'Candal-Regular',
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
  },
  interactField: {
    paddingTop: '14%',
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '8%',
  },
  left: {
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagee: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  syntax: {
    fontSize: 20,
    color: 'black',
    marginTop: 4,
  },
  right: {
    width: '46%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputField: {
    // flex: 0.2,
    width: '70%',
    height: 48,
    borderWidth: 1,
    // borderColor: '#2874fc',
    borderRadius: 12,
    paddingLeft: 16,
    fontSize: 22,
  },
  checkButton: {
    width: '25%',
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
  },
  typeField: {
    marginTop: '5%',
    marginBottom: '2%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  type: {
    width: '48%',
    // height: 48,
    backgroundColor: '#28f1fc',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 8,
    margin: 2,
  },
  typeText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
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
  geoType: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  geoButton: {
    marginTop: 8,
    marginBottom: 8,
    width: '32%',
    backgroundColor: '#528ffc',
    padding: 8,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
