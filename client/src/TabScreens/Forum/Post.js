import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import Header from '../../Components/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faEllipsis, faHeart} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {auth$, comment$, post$} from '../../Redux/selectors';
import Buffer from '../../Components/Buffer';
import {
  addVoteRequest,
  getCommentsRequest,
  getPostByIdRequest,
  getVoteByUserIdRequest,
} from '../../Redux/actions';
import PostOptions from '../../Components/PostOptions';
import PostModal from '../../Components/PostModal';
import {addVote} from '../../apis';

const Post = ({navigation}) => {
  const dispatch = useDispatch();
  const comment = useSelector(comment$);
  const auth = useSelector(auth$);
  const post = useSelector(post$);
  const currentPost = post.currentPost;
  const route = useRoute();
  const category = route.params.postCategory;
  // const content = route.params.postContent;
  const userName = route.params.postUserName;
  // const img = route.params.postImage;
  const postId = route.params.postId;
  // const userID = route.params.userID;
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getPostByIdRequest(postId));
    dispatch(getCommentsRequest(postId));
    dispatch(getVoteByUserIdRequest(postId));
  }, [dispatch]);

  console.log('===============', comment.voteList);
  return (
    <>
      <Header nav={'TabNavigator'} content={category} />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Comment', {
              userName: userName,
              image: currentPost.image,
              content: currentPost.content,
              category: currentPost.category,
              postId: currentPost.id,
            })
          }
          style={styles.answerField}>
          <Text style={styles.answerTitle}>Answer</Text>
        </TouchableOpacity>
        {post.isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.postUserInfo}>
              <View style={styles.userAvt}>
                <FontAwesomeIcon color={'white'} icon={faUser} />
              </View>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <View style={styles.postUserContent}>
              <Text style={styles.postUserContentText}>
                {currentPost.content}
              </Text>
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
                    uri: currentPost.image,
                  }}
                />
              </View>
            </View>
            <View style={styles.commentContainer}>
              <View style={styles.commentTitleField}>
                <Text style={styles.commentTitle}>Comments</Text>
              </View>
              {typeof comment.data !== 'string' && comment.isLoading ? (
                <Text>Loading...</Text>
              ) : (
                comment.data.map(item => (
                  <>
                    <View style={styles.commentList}>
                      {modal === item.id && (
                        <PostModal
                          commentID={item.id}
                          postID={currentPost.id}
                          category={currentPost.category}
                          content={currentPost.content}
                          image={currentPost.image}
                          type={'Comment'}
                        />
                      )}
                      <View
                        style={[
                          styles.postUserInfo,
                          {marginTop: '5%', justifyContent: 'space-between'},
                        ]}>
                        <View style={styles.userLeft}>
                          <View style={styles.userAvt}>
                            <FontAwesomeIcon color={'white'} icon={faUser} />
                          </View>
                          <View style={styles.userBasicInfo}>
                            <Text style={styles.userName}>
                              {item.firstName} {item.lastName}
                            </Text>
                            <Text style={styles.userCreatedTime}>
                              {item.created_at}
                            </Text>
                          </View>
                        </View>
                        <PostOptions
                          userID={item.user_id}
                          authID={auth.id}
                          setModal={setModal}
                          modal={modal}
                          itemID={item.id}
                        />
                      </View>
                      <View style={styles.answererField}>
                        <Text style={styles.answererFieldText}>Answer :</Text>
                      </View>
                      <View style={styles.postUserContent}>
                        <Text style={styles.postUserContentText}>
                          {item.content_cmt}
                        </Text>
                        <View style={{width: '100%', alignItems: 'center'}}>
                          {item.image_cmt !== 'None' ? (
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
                                uri: item.image_cmt,
                              }}
                            />
                          ) : (
                            <></>
                          )}
                          <View
                            style={{
                              width: '95%',
                              alignItems: 'flex-end',
                              marginTop: 8,
                            }}>
                            <TouchableOpacity
                              style={
                                // comment.voteList.length !== 0
                                //   ? comment.voteList.map(voted =>
                                //       voted === item.id
                                //         ? styles.voteField
                                //         : styles.voteFieldActive,
                                //     )
                                styles.voteFieldActive
                              }
                              onPress={() =>
                                dispatch(
                                  addVoteRequest({
                                    cmt_id: item.id,
                                    post_id: postId,
                                    user_id: auth.id,
                                  }),
                                )
                              }>
                              <FontAwesomeIcon icon={faHeart} color="#fff" />
                              <Text style={styles.thanksText}>Thanks</Text>
                              <Text style={styles.voteCount}>
                                {item.upvote}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                ))
              )}
            </View>
            <Buffer backgroundColor={'#fff'} />
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  scrollContainer: {
    flexGrow: 1,
    gap: 8,
    marginHorizontal: 12,
    marginTop: 12,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: 12,
  },
  userLeft: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  userAvt: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userBasicInfo: {},
  userName: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
    color: '#000',
  },
  userCreatedTime: {
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
    color: '#a8a8a8',
  },
  postUserContent: {
    flexDirection: 'column',
    gap: 12,
  },
  postUserContentText: {
    fontSize: 20,
    color: 'black',
  },
  answerField: {
    position: 'absolute',
    bottom: '2%',
    width: '100%',
    height: 48,
    backgroundColor: '#8252E7',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 1,
  },
  answerTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Kanit-Medium',
  },
  commentContainer: {
    marginTop: '2%',
  },
  commentTitleField: {
    paddingBottom: 4,
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
  },
  commentTitle: {
    fontFamily: 'Kanit-Medium',
    color: 'black',
    fontSize: 24,
  },
  answererField: {
    marginTop: '2%',
  },
  answererFieldText: {
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    color: '#000',
  },
  voteField: {
    height: 40,
    width: 150,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 24,
  },
  voteFieldActive: {
    height: 40,
    width: 150,
    backgroundColor: '#db7093',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 24,
  },
  voteCount: {
    color: 'white',
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
  },
  thanksText: {
    color: 'white',
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
  },
});
