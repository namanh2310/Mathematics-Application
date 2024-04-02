import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Buffer = ({backgroundColor}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 90,
        backgroundColor: backgroundColor,
      }}></View>
  );
};

export default Buffer;

const styles = StyleSheet.create({});
