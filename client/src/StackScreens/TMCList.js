import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalculator,
  faTableCells,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../Components/Header';

const TMCList = ({navigation}) => {
  const data = [
    {
      displayName: 'Optimized Methods',
      cateName: 'Optimization',
      navLink: 'Optimization List',
      fields: [
        {
          fieldName: 'Golden Section',
          navLink: 'Golden Section',
        },
        {
          fieldName: 'Newton Method',
          navLink: 'Newton Method',
        },
        {
          fieldName: 'Bisection Method',
          navLink: 'Bisection Method',
        },
        {
          fieldName: 'Parabolic Interpolation',
          navLink: 'Parabolic Interpolation',
        },
      ],
    },
    {
      displayName: 'ODE Methods',
      cateName: 'ODE',
      navLink: 'ODE List',
      fields: [
        {
          fieldName: 'Euler Method',
          navLink: 'Euler Method',
        },
        {
          fieldName: 'Heun Method',
          navLink: 'Heun Method',
        },
        {
          fieldName: 'Midpoint Method',
          navLink: 'MidPoint Method',
        },
        {
          fieldName: 'Ralston Method',
          navLink: 'Ralston Method',
        },
        {
          fieldName: 'Third-order Method',
          navLink: 'Third-order Method',
        },
        {
          fieldName: 'Classic 4th order RK',
          navLink: 'Classic Fourth-order Method',
        },
      ],
    },
    {
      displayName: 'Diff&Int Equations',
      cateName: 'DIFF & INT',
      navLink: 'Differ & Int List',
      fields: [
        {
          fieldName: 'Trapezoidal Rule',
          navLink: 'Trapezoidal Rule',
        },
        {
          fieldName: 'Trapezoidal MA Rule',
          navLink: 'Trapezoidal MA Rule',
        },
        {
          fieldName: 'Simpson 1/3 Rule',
          navLink: 'Simpson 1/3 Rule',
        },
        {
          fieldName: 'Simpson 1/3 MA Rule',
          navLink: 'Simpson 1/3 MA Rule',
        },
        {
          fieldName: 'Simpson 3/8 Rule',
          navLink: 'Simpson 3/8 Rule',
        },
      ],
    },
    {
      displayName: 'Curve Fitting',
      cateName: 'Curve fitting',
      navLink: 'Curve Fitting List',
      fields: [
        {
          fieldName: 'Linear Regression',
          navLink: 'Linear Regression',
        },
        {
          fieldName: '2nd-order Regression',
          navLink: '2nd-order Regression',
        },
        {
          fieldName: 'Multi-order Regression',
          navLink: 'Multi-order Regression',
        },
      ],
    },
    {
      displayName: 'Linear Equation',
      cateName: 'Linear Equation',
      navLink: 'Linear Equation List',
      fields: [
        {
          fieldName: 'Naive GE',
          navLink: 'Naive Gauss Elimination',
        },
        {
          fieldName: 'Gauss Jordan',
          navLink: 'Gauss Jordan',
        },
      ],
    },
    // ===
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header nav={'TabNavigator'} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Numerical Method</Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          style={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {data.map((el, key) => (
              <View key={key} style={styles.cateContainer}>
                <Text style={styles.cateNumber}>{key + 1}</Text>
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.8}
                  style={styles.category}
                  onPress={() =>
                    navigation.navigate('Method List', {
                      header: el.displayName,
                      fields: el.fields,
                    })
                  }>
                  <View style={styles.left}>
                    <Text style={styles.categoryField}>{el.cateName}</Text>
                  </View>
                  <FontAwesomeIcon
                    style={styles.right}
                    icon={faPlay}
                    size={40}
                    color={'white'}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TMCList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: '5%',
    // paddingRight: '5%',
    backgroundColor: '#8252E7',
  },
  textContainer: {
    flex: 0.15,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 700,
    textAlign: 'center',
  },
  cateText: {
    marginTop: '5%',
    fontSize: 26,
    color: 'black',
    fontWeight: 500,
  },
  scrollViewContainer: {
    flex: 0.85,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    overflow: 'hidden',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  categoriesContainer: {
    marginTop: '5%',
  },
  cateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cateNumber: {
    fontSize: 32,
    color: '#0f79a6',
    fontFamily: 'Candal-Regular',
  },
  category: {
    width: '90%',
    height: 100,
    backgroundColor: '#13b6fc',
    borderRadius: 32,
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryName: {
    color: '#1c2e4d',
    fontSize: 24,
    fontWeight: 800,
    marginTop: 24,
    marginBottom: 24,
  },
  categoryField: {
    color: 'white',
    fontSize: 24,
    marginLeft: '8%',
    fontWeight: 800,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  right: {
    marginRight: 16,
  },
});
