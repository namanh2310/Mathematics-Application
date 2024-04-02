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

const NormalSOL = () => {
  const route = useRoute();
  const data = route.params.data;
  const input = route.params.input;

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        <Text style={styles.stepText}>
          Firstly, calculate Z score by the formula
        </Text>
        <MathView resizeMode="cover" math={`z = \\frac{x - \\mu}{\\sigma} `} />
        <Text style={styles.stepText}>Where:</Text>
        <View style={styles.listComponent}>
          <Text style={styles.stepText}>z is Z Score</Text>
          <Text style={styles.stepText}>x is Raw Score</Text>
          <Text style={styles.stepText}>u is Population Mean</Text>
          <Text style={styles.stepText}>o is Standard Deviation</Text>
        </View>
        <Text style={styles.stepText}>
          Next, we calculate the normal distribution:
        </Text>
        <Text style={styles.stepText}>
          &#x2022; P({data.left_range} &lt; Z &lt; {data.right_range}) = P(Z
          &lt; {data.right_range}) - P(Z &lt; {data.left_range})
        </Text>
        {data.left_range < 0 ? (
          <>
            <Text style={styles.stepText}>&#x2022; About left bound:</Text>
            <Text style={styles.stepText}>
              - We have: P(Z &lt; -a) = 1 - P(Z &lt; a)
            </Text>
            <Text style={styles.stepText}>
              - To get the P(Z &lt; a), we observe the Z table, so 1 - P(Z &lt;
              a) = 1 - {data.z_table_left} = {data.z_score_left}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.stepText}>&#x2022; About left bound:</Text>
            <Text style={styles.stepText}>
              - To get the P(Z &lt; a), we observe the Z table, so P(Z &lt; a) ={' '}
              {data.z_table_left} = {data.z_score_left}
            </Text>
          </>
        )}

        {data.right_range < 0 ? (
          <>
            <Text style={styles.stepText}>&#x2022; About right bound:</Text>
            <Text style={styles.stepText}>
              - We have the formula: P(Z &lt; -a) = 1 - P(Z &lt; a)
            </Text>
            <Text style={styles.stepText}>
              - To get the P(Z &lt; a), we observe the Z table, so 1 - P(Z &lt;
              a) = 1 - {data.z_table_right} = {data.z_score_right}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.stepText}>&#x2022; About right bound:</Text>
            <Text style={styles.stepText}>
              - To get the P(Z &lt; a), we observe the Z table, so P(Z &lt; a) ={' '}
              {data.z_score_right}
            </Text>
          </>
        )}
        <Text style={styles.stepText}>
          &#x2022; At the end, we have: P({data.left_range} &lt; Z &lt;{' '}
          {data.right_range}) = {data.z_score_right} - {data.z_score_left} ={' '}
          {data.result}
        </Text>
      </ScrollView>
    </>
  );
};

export default NormalSOL;

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
