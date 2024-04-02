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

const ProbaIndendSOL = () => {
  const route = useRoute();
  const data = route.params.data;
  const pA = route.params.pA;
  const pB = route.params.pB;
  const timeA = route.params.timeA;
  const timeB = route.params.timeB;

  const steps = [
    {
      step: 1,
      name: `Probability of A occuring ${timeA} time(s)`,
      result: data.apAoccurTimes,
      formula: `P(A)^timeA = ${pA}^${timeA}`,
    },
    {
      step: 2,
      name: 'Probability of A NOT occuring',
      result: data.bpAnotTimes,
      formula: `(1 - P(A))^timeA = (1 - ${pA})^${timeA}`,
    },
    {
      step: 3,
      name: 'Probability of A occuring',
      result: data.cpAoccur,
      formula: `1 - (1 - P(A))^timeA = 1 - (1 - ${pA})^${timeA}`,
    },
    {
      step: 4,
      name: `Probability of B occuring ${timeB} time(s)`,
      result: data.dpBoccurTimes,
      formula: `P(B)^timeB = ${pB}^${timeB}`,
    },
    {
      step: 5,
      name: 'Probability of B NOT occuring',
      result: data.epBnotTimes,
      formula: `(1 - P(B))^timeB = (1 - ${pB})^${timeB}`,
    },
    {
      step: 6,
      name: 'Probability of B occuring',
      result: data.fpBoccur,
      formula: `1 - (1 - P(B))^timeB = 1 - (1 - ${pB})^${timeB}`,
    },
    {
      step: 7,
      name: `Probability of A occuring ${timeA} times and B occuring ${timeB} times`,
      result: data.gpABoccurTimes,
      formula: `P(A)^timeA × P(B)^timeB = ${pA}^${timeA} x ${pB}^${timeB}`,
    },
    {
      step: 8,
      name: 'Probability of neither A nor B occuring',
      result: data.hpNeitherAnorB,
      formula: `(1 - P(A))^timeA × (1 - P(B))^timeB = (1 - ${pA})^${timeA} x (1 - ${pB})^${timeB}`,
    },
    {
      step: 9,
      name: 'Probability of both A and B occuring',
      result: data.jpBothABoccur,
      formula: `(1 - (1 - P(A))^timeA) × (1 - (1 - P(B))^timeB) = (1 - (1 - ${pA})^${timeA}) × (1 - (1 - ${pB})^${timeB})`,
    },
    {
      step: 10,
      name: `Probability of A occuring ${timeA} times but not B`,
      result: data.kpAtimesNotB,
      formula: `P(A)^timeA × (1 - P(B))^timeB = ${pA}^${timeA} × (1 - ${pB})^${timeB}`,
    },
    {
      step: 11,
      name: `Probability of B occuring ${timeB} times but not A`,
      result: data.lpBtimesNotA,
      formula: `(1 - P(A))^timeA × P(B)^timeB = (1 - ${pA})^${timeA} × ${pB}^${timeB}`,
    },
    {
      step: 12,
      name: 'Probability of A occuring but not B',
      result: data.mnpAoccurNotB,
      formula: `(1 - (1 - P(A))^timeA) × (1 - P(B))^timeB = (1 - (1 - ${pA})^${timeA}) × (1 - ${pB})^${timeB}`,
    },
    {
      step: 13,
      name: 'Probability of B occuring but not A',
      result: data.npBoccurNotA,
      formula: `(1 - (1 - P(B))^timeB) × (1 - P(A))^timeA = (1 - (1 - ${pB})^${timeB}) × (1 - ${pA})^${timeA}`,
    },
  ];

  const tableTitle = [
    `A occurs ${timeA} times`,
    `A does not occurs`,
    'A occurs',
    `B occurs ${timeB} times`,
    `B does not occurs`,
    'B occurs',
    `A ${timeA} times, B ${timeB} times`,
    'Neither A nor B',
    'Both A and B',
    `A ${timeA} times, not B`,
    `B ${timeB} times, not A`,
    `A not B`,
    `B not A`,
  ];
  const tableHead = ['', 'Result'];

  const tableData = Object.values(data).map(value => [value]);

  const Item = ({ step, name, result, formula, picture }) => (
    <View style={styles.item}>
      <Text style={styles.stepTitle}>
        {step}. {name}
      </Text>
      <View style={styles.displayStep}>
        <View style={styles.right}>
          <Text style={styles.stepText}>
            {formula} = {result}
          </Text>
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

export default ProbaIndendSOL;

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
