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

const ProbaCalSol = () => {
  const route = useRoute();
  const data = route.params.data;
  const pA = route.params.pA;
  const pB = route.params.pB;

  const steps = [
    {
      step: 1,
      name: "Probability of A NOT occuring: P(A')",
      result: data.apAnot,
      formula: `1 - P(A) = 1 - ${pA}`,
    },
    {
      step: 2,
      name: "Probability of B NOT occuring: P(B')",
      result: data.bpBnot,
      formula: `1 - P(B) = 1 - ${pB}`,
    },
    {
      step: 3,
      name: 'Probability of A and B both occuring: P(A∩B)',
      result: data.cpAandB,
      formula: `P(A) x P(B) = ${pA} x ${pB}`,
    },
    {
      step: 4,
      name: 'Probability that A or B or both occur: P(A∪B)',
      result: data.dpAorB,
      formula: `P(A) + P(B) - P(A∩B) = ${pA} + ${pB} - ${data.cpAandB}`,
    },
    {
      step: 5,
      name: 'Probability that A or B occurs but NOT both: P(AΔB)',
      result: data.epAorBnotBoth,
      formula: `P(A) + P(B) - 2P(A∩B) = ${pA} + ${pB} - 2x${data.cpAandB}`,
    },
    {
      step: 6,
      name: "Probability of neither A nor B occuring: P((A∪B)')",
      result: data.fpNeitherAnorB,
      formula: `1 - P(A∪B) = 1 - ${data.dpAorB}`,
    },
    {
      step: 7,
      name: 'Probability of A occuring but NOT B',
      result: data.gpAbutNotB,
      formula: `P(A) × (1- P(B)) = ${pA} x (1 - ${pB})`,
    },
    {
      step: 8,
      name: 'Probability of B occuring but NOT A:	',
      result: data.hpBbutNotA,
      formula: `(1 - P(A)) × P(B) = (1 - ${pA}) x ${pB}`,
    },
  ];

  const tableTitle = [
    "P(A')",
    "P(B')",
    'P(A∩B)',
    'P(A∪B)',
    'P(AΔB)',
    "P((A∪B)')",
    "P(A∪B')",
    "P(A'∪B)",
  ];
  const tableHead = ['', 'Result'];

  const tableData = Object.values(data).map(value => [value]);

  const Item = ({ step, name, result, formula, picture }) => (
    <View style={styles.item}>
      <Text style={styles.stepTitle}>
        {step}. {name}
      </Text>
      <View style={styles.displayStep}>
        <View style={styles.left}>
          {/* <Image
            style={styles.stepImg}
            source={require('../../../../assets/image/probaTwo.png')}
          /> */}
        </View>
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
              heightArr={[36, 36]}
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

export default ProbaCalSol;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#b8b8b8' },
  wrapper: { flexDirection: 'row', backgroundColor: '#d8d8d8' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 36 },
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: 'black',
  },
  left: {
    width: '47%',
  },
  stepImg: {
    width: 160,
    height: 160,
  },
  right: {
    width: '47%',
  },
  stepText: {
    fontSize: 15,
    color: 'black',
  },
});
