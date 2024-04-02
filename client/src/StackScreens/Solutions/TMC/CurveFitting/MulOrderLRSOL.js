import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { MathText } from 'react-native-math-view';

import Header from '../../../../Components/Header';
import { multiLinear } from '../../../../Image';
import MatrixComponent from '../../../../Components/MatrixCompenent';

const MulOrderLRSOL = ({ navigation }) => {
  const route = useRoute();
  const data = route.params.data;
  const steps = data.steps;
  const [step, setStep] = useState(false);

  return (
    <>
      <Header nav={'Multi-order Regression'} />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        {steps.map((el, index) => (
          <>
            {el === 'Images' ? (
              <>
                <MathText value={'We have the formula'} />
                <Image
                  style={styles.formulaImg}
                  source={{ uri: multiLinear }}
                  resizeMode={'cover'}
                />
              </>
            ) : typeof el === 'object' ? (
              <>
                <MathText value={'Therefore, the result is:'} />
                <MatrixComponent matrixArray={el} />
              </>
            ) : (
              <MathText value={el} key={index} />
            )}
          </>
        ))}
      </ScrollView>
    </>
  );
};

export default MulOrderLRSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  head: { height: 40, backgroundColor: '#b8b8b8' },
  wrapper: { flexDirection: 'row', backgroundColor: '#d8d8d8' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 26, width: '199%' },
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
  listComponent: {
    width: '100%',
    marginLeft: '10%',
  },
  stepText: {
    fontSize: 20,
    color: 'black',
    marginBottom: '3%',
  },
  mathText: {
    fontSize: 45,
  },
  formulaImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 6,
  },
});
