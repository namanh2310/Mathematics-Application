import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import MathView, {MathText} from 'react-native-math-view';

import Header from '../../../../Components/Header';

const Simpson13RuleSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const steps = route.params.steps;
  const equation = route.params.equation;
  const intFunct = route.params.intFunct;
  const n = route.params.n;
  const a = route.params.a;
  const b = route.params.b;
  const [step, setStep] = useState(false);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Result!!</Text>
        <View>
          <Text style={styles.result}>I = {data[0].I}</Text>
          <Text style={styles.result}>True value = {data[0].true_value}</Text>
          <Text style={styles.result}>Error = {data[0].error}</Text>
        </View>

        <View style={styles.stepField}>
          <TouchableOpacity onPress={() => setStep(!step)}>
            <Text style={styles.showStep}>Show step</Text>
          </TouchableOpacity>
          <ScrollView style={styles.step_container}>
            {steps.map(el => (
              <MathText style={styles.mathText} value={el} direction="ltr" />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Simpson13RuleSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Candal-Regular',
    fontSize: 28,
    color: '#2874fc',
  },
  tabField: {
    // flex: 0.3,
  },
  stepField: {
    flex: 1,
  },
  result: {
    fontSize: 24,
    color: 'black',
  },
  showStep: {
    marginTop: '5%',
    fontSize: 24,
    color: '#2874fc',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  step_container: {
    marginTop: '3%',
  },

  stepTitle: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'black',
  },

  size_small: {
    width: '100%',
  },
  size_medium: {
    width: '90%',
  },
  size_mediumm: {
    width: '75%',
  },
  size_large: {
    width: '65%',
  },
  size_larger: {
    width: '60%',
  },
  size_largerr: {
    width: '50%',
  },
  size_largerrr: {
    width: '40%',
  },
  note: {
    fontSize: 20,
    color: 'black',
  },
});
