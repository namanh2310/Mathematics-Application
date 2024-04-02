import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons';

const PostOptions = ({authID, userID, setModal, modal, itemID}) => {
  return (
    <>
      {authID === userID && (
        <View style={{position: 'relative', zIndex: 0}}>
          <TouchableOpacity
            onPress={() => setModal(modal === itemID ? false : itemID)}>
            <FontAwesomeIcon size={24} color="#8252E7" icon={faEllipsis} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default PostOptions;

const styles = StyleSheet.create({});
