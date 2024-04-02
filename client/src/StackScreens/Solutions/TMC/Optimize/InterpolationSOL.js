import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { MathText } from 'react-native-math-view';
import { Table, Row } from 'react-native-table-component';

import Header from '../../../../Components/Header';

const InterpolationSOL = () => {
  const [table, setTable] = useState(1);
  const route = useRoute();
  const first_approach = route.params.data.first_approach;
  const second_approach = route.params.data.second_approach;
  const steps = route.params.data.steps;
  const tableHead = [
    'iteration',
    'x0',
    'f(x0)',
    'x1',
    'f(x1)',
    'x2',
    'f(x2)',
    'x3',
    'f(x3)',
  ];
  const widthArr = [120, 120, 120, 120, 120, 120, 120, 120, 120];
  const tableDataFirst = first_approach.map(e => Object.values(e));
  const tableDataSecond = second_approach.map(e => Object.values(e));

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>RESULT!</Text>
        <View style={styles.buttonField}>
          <TouchableOpacity
            style={table === 1 ? styles.buttonActivate : styles.button}
            onPress={() => setTable(1)}>
            <Text style={styles.buttonText}>First Approach</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={table === 2 ? styles.buttonActivate : styles.button}
            onPress={() => setTable(2)}>
            <Text style={styles.buttonText}>Second Approach</Text>
          </TouchableOpacity>
        </View>
        {table === 1 ? (
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
                  {tableDataFirst.map((rowData, index) => (
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
        ) : (
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
                  {tableDataSecond.map((rowData, index) => (
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
        )}
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

export default InterpolationSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    gap: 8,
  },
  buttonField: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    flex: 0.2,
  },
  button: {
    width: '48%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2874fc',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActivate: {
    width: '48%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#561dd0',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Kanit-Medium',
    fontSize: 18,
    color: '#fff',
  },
  title: {
    fontFamily: 'Candal-Regular',
    fontSize: 28,
    color: '#2874fc',
  },
  tabField: {
    flex: 0.3,
  },
  stepField: {
    flex: 0.5,
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
