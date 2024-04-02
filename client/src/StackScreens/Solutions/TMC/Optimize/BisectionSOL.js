import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import{ MathText } from 'react-native-math-view';
import { Table, Row } from 'react-native-table-component';

import Header from '../../../../Components/Header';

const BisectionSOL = () => {
  const route = useRoute();
  const data = route.params.data.result;
  const steps = route.params.data.steps;
  const tableHead = ['iteration', 'x_l', 'x_u', 'x_r', 'e_a'];
  const widthArr = [216, 216, 216, 216, 216];
  const tableData = data.map(e => Object.values(e));

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>RESULT!</Text>
        <ScrollView style={styles.tabField} horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={styles.textHeader}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: '#F7F6E7' },
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        <ScrollView style={styles.stepField}>
          <Text style={styles.showStep}>Show step</Text>
          {steps.map((el, index) => (
            <>
              <MathText value={el} />
            </>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default BisectionSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Candal-Regular',
    fontSize: 28,
    color: '#2874fc',
  },
  tabField: {
    flex: 0.2,
  },
  stepField: {
    flex: 0.8,
  },
  header: {
    height: 50,
    backgroundColor: '#2874fc',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  textHeader: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
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
});
