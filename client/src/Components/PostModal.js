import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {post$} from '../Redux/selectors';
import {deleteCommentRequest, deletePostRequest} from '../Redux/actions';
import {useNavigation} from '@react-navigation/native';

const PostModal = ({category, content, type, image, commentID, postID}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const post = useSelector(post$);
  const currentPost = post.currentPost;
  // console.log(type);
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit Post', {
            category: category,
            content: content,
            image: image,
            postID: postID,
          })
        }
        style={{
          width: '85%',
          flex: 1,
          justifyContent: 'center',
          borderBottomColor: '#d8d8d8',
          borderBottomWidth: 1,
        }}>
        <View style={styles.buttonOptions}>
          <FontAwesomeIcon size={18} color="#8252E7" icon={faEdit} />
          <Text style={styles.buttonText}>Edit</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          type === 'Comment'
            ? dispatch(deleteCommentRequest(commentID))
            : dispatch(deletePostRequest(postID));
          // type === 'Comment' ? console.log('Comment') : console.log('Else');
        }}
        style={{width: '80%', flex: 1, justifyContent: 'center'}}>
        <View style={styles.buttonOptions}>
          <FontAwesomeIcon size={18} color="#8252E7" icon={faTrash} />
          <Text style={styles.buttonText}>Delete</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    width: 120,
    top: '5%',
    right: '8%',
    height: 80,
    zIndex: 1000,
    borderRadius: 16,
    elevation: 10,
    backgroundColor: '#fff',
  },
  buttonOptions: {
    flexDirection: 'row',
    gap: 12,
    fontFamily: 'Kanit-Light',
    fontSize: 18,
    justifyContent: 'center',
  },
  buttonText: {
    minWidth: 40,
  },
});
