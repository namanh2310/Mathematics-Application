import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

import Header from '../../../Components/Header';

const StatisticSOL = () => {
  const route = useRoute();
  const data = route.params.data;
  const input = route.params.input;
  const sum = route.params.sum;
  const product = route.params.product;
  const productRes = route.params.productRes;
  const medianFormula =
    data.acount % 2 === 1
      ? 'p = (count + 1)/2 then Median = Array[p]'
      : 'p = (count)/2 then Median = (Array[p] + Array[p+1])/2';

  const steps = [
    {
      step: 1,
      name: `Sum of all elements`,
      result: data.bsum,
      formula: [`Sum = ${sum}`],
    },
    {
      step: 2,
      name: 'Mean of this array',
      result: data.cmean,
      formula: [`Mean = Sum / Count = ${data.bsum}/${data.acount}`],
    },
    {
      step: 3,
      name: 'Median of this array',
      result: data.dmedian,
      formula: [`Median = ${medianFormula}`],
    },
    {
      step: 4,
      name: `Range of this array`,
      result: data.hrange,
      formula: [`Range = Max - Min = ${data.fmax} - ${data.gmin}`],
    },
    {
      step: 5,
      name: 'Geometric Mean',
      result: data.igeometric_mean,
      formula: [
        `Multiply all the numbers together (A) = ${product} = ${productRes}`,
        `Take the nth root of the product, where n is the number of values:`,
        `Apply the formula: GM = A^(1/count) = ${productRes}^${data.acount}`,
      ],
    },
    {
      step: 6,
      name: 'Standard Deviation',
      result: data.jstandard_deviation,
      formula: [
        `Calculate sum of (number - mean) then take the square for it: (xi - mean)^2 + ... = (${input[0]} - ${data.cmean})^2 + ...`,
        `Multiply it with 1/(count-1) and then take the square root all of this `,
      ],
    },
    {
      step: 7,
      name: `Variance`,
      result: data.kvariance,
      formula: [
        `Calculate sum of (number - mean) then take the square for it (A): (xi - mean)^2 + ... = (${input[0]} - ${data.cmean})^2 + ...`,
        `Devide it to the length of the array: A/count `,
      ],
    },
  ];

  const tableTitle = [
    `Count`,
    `Sum`,
    `Mean`,
    `Median`,
    `Mode`,
    `Max`,
    `Min`,
    `Range`,
    `Geometric Meam`,
    `Standard Deviation`,
    `Variance`,
  ];
  const tableHead = ['', 'Result'];

  const tableData = Object.values(data).map(value => [value]);

  const Item = ({ step, name, result, formula }) => (
    <View style={styles.item}>
      <Text style={styles.stepTitle}>
        {step}. {name}
      </Text>
      <View style={styles.displayStep}>
        <View style={styles.right}>
          {formula.map((el, index) => (
            <Text key={index} style={styles.stepText}>{el}</Text>
          ))}
          <Text style={styles.stepText}>Result is: {result}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={tableHead}
            flexArr={[1, 1.2]}
            style={styles.head}
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
              flexArr={[1, 0.1, 0.1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
        <View style={styles.stepField}>
          <FlatList
            data={steps}
            renderItem={({ item }) => (
              <Item
                step={item.step}
                name={item.name}
                formula={item.formula}
                picture={item.picture}
                result={item.result}
              />
            )}
            keyExtractor={item => item.step}
          />
        </View>
      </View>
    </>
  );
};

export default StatisticSOL;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#b8b8b8' },
  wrapper: { flexDirection: 'row', backgroundColor: '#d8d8d8' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 26 },
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
  displayStep: {
    width: '100%',
    display: 'flex',
  },
  item: {
    marginBottom: '5%',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: 'black',
  },
  stepImg: {
    width: 160,
    height: 160,
  },
  right: {
    width: '100%',
  },
  stepText: {
    fontSize: 15,
    color: 'black',
  },
});
