import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faEllipsis} from '@fortawesome/free-solid-svg-icons';
import PostModal from './PostModal';
import {useNavigation} from '@react-navigation/native';

const Post = ({
  id,
  category,
  modal,
  setModal,
  userName,
  content,
  image,
  postId,
}) => {
  console.log(postId);
  const navigation = useNavigation();
  return (
    <View style={styles.postContainer}>
      {modal === id && (
        <PostModal
          postID={postId}
          category={category}
          content={content}
          image={image}
        />
      )}
      <View style={styles.postHeader}>
        <Text style={styles.postCategory}>{category}</Text>
        <View style={{position: 'relative', zIndex: 0}}>
          <TouchableOpacity onPress={() => setModal(modal === id ? false : id)}>
            <FontAwesomeIcon size={24} color="#8252E7" icon={faEllipsis} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.postContent}>{content}</Text>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Image
          style={{
            width: '95%',
            height: undefined,
            aspectRatio: 2,
            resizeMode: 'contain',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 12,
          }}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={styles.postConnect}>
        <View style={styles.postAskerInfo}>
          <View style={styles.askerAvt}>
            <FontAwesomeIcon color={'white'} icon={faUser} />
          </View>
          <Text style={styles.askerName}>{userName}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Post', {
              postCategory: category,
              postContent: content,
              postUserName: userName,
              postImage: image,
              postId: postId,
            })
          }
          style={styles.postAnswerButton}>
          <Text style={styles.answerText}>VIEW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    position: 'relative',
    zIndex: 1,
    elevation: 0,
    marginTop: '4%',
    paddingBottom: '8%',
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 2,
    gap: 12,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postCategory: {
    fontFamily: 'Kanit-Medium',
    fontSize: 18,
    color: '#a8a8a8',
  },
  postContent: {
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
    lineHeight: 22,
    color: 'black',
  },
  postConnect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postAnswerButton: {
    width: 120,
    height: 40,
    borderRadius: 32,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    fontFamily: 'Kanit-Medium',
    color: 'white',
    fontSize: 16,
  },
  postAskerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  askerAvt: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  askerName: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
    color: '#a8a8a8',
  },
});
