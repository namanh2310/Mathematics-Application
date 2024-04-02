import { StyleSheet, Text, View, } from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import MathView from 'react-native-math-view';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../../Components/Header';

const GeometricSOL = () => {
  const [show, setShow] = useState(false);
  const route = useRoute();
  const data = route.params.data;
  const result = data.result.toString();
  const type = data.type.toString();
  const shape = route.params.shape;
  const geoType = route.params.type.filter(el => (el.type = type))[0];
  const formula = geoType.formula;

  const a = data.a;
  const b = data.b;
  const c = data.c;
  const h = data.h;

  return (
    <View style={styles.container}>
      <Header nav={'GeoFundamental'} />
      <View style={styles.infor}>
        <Text style={styles.text}>Solution:</Text>
        <Text style={styles.firstText}>
          Calculate the {type} of {shape}
        </Text>
        <MathView style={styles.result} resizeMode="cover" math={result} />
        <Text style={styles.text}>Formula:</Text>
        <Text style={styles.stepFormula}>
          <MathView
            style={styles.result}
            resizeMode="cover"
            math={`${formula} ${result}`}
          />
          <MathView
            style={styles.result}
            resizeMode="cover"
            math={`~~with~~ ${shape === 'square'
                ? `a = ${a}`
                : shape === 'rectangle'
                  ? `a = ${a}, b = ${b}`
                  : shape === 'triangle'
                    ? `a = ${a}, b = ${b}, c = ${c}, h = ${h}`
                    : null
              }`}
          />
        </Text>
      </View>

      {show && (
        <View style={styles.step}>
          <ScrollView>
            <View></View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default GeometricSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infor: {
    flex: 0.3,
    backgroundColor: '#2874fc',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '10%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: '100%',
  },
  equation: {
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
    maxWidth: '100%',
    // marginLeft: '5%',
  },
  result: {
    color: '#fff',
  },

  text: {
    fontSize: 24,
    fontWeight: 600,
    color: '#fff',
    marginBottom: 8,
    // marginLeft: '5%',
  },
  firstText: {
    fontSize: 16,
    color: '#fff',
  },
  showStepBtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#E7E6E1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  textBtn: {
    fontSize: 18,
    color: 'black',
    fontWeight: 500,
  },
  step: {
    // marginTop: '5%',
    flex: 0.7,
    // marginBottom: '5%',
  },
  stepText: {
    fontSize: 20,
    color: 'black',
    marginTop: '5%',
  },
  stepTitle: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'black',
  },
  stepFormula: {
    fontSize: 18,
    color: 'white',
  },
  // size_medium: {
  //   height: '15%',
  // },
  // size_mediumm: {
  //   height: '10%',
  // },
  // size_large: {
  //   height: '5%',
  // },
  // size_larger: {
  //   height: '1%',
  // },
});
