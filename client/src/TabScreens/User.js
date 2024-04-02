import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import Header from '../Components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import {auth$} from '../Redux/selectors';
import {logout} from '../Redux/actions';
import Buffer from '../Components/Buffer';

const User = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(auth$);
  const [role, setRole] = useState('Student');
  useEffect(() => {
    auth.isLogin === false && navigation.navigate('Auth');
  }, [auth]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <Header nav={'TabNavigator'} content={'Personal Information'} />
      <KeyboardAvoidingView
        behavior={'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
        style={styles.container}>
        <KeyboardAwareScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.infoContainer}>
          <ImageBackground
            source={{
              uri: 'https://sangtao.sawaco.com.vn/wwwimages/Avatar/defaultavatar.png',
            }}
            style={styles.userAvt}></ImageBackground>
          <View style={styles.userText}>
            <Text style={styles.userNameText}>{auth.userName}</Text>
            <Text style={styles.userSubText}>Email: {auth.email} </Text>
            <Text style={styles.userSubText}>
              Logged in with: AiMA super pro
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Personal Posts', {
                userName: auth.userName,
                userRole: auth.role,
              })
            }
            style={styles.manageButton}>
            <Text style={styles.buttonText}>See All Posts</Text>
          </TouchableOpacity>
          <View style={styles.inputField}>
            <Text style={styles.inputText}>Name</Text>
            <TextInput style={styles.input} defaultValue={auth.userName} />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.inputText}>Email</Text>
            <TextInput style={styles.input} defaultValue={auth.email} />
          </View>

          <View style={styles.typeField}>
            <Text style={styles.inputText}>Your job</Text>
            <View style={styles.jobInput}>
              <Text style={styles.jobText}>{auth.role}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => dispatch(logout())}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <Buffer backgroundColor={'#f2f7fb'} />
      </KeyboardAvoidingView>
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8252E7',
  },
  infoContainer: {
    flexGrow: 1,
    backgroundColor: '#f2f7fb',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'transparent',
    gap: 16,
  },
  userAvt: {
    marginTop: 24,
    width: 84,
    height: 84,
    borderRadius: 84 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // borderColor: '#8252E7',
    // borderWidth: 4,
  },
  userText: {},
  userNameText: {
    fontFamily: 'Kanit-Medium',
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  },
  userSubText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Kanit-Light',
    color: 'black',
  },
  inputField: {
    width: '90%',
    gap: 8,
  },
  inputText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Kanit-Regular',
  },
  input: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 18,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 36,
  },
  typeField: {
    width: '90%',
    gap: 8,
  },
  jobInput: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#92c6fc',
    // paddingVertical: 16,
    // paddingHorizontal: 32,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    overflow: 'hidden',
  },
  jobText: {
    color: 'white',
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
  },
  jobStudent: {
    width: '50%',
    borderRightColor: '#fff',
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobTeacher: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    width: '90%',
    height: 46,
    backgroundColor: '#EE4D2D',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Kanit-Regular',
  },
  manageButton: {
    width: '90%',
    height: 46,
    backgroundColor: '#6b77d0',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
