import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faBars} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const Header = ({nav, content}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          nav ? navigation.navigate(nav) : navigation.goBack();
        }}>
        <FontAwesomeIcon style={styles.icon} icon={faArrowLeft} size={24} />
      </TouchableOpacity>
      <Text
        style={
          content
            ? [styles.logo, {fontSize: 22, borderBottomColor: 'transparent'}]
            : [styles.logo, {borderBottomColor: 'rgba(255, 255, 255, 0.193)'}]
        }>
        {content ? content : 'AiMA'}
      </Text>
      <FontAwesomeIcon style={styles.icon} icon={faBars} size={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    borderColor: 'transparent',
    width: '100%',
    height: '12%',
    backgroundColor: '#8252E7',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    // borderBottomLeftRadius: 16,
    // borderBottomRightRadius: 16,
  },
  logo: {
    fontFamily: 'Candal-Regular',
    fontSize: 32,
    color: 'white',
  },
  icon: {
    color: 'white',
  },
});
