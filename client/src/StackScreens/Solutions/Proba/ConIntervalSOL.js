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

const ConIntervalSOL = () => {
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

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        <Text style={styles.stepText}>We apply the formula</Text>
        <MathView
          resizeMode="cover"
          math={'CI = X \\pm Z \\cdot \\frac{s}{\\sqrt{n}}'}
        />
        <Text style={styles.stepText}>Where:</Text>
        <View style={styles.listComponent}>
          <Text style={styles.stepText}>CI is Confidence Interval</Text>
          <Text style={styles.stepText}>X is Sample Mean</Text>
          <Text style={styles.stepText}>s is Standard Deviation</Text>
          <Text style={styles.stepText}>n is Sample Size</Text>
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
        <MathView
          resizeMode="cover"
          math={`CI = ${input.u} \\pm ${data.z_value} \\cdot \\frac{${input.s}}{\\sqrt{${input.n}}}`}
        />
        <Text style={styles.stepText}>
          Therefore, the final value is from{' '}
          {data.con_interval.join(',').replace(',', ' to ')}
        </Text>

        <View style={styles.stepField}></View>
      </ScrollView>
    </>
  );
};

export default ConIntervalSOL;

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
});
