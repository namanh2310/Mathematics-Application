import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MatrixComponent = ({matrixArray}) => {
  return (
    <View style={styles.container}>
      <View style={styles.matrixContainer}>
        {matrixArray.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value, colIndex) => (
              <Text key={colIndex} style={styles.cell}>
                {value}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  matrixContainer: {
    borderWidth: 2,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});

export default MatrixComponent;
