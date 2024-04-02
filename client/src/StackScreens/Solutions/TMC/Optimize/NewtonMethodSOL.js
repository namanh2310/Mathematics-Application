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

const NewtonMethodSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const steps = route.params.steps;
  const funct = route.params.function.replace(/\*/g, '');
  const firstDeri = route.params.firstDeri.replace(/\*/g, '');
  const secondDeri = route.params.secondDeri.replace(/\*/g, '');
  const [step, setStep] = useState(false);

  const tableHead = ['e(a)', `f'(x)`, `f''(x)`, `f(x)`, 'i', 'xi'];
  const widthArr = [180, 180, 180, 180, 180, 180];

  const tableData = data.map(e => Object.values(e));

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>RESULT!</Text>
        <ScrollView style={styles.tabField} horizontal={true}>
          <View style={styles}>
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

export default NewtonMethodSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
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
    flex: 0.7,
  },
  header: {
    height: 50,
    backgroundColor: '#2874fc',
  },
  textHeader: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
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
  size_large: {
    width: '65%',
  },
  size_larger: {
    width: '60%',
  },
  size_largerr: {
    width: '55%',
  },
});
