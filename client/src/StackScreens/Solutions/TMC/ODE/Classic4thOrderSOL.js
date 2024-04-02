import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Table, Row} from 'react-native-table-component';
import MathView, {MathText} from 'react-native-math-view';

import Header from '../../../../Components/Header';

const Classic4thOrderSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const steps = route.params.steps;
  const [step, setStep] = useState(false);

  const tableHead = ['i', 'k1', 'k2', 'k3', 'k4', 'x', 'y_3rd'];
  const widthArr = [154, 154, 154, 154, 154, 154, 156];

  const tableData = data.map(e => Object.values(e));

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Result!!</Text>
        <ScrollView style={styles.tabField} horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={styles.textHeader}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && {backgroundColor: '#F7F6E7'},
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>

        <View style={styles.stepField}>
          <TouchableOpacity onPress={() => setStep(!step)}>
            <Text style={styles.showStep}>Show step</Text>
          </TouchableOpacity>
          <ScrollView style={styles.step_container}>
            {steps.map(el => (
              <MathText style={styles.mathText} value={el} direction="ltr" />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Classic4thOrderSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  title: {
    fontFamily: 'Candal-Regular',
    fontSize: 28,
    color: '#2874fc',
  },
  tabField: {
    flex: 1,
    height: '20%',
  },
  stepField: {
    flex: 1,
    height: '80%',
  },
  header: {
    height: 50,
    backgroundColor: '#2874fc',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
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
  stepTitle: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'black',
  },
  size_medium: {
    width: '85%',
  },
  size_mediumm: {
    width: '75%',
  },
  size_large: {
    width: '65%',
  },
  size_larger: {
    width: '60%',
  },
});
