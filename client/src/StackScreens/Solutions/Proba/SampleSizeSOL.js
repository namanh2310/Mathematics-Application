import React from 'react';
import {useRoute} from '@react-navigation/native';
import MathView from 'react-native-math-view';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

import Header from '../../../Components/Header';

const SampleSizeSOL = () => {
  const route = useRoute();
  const data = route.params.data;
  const input = route.params.input;
  const tableTitle = [
    '70%',
    '75%',
    '80%',
    '85%',
    '90%',
    '95%',
    '98%',
    '99%',
    '99.5%',
    '99.9%',
    '99.99%',
    '99.999%',
  ];
  const tableHead = ['Confidence Level', 'Z Value'];

  const tableData = [
    ['1.036'],
    ['1.150'],
    ['1.282'],
    ['1.440'],
    ['1.645'],
    ['1.960'],
    ['2.326'],
    ['2.576'],
    ['2.807'],
    ['3.291'],
    ['3.891'],
    ['4.417'],
  ];
  //   const tableData = Object.values(data).map(value => [value]);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{minHeight: '140%'}}>
          <Text style={styles.headerTitle}>Solution</Text>
          <Text style={styles.stepText}>
            Because the population type is {data.type}, we have a formula:
          </Text>
          {data.type === 'infinity' ? (
            <MathView
              style={{height: '6%'}}
              resizeMode="cover"
              math={'n = \\frac{z^2 \\cdot p(1-p)}{\\varepsilon^2}'}
            />
          ) : (
            <MathView
              style={{height: '7%'}}
              resizeMode="cover"
              math={
                'n = \\frac{N}{1+\\frac{z^2 \\cdot p(1-p)}{\\varepsilon^2}}'
              }
            />
          )}
          <Text style={styles.stepText}>Where:</Text>
          <View style={styles.listComponent}>
            <Text style={styles.stepText}>n is Sample Size</Text>
            <Text style={styles.stepText}>p is Population Proportion</Text>
            <Text style={styles.stepText}>N is Population Size</Text>
            <Text style={styles.stepText}>e is Margin of Error</Text>
            <Text style={styles.stepText}>
              Z is Z-value for Confidence Interval
            </Text>
          </View>
          <Table borderStyle={{borderWidth: 1}}>
            <Row
              data={tableHead}
              style={styles.head}
              flexArr={[0.5, 0.5]}
              textStyle={styles.text}
            />
            <TableWrapper style={styles.wrapper}>
              <Col
                data={tableTitle}
                style={styles.title}
                heightArr={[26, 26]}
                textStyle={styles.text}
              />
              <Rows
                data={tableData}
                flexArr={[0.5, 0.5]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
          <Text style={styles.stepText}>For details:</Text>
          {data.type === 'infinity' ? (
            <MathView
              style={{height: '6%'}}
              resizeMode="cover"
              math={`n = \\frac{${data.z_value}^2 \\cdot ${input.p}(1-${input.p})}{${input.e}^2}`}
            />
          ) : (
            <MathView
              style={{height: '7%'}}
              resizeMode="cover"
              math={`n = \\frac{${input.N}}{1+\\frac{${data.z_value}^2 \\cdot ${input.p}(1-${input.p})}{${input.e}^2}}`}
            />
          )}
          <Text style={styles.stepText}>
            Therefore, the value is {data.sample_size}
          </Text>

          <View style={styles.stepField}></View>
        </ScrollView>
      </View>
    </>
  );
};

export default SampleSizeSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
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
});
