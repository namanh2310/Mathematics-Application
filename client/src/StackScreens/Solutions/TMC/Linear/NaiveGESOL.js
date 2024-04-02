import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

import MatrixComponent from '../../../../Components/MatrixCompenent';
import { useRoute } from '@react-navigation/native';
import Header from '../../../../Components/Header';

const NaiveGESOL = () => {
  const router = useRoute();
  const input_matrix = router.params.data.input_matrix;
  const result = router.params.data.data;
  const steps = router.params.data.steps;
  return (
    <>
      <Header />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>This is our problem:</Text>
          <View style={styles.matrixField}>
            <MatrixComponent matrixArray={input_matrix} />
          </View>
          <Text style={styles.text}>The result will be:</Text>
          <View style={styles.matrixField}>
            <MatrixComponent matrixArray={result} />
          </View>
          <View style={styles.stepField}>
            <Text style={styles.stepTitle}>Step by step:</Text>
            {steps.map((el, index) => (
              <View style={styles.step} key={index}>
                {typeof el === 'object' ? (
                  <MatrixComponent matrixArray={el} />
                ) : (
                  <Text style={styles.stepText}>{el}</Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default NaiveGESOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '3%',
  },
  text: {
    fontFamily: 'Kanit-Light',
    fontSize: 18,
    color: 'black',
  },
  matrixField: {
    // flexDirection: 'row',
  },
  stepField: {
    marginTop: '5%',
    gap: 16,
  },
  step: {},
  stepTitle: {
    fontFamily: 'Kanit-Medium',
    color: 'black',
    fontSize: 22,
  },
  stepText: {
    fontFamily: 'Kanit-Light',
    color: 'black',
    fontSize: 18,
  },
});
