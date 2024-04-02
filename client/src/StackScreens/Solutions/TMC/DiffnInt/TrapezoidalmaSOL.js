import {StyleSheet, Text, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {MathText} from 'react-native-math-view';

import Header from '../../../../Components/Header';

const TrapezoidalmaSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const middle_sum = route.params.middle_sum;
  const slope_sum = route.params.slope_sum;
  const array = route.params.array;
  const first_deri = route.params.first_deri;
  const second_deri = route.params.second_deri;
  const f_2_der_mean = route.params.f_2_der_mean;
  const equation = route.params.equation;
  const a = route.params.a;
  const b = route.params.b;
  const n = route.params.n;
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

export default TrapezoidalmaSOL;

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
