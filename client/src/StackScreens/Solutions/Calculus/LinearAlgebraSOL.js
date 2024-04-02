import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

import MatrixComponent from '../../../Components/MatrixCompenent';
import Header from '../../../Components/Header';

const LinearAlgebraSOL = () => {
  const router = useRoute();
  const matrixA = router.params.data.matrixA;
  const matrixB = router.params.data.matrixB;
  const result = router.params.data.result;
  const category = router.params.data.category;
  const step = router.params.data.step;
  
  return (
    <>
      <Header />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>
            We calculate the {category} of 2 matrices:
          </Text>
          <View style={styles.matrixField}>
            <MatrixComponent matrixArray={matrixA} />
            <MatrixComponent matrixArray={matrixB} />
          </View>
          <Text style={styles.text}>The result will be:</Text>
          <View style={styles.matrixField}>
            <MatrixComponent matrixArray={result} />
          </View>
          <View style={styles.stepField}>
            <Text style={styles.stepTitle}>Step by step:</Text>
            {step.map((el, index) => (
              <View style={styles.step}>
                {typeof el === 'object' ? (
                  <MatrixComponent matrixArray={el} key={index} />
                ) : (
                  <Text style={styles.stepText} key={index}>
                    {el}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default LinearAlgebraSOL;

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
