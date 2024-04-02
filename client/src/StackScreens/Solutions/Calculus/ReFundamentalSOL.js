import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import MathView, {MathText} from 'react-native-math-view';
import axios from 'axios';
import Header from '../../../Components/Header';

const ReFundamentalSOL = ({navigation}) => {
  const [show, setShow] = useState(false);

  const route = useRoute();
  const result = route.params.data;
  const equation = route.params.equation;
  const step = route.params.step;
  const img = route.params.img;

  console.log(result);
  console.log(equation);
  console.log(step);

  if (equation === undefined) {
    return (
      <>
        <Header />
        <View style={styles.container}>
          <View style={styles.infor}>
            <Text style={styles.textError}>
              Sorry, your inputted equation can not be read, please regenerate
              or scan again!
            </Text>
          </View>
        </View>
      </>
    );
  }

  function IntegralEquation() {
    return (
      <>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontFamily: 'Kanit-Regular',
          }}>
          The problem is:
        </Text>

        {step.map(el => (
          <>
            {/* <Text
              style={{
                color: 'black',
                fontSize: 22,
                fontFamily: 'Kanit-Regular',
              }}>
              Calculate the anti-derivative:
            </Text> */}
            <MathText style={styles.mathText} value={`${el}`} direction="ltr" />

            {/* <Text
              style={{
                color: 'black',
                fontSize: 22,
                fontFamily: 'Kanit-Regular',
              }}>
              Subtitute the range value to x, and then we can get the result
              Therefore, we get the value
            </Text> */}
            {/* <MathText
              style={styles.mathText}
              value={`\\( ${el[2]} \\)`}
              direction="ltr"
            /> */}
          </>
        ))}
      </>
    );
  }

  function UnstepEquation() {
    return (
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontFamily: 'Kanit-Regular',
            marginBottom: '15%',
          }}>
          Updating soon . . .
        </Text>
      </View>
    );
  }

  function StepEquation() {
    return (
      <View>
        {step.map(el => (
          <MathText style={styles.mathText} value={el} direction="ltr" />
        ))}
      </View>
    );
  }
  function BasicCalc() {
    return (
      <>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontFamily: 'Kanit-Regular',
          }}>
          The problem is
        </Text>
        <MathText value={` \\(${equation} \\)`} direction="ltr" />
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontFamily: 'Kanit-Regular',
          }}>
          Do the basic calculation with operators, we have
        </Text>
        <MathText value={`\\(${equation} = ${result} \\)`} direction="ltr" />
      </>
    );
  }

  return (
    <>
      <Header nav={'TabNavigator'} content={'Calculus'} />
      <View style={styles.container}>
        <View style={styles.infor}>
          <MathView
            style={styles.equation}
            resizeMode="cover"
            math={equation}
          />
          <MathView
            style={
              typeof result === 'string' && result.length <= 40
                ? styles.result
                : typeof result === 'object' && result.length >= 4
                ? styles.result_scale
                : typeof result === 'string' && result.length >= 40
                ? styles.result_scale
                : styles.result
            }
            resizeMode="cover"
            math={typeof result !== 'string' ? result.toString() : result}
          />
        </View>

        <View style={styles.step}>
          <ScrollView style={{marginHorizontal: '5%'}}>
            {/* <Text
              style={{
                color: '#8252E7',
                fontSize: 22,
                fontFamily: 'Kanit-Regular',
                fontWeight: 800,
                marginVertical: '5%',
              }}>
              Here is the steps
            </Text>
            {step !== null && step.length !== 0 && equation.includes('int') ? (
              <IntegralEquation />
            ) : (
              <>
                {equation.includes('x') &&
                equation.includes('=') &&
                step.length === 1 ? (
                  <UnstepEquation />
                ) : (
                  <>
                    {equation.includes('x') && equation.includes('=') ? (
                      <StepEquation />
                    ) : (
                      <BasicCalc />
                    )}
                  </>
                )}
              </>
            )} */}
            <StepEquation />
            {img && (
              <Image
                source={{uri: img}}
                style={{width: '100%', height: undefined, aspectRatio: 1.5}}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default ReFundamentalSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infor: {
    flex: 0.3,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '10%',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    width: '100%',
  },
  equation: {
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
    maxWidth: '100%',
  },
  result: {
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
  },

  result_scale: {
    width: '100%',
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
  },

  text: {
    fontSize: 24,
    fontWeight: 600,
    color: '#fff',
  },
  textError: {
    fontSize: 24,
    fontWeight: 600,
    color: '#fff',
    marginBottom: '15%',
  },
  showStepBtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  textBtn: {
    fontSize: 18,
    color: '#000',
    fontWeight: 500,
  },
  step: {
    flex: 0.7,
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
  mathText: {
    marginLeft: '3%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
