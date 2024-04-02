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
import {useRoute} from '@react-navigation/native';
import Header from '../Components/Header';

const MethodList = ({navigation}) => {
  const route = useRoute();
  const header = route.params.header;
  const fields = route.params.fields;

  return (
    <SafeAreaView style={styles.container}>
      <Header nav={'TMCList'} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{header}</Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          style={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {fields.map((el, key) => (
              <View key={key} style={styles.cateContainer}>
                <Text style={styles.cateNumber}>{key + 1}</Text>
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.8}
                  style={styles.category}
                  onPress={() =>
                    navigation.navigate(el.navLink, {
                      header: header,
                      fields: fields,
                    })
                  }>
                  <View style={styles.left}>
                    <Text style={styles.categoryField}>{el.fieldName}</Text>
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

export default MethodList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: '5%',
    // paddingRight: '5%',
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
