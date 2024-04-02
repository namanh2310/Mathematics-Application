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

const ProbaList = ({navigation}) => {
  const data = [
    {
      cateName: 'Probability Calculator',
      navLink: 'Probability Calculator',
      icon: faCalculator,
    },
    {
      cateName: 'Independent Events',
      navLink: 'Independent Events',
      icon: faTableCells,
    },
    {
      cateName: 'Standard Deviation',
      navLink: 'Standard Deviation',
      icon: faTableCells,
    },
    {
      cateName: 'Normal Distribution',
      navLink: 'Normal Distribution',
      icon: faTableCells,
    },
    {
      cateName: 'Statistic Calculator',
      navLink: 'Statistic Calculator',
      icon: faTableCells,
    },
    {
      cateName: 'Sample Size',
      navLink: 'Sample Size',
      icon: faTableCells,
    },
    {
      cateName: 'Confidence Interval',
      navLink: 'Confidence Interval',
      icon: faTableCells,
    },
    {
      cateName: 'Z-score Calculator',
      navLink: 'Z-score',
      icon: faTableCells,
    },
  ];
  return (
    <>
      <Header nav={'TabNavigator'} />
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>PROBA & STAT</Text>
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
                    onPress={() => navigation.navigate(el.navLink)}>
                    <View style={styles.left}>
                      <Text style={styles.categoryName}>{el.cateName}</Text>
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
    </>
  );
};

export default ProbaList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8252E7',
  },
  textContainer: {
    flex: 0.15,
    paddingLeft: 16,
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
  category: {
    width: '90%',
    height: 100,
    backgroundColor: '#13b6fc',
    borderRadius: 32,
    // borderColor: '#4044C9',
    // borderWidth: 3,
    // borderStyle: 'solid',
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  categoryName: {
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
