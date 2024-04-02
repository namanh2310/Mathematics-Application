import {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import Lottie from 'lottie-react-native';

const Welcome = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('Auth');
      navigation.navigate('TabNavigator');
    }, 1800);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>AiMA</Text>
      <Lottie
        source={require('../../assets/animation/bound-loading.json')}
        autoPlay
        // loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    marginBottom: '40%',
    fontSize: 36,
    fontFamily: 'Candal-Regular',
    color: '#2874fc',
  },
});

export default Welcome;
