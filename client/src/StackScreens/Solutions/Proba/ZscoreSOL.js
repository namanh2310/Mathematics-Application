import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import MathView from 'react-native-math-view';

import Header from '../../../Components/Header';

const ZscoreSOL = () => {
  const route = useRoute();
  const data = route.params.data;
  const input = route.params.input;

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        <Text style={styles.stepText}>Firstly, calculate Z score</Text>
        <MathView
          resizeMode="cover"
          math={`z = \\frac{x - \\mu}{\\sigma} = \\frac{${input.x} - ${input.u}}{${input.o}} = ${data.z_score}`}
        />
        <Text style={styles.stepText}>Where:</Text>
        <View style={styles.listComponent}>
          <Text style={styles.stepText}>z is Z Score</Text>
          <Text style={styles.stepText}>x is Raw Score</Text>
          <Text style={styles.stepText}>u is Population Mean</Text>
          <Text style={styles.stepText}>o is Standard Deviation</Text>
        </View>
        <Text style={styles.stepText}>Next, we calculate the probability:</Text>
        <Text style={styles.stepText}>
          &#x2022; Probability of x &gt; {input.x} = {data.upper} by Z-table{' '}
        </Text>
        <Text style={styles.stepText}>
          &#x2022; Probability of x &lt; {input.x} = 1 - {data.upper} ={' '}
          {data.lower}{' '}
        </Text>
        <Text style={styles.stepText}>
          &#x2022; Probability of {input.u} &lt; x &lt; {input.x} = {data.lower}{' '}
          - 0.5 = {data.in_range}{' '}
        </Text>
      </ScrollView>
    </>
  );
};

export default ZscoreSOL;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#b8b8b8' },
  wrapper: { flexDirection: 'row', backgroundColor: '#d8d8d8' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 26, width: '199%' },
  text: { textAlign: 'center', fontSize: 16 },
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
});
