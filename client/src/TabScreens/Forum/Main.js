import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Button,
  RefreshControl,
} from 'react-native';
import {useEffect, useCallback, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faEllipsis,
  faArrowDown,
  faCaretDown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addVoteRequest,
  getCommentsRequest,
  getPostRequest,
} from '../../Redux/actions';
import {post$, auth$} from '../../Redux/selectors';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import {color} from 'react-native-reanimated';
import PostModal from '../../Components/PostModal';
import {addVote} from '../../apis';

const categories = [
  {key: '1', value: 'All fields', disabled: false},
  {key: '2', value: 'Mathematics', disabled: false},
  {key: '3', value: 'Numerical Method', disabled: false},
  {key: '4', value: 'Geometric', disabled: false},
  {key: '5', value: 'Probability', disabled: false},
  {key: '6', value: 'Physics', disabled: false},
  {key: '7', value: 'Information Technology', disabled: false},
];

const Main = ({navigation}) => {
  const [category, setCategory] = useState('All fields');
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(post$);
  const auth = useSelector(auth$);

  useEffect(() => {
    dispatch(getPostRequest());
    console.log('cdm');
  }, [dispatch]);

  const Item = ({
    category,
    content,
    userID,
    img,
    postID,
    firstName,
    lastName,
  }) => (
    <View style={styles.postContainer}>
      {modal === postID && (
        <PostModal
          postID={postID}
          category={category}
          content={content}
          image={img}
          type={'Post'}
        />
      )}
      {/* <Button
        title="test"
        onPress={() => dispatch(getCommentsRequest(postID))}
      /> */}

      <View style={styles.postHeader}>
        <Text style={styles.postCategory}>{category}</Text>
        {auth.id === userID && (
          <View style={{position: 'relative', zIndex: 0}}>
            <TouchableOpacity
              onPress={() => setModal(modal === postID ? false : postID)}>
              <FontAwesomeIcon size={24} color="#8252E7" icon={faEllipsis} />
            </TouchableOpacity>
          </View>
        )}
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
            uri: img,
          }}
        />
      </View>
      <View style={styles.postConnect}>
        <View style={styles.postAskerInfo}>
          <View style={styles.askerAvt}>
            <FontAwesomeIcon color={'white'} icon={faUser} />
          </View>
          <Text style={styles.askerName}>
            {firstName} {lastName}
          </Text>
        </View>
        <View style={styles.bottomRightContent}>
          {/* <TouchableOpacity
            style={styles.voteField}
            onPress={() =>
              dispatch(addVoteRequest({post_id: postID, user_id: auth.id}))
            }>
            <FontAwesomeIcon icon={faHeart} color="#fff" />
            <Text style={styles.voteCount}>1</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Post', {
                postCategory: category,
                postContent: content,
                postUserName: `${firstName} ${lastName}`,
                postImage: img,
                postId: postID,
              })
            }
            style={styles.postAnswerButton}>
            <Text style={styles.answerText}>VIEW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const filterData = posts.data.filter(item => {
    if (category === 'All fields') {
      return item;
    } else {
      return item.category === category;
    }
  });

  return (
    <View style={styles.forumContainer}>
      <View style={styles.createField}>
        <View style={styles.left}>
          <ImageBackground
            source={{
              uri: 'https://sangtao.sawaco.com.vn/wwwimages/Avatar/defaultavatar.png',
            }}
            style={styles.userAvt}>
            {/* <FontAwesomeIcon size={36} color="#c8c8c8" icon={faUser} /> */}
          </ImageBackground>
          <TouchableOpacity
            onPress={() => navigation.navigate('Create Post')}
            style={styles.createButton}>
            <Text style={styles.placeholderText}>
              Write down your question...
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.imagePicker}>
          <FontAwesomeIcon size={24} color="#8252E7" icon={faImage} />
        </View> */}
      </View>

      <View style={styles.postsContainer}>
        <View style={{justifyContent: 'center'}}>
          <SelectList
            placeholder="Sort by Categories"
            setSelected={val => setCategory(val)}
            boxStyles={{
              backgroundColor: '#13b6fc',
              borderRadius: 20,
              borderColor: '#8252E7',
              borderWidth: 3,
            }}
            inputStyles={{
              color: 'white',
              fontFamily: 'Kanit-Regular',
              fontSize: 20,
            }}
            data={categories}
            save="value"
          />
          <FontAwesomeIcon
            style={{position: 'absolute', right: '5%'}}
            icon={faCaretDown}
            color={'#fff'}
            size={24}
          />
        </View>
        {posts.isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filterData}
            renderItem={({item}) => (
              <Item
                category={item.category}
                content={item.content}
                userID={item.user_id}
                img={item.image}
                postID={item.id}
                firstName={item.firstName}
                lastName={item.lastName}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  forumContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  createField: {
    flex: 0.15,
    backgroundColor: '#8252E7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  userAvt: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  createButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.186)',
    borderRadius: 24,
    width: '80%',
  },
  placeholderText: {
    fontFamily: 'Kanit-Light',
    color: 'white',
    fontSize: 18,
    paddingLeft: 8,
  },
  imagePicker: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#fff',
  },

  postsContainer: {
    flex: 0.85,
    marginHorizontal: '5%',
    marginTop: '3%',
    marginBottom: 64,
  },
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
  bottomRightContent: {
    flexDirection: 'row',
    gap: 8,
  },
  voteField: {
    height: 40,
    width: 80,
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
