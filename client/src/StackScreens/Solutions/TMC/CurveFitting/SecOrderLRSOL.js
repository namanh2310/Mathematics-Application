import {StyleSheet, Text, ScrollView, Image} from 'react-native';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {MathText} from 'react-native-math-view';
import Header from '../../../../Components/Header';
import {useSelector} from 'react-redux';

import {auth$} from '../../../../Redux/selectors';
import {linearFirstImage} from '../../../../Image';

const SecOrderLRSOL = ({navigation}) => {
  const auth = useSelector(auth$);
  var formula = require('../../../../../assets/image/secOrderLR.png');
  const route = useRoute();
  const data = route.params.data;
  const steps = route.params.steps;
  const [step, setStep] = useState(false);

  return (
    <>
      {/* <Text>{auth.data[0].email}</Text> */}
      <Header nav={'2nd-order Regression'} />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        {/* <MathText
          style={styles.mathText}
          value={`Firstly, calculate`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{x_i}\\), we have: \\(\\sum{x_i} = ${data.sum_x}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{x_i}^2\\), we have: \\(\\sum{x_i}^2 = ${data.sum_x_square}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{x_i}^3\\), we have: \\(\\sum{x_i}^3 = ${data.sum_x_cube}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{x_i}^4\\), we have: \\(\\sum{x_i}^4 = ${data.sum_x_four}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{y_i}\\), we have: \\(\\sum{y_i} = ${data.sum_y}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{x_{i}y_{i}}\\), we have: \\(\\sum{x_{i}y_{i}} = ${data.sum_mul_xy}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{x_{i}^{2}y_{i}}\\), we have: \\(\\sum{x_{i}^{2}y_{i}} = ${data.sum_mul_x2y}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`We follow the formula:`}
          direction="ltr"
        />

        <Image
          style={styles.formulaImg}
          source={{uri: linearFirstImage}}
          resizeMode={'cover'}
        />

        <MathText
          style={styles.mathText}
          value={`Subititute the calculated values, we can get: $$ \\(a_{0} = ${data.x[0]}\\) $$ \\(a_{1} = ${data.x[1]}\\) $$ \\(a_{2} = ${data.x[2]}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`Therefore, \\(y = a_{0} + a_{1}x + a_{2}x^{2}\\)  \\( = ${data.x[0]} + ${data.x[1]}x + ${data.x[2]}x^{2}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`To calculate the standard error, we have:`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum_{i=1}^{n}{(y_{i} - a_{0} - a_{1}x_{i} - a_{2}x_{i}^{2})^2} = ${data.sum_fourthRow}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`so, \\(s_{y/x} = \\sqrt{\\frac{${data.sum_fourthRow}}{${data.n}-3}} = ${data.standard_error} \\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`Next, we calculate: \\((y_{i} - \\bar{y})^2 = ${data.sum_thirdRow}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`About the coefficient of determination: \\(r^{2} = \\frac{${data.sum_thirdRow} - ${data.sum_fourthRow}}{${data.sum_thirdRow}} = ${data.coff}\\)`}
          direction="ltr"
        /> */}
        {/* {steps.map(el => (
          <MathText style={styles.mathText} value={el} direction="ltr" />
        ))} */}
        {steps.map((el, index) => (
          <>
            {el === 'Images' ? (
              <Image
                style={styles.formulaImg}
                source={{uri: linearFirstImage}}
                resizeMode={'cover'}
              />
            ) : (
              <MathText style={styles.mathText} value={el} direction="ltr" />
            )}
          </>
        ))}
      </ScrollView>
    </>
  );
};

export default SecOrderLRSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  mathText: {
    fontSize: 45,
  },
  formulaImg: {
    width: '100%',
    height: 85,
  },
});
