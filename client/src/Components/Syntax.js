// Syntax.js
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MathView, {MathText} from 'react-native-math-view';

const Syntax = ({visible, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Math Syntax Instructions</Text>
          <MathText
            value={`1. \\(exp()\\) for exponential: \\(exp(2) = e^2\\)`}
          />
          <MathText
            value={`2. \\(sqrt()\\) for square root: \\(sqrt(2) = \\sqrt{2}\\)`}
          />
          <MathText value={`3. For displaying power: x^2\\( = x^{2}\\)`} />

          {/* Add more syntax instructions as needed */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default Syntax;
