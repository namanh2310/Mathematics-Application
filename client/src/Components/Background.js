import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Rotate} from '@cloudinary/transformation-builder-sdk/actions';

const Background = ({type}) => {
  switch (type) {
    case 'Create/Update':
      return (
        <>
          <View
            style={{
              width: 180,
              height: 180,
              borderRadius: 180 / 2,
              backgroundColor: '#8252E7',
              position: 'absolute',
              top: '15%',
              right: '5%',
              opacity: 0.2,
            }}></View>

          <View
            style={{
              width: 360,
              height: 360,
              borderRadius: 360 / 2,
              backgroundColor: '#8252E7',
              position: 'absolute',
              bottom: '-20%',
              left: '-35%',
              opacity: 0.4,
            }}></View>

          <Text
            style={{
              fontFamily: 'Candal-Regular',
              color: 'white',
              fontSize: 60,
              position: 'absolute',
              bottom: '0%',
              left: '0%',
              opacity: 0.6,
              transform: [{rotate: '-20deg'}],
            }}>
            log(x)
          </Text>

          <Text
            style={{
              fontFamily: 'Candal-Regular',
              color: 'white',
              fontSize: 60,
              position: 'absolute',
              bottom: '15%',
              left: '0%',
              opacity: 0.6,
              transform: [{rotate: '-20deg'}],
            }}>
            ∫2x
          </Text>
        </>
      );
    case 'Login':
      return (
        <>
          <View
            style={{
              width: 380,
              height: 380,
              borderRadius: 380 / 2,
              backgroundColor: '#8252E7',
              position: 'absolute',
              bottom: '-30%',
              left: '-50%',
              borderColor: 'transparent',
              borderWidth: 1,
              opacity: 0.5,
            }}></View>

          <View
            style={{
              width: 380,
              height: 380,
              borderRadius: 380 / 2,
              backgroundColor: '#9b74eb',
              position: 'absolute',
              top: '-30%',
              right: '-50%',
              borderColor: 'transparent',
              borderWidth: 1,
              opacity: 0.5,
            }}></View>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              backgroundColor: '#7549cf',
              position: 'absolute',
              top: '14%',
              left: '15%',
              borderColor: 'transparent',
              borderWidth: 1,
              opacity: 0.8,
            }}></View>
        </>
      );
    case 'Register':
      return (
        <>
          <View
            style={{
              width: 380,
              height: 380,
              borderRadius: 380 / 2,
              backgroundColor: '#8252E7',
              position: 'absolute',
              bottom: '-30%',
              right: '-50%',
              borderColor: 'transparent',
              borderWidth: 1,
              opacity: 0.3,
            }}></View>

          <View
            style={{
              width: 420,
              height: 420,
              borderRadius: 420 / 2,
              backgroundColor: '#9b74eb',
              position: 'absolute',
              top: '-40%',
              left: '-50%',
              borderColor: 'transparent',
              borderWidth: 1,
              opacity: 0.3,
            }}></View>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              backgroundColor: '#7549cf',
              position: 'absolute',
              top: '2%',
              right: '5%',
              borderColor: 'transparent',
              borderWidth: 1,
              opacity: 0.4,
            }}></View>
        </>
      );
  }
};

export default Background;

const styles = StyleSheet.create({});
