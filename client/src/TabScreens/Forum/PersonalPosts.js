import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useState, useEffect} from 'react';
import Header from '../../Components/Header';

import {useDispatch, useSelector} from 'react-redux';
import {getPostRequest} from '../../Redux/actions';
import {auth$, post$} from '../../Redux/selectors';
import {useRoute} from '@react-navigation/native';
import Post from '../../Components/Post';

const PersonalPosts = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const route = useRoute();
  const userName = route.params.userName;
  const userRole = route.params.userRole;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostRequest());
  }, [dispatch]);
  const posts = useSelector(post$);
  const auth = useSelector(auth$);

  const filterData = posts.data.filter(item => item.user_id === auth.id);
  return (
    <>
      <Header nav={'User'} content={userName} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.userInfo}>
            <ImageBackground
              source={{
                uri: 'https://www.pngkey.com/png/full/540-5404922_transparent-google-search-quotes-math-transparent.png',
              }}
              resizeMode="cover"
              style={styles.userBackground}>
              <ImageBackground
                source={{
                  uri: 'https://sangtao.sawaco.com.vn/wwwimages/Avatar/defaultavatar.png',
                }}
                style={styles.userAvt}></ImageBackground>
            </ImageBackground>
            <View style={styles.userText}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userRole}>{userRole}</Text>
            </View>
            <View style={styles.userButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Create Post')}
                style={styles.createPostBtn}>
                <Text style={styles.buttonText}>+ Create a new post...</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.postsContainer}>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={styles.postsListTitle}>Your posts</Text>
            </View>

            {filterData.map((item, index) => (
              <Post
                key={index}
                postId={item.id}
                category={item.category}
                content={item.content}
                userName={userName}
                modal={modal}
                setModal={setModal}
                image={item.image}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default PersonalPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  userInfo: {
    width: '100%',
    position: 'relative',
    paddingBottom: '5%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 10,
  },
  userBackground: {
    width: '100%',
    height: undefined,
    aspectRatio: 4,
    backgroundColor: '#FFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  userAvt: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    bottom: '-85%',
    left: '3%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  userText: {
    marginLeft: '50%',
    gap: -4,
  },
  userName: {
    fontSize: 32,
    fontFamily: 'Kanit-Medium',
    color: 'black',
  },
  userRole: {
    fontSize: 18,
    color: '#b2b2b2',
    fontFamily: 'Kanit-Regular',
  },
  userButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
  },
  createPostBtn: {
    width: '90%',
    height: 48,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: 'Kanit-Medium',
    color: 'white',
    fontSize: 20,
  },
  postsContainer: {
    marginHorizontal: '5%',
    marginTop: '3%',
    marginBottom: 64,
  },
  postsListTitle: {
    padding: 12,
    borderRadius: 28,
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    color: 'white',
    backgroundColor: '#6b77d0',
  },
});
