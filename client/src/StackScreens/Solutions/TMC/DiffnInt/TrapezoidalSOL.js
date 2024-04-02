import {StyleSheet, Text, ScrollView} from 'react-native';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {MathText} from 'react-native-math-view';

import Header from '../../../../Components/Header';

const TrapezoidalSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const slopeA = route.params.slopeA;
  const slopeB = route.params.slopeB;
  const first_deri = route.params.first_deri;
  const second_deri = route.params.second_deri;
  const f_2_der_mean = route.params.f_2_der_mean;
  const equation = route.params.equation;
  const a = route.params.a;
  const b = route.params.b;
  const [step, setStep] = useState(false);
  const steps = route.params.steps;

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        {steps.map(el => (
          <MathText style={styles.mathText} value={el} direction="ltr" />
        ))}
      </ScrollView>
    </>
  );
};

export default TrapezoidalSOL;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#b8b8b8'},
  wrapper: {flexDirection: 'row', backgroundColor: '#d8d8d8'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 26, width: '199%'},
  text: {textAlign: 'center', fontSize: 16},
  headerTitle: {
    fontFamily: 'Candal-Regular',
    fontSize: 28,
    color: 'black',
  },
  stepField: {
    flex: 1,
    marginTop: '2%',
  },
  listComponent: {
    width: '100%',
    marginLeft: '10%',
  },
  stepText: {
    fontSize: 20,
    color: 'black',
    marginBottom: '3%',
  },
  mathText: {
    fontSize: 45,
  },
});
