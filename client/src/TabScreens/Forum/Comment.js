import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useState} from 'react';
import Header from '../../Components/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faImage,
  faUser,
  faPaperPlane,
  faCross,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import {useRoute} from '@react-navigation/native';
import {auth$} from '../../Redux/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {createCommentRequest} from '../../Redux/actions';
import ImagePicker from 'react-native-image-crop-picker';

const Comment = ({navigation}) => {
  const auth = useSelector(auth$);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const category = route.params.category;
  const userName = route.params.userName;
  const content = route.params.content;
  const image = route.params.image;
  const postId = route.params.postId;
  const [input, setInput] = useState({
    image_cmt: null,
    user_id: auth.id,
    upvote: 0,
    downvote: 0,
  });
  const handleChange = (name, text) => {
    setInput({...input, [name]: text});
  };

  const upload = () => {
    ImagePicker.openPicker({
      // compressImageMaxWidth: 600,
      // compressImageMaxHeight: 400,
      freeStyleCropEnabled: true,
      includeBase64: true,
      // width: 600,
      // height: 300,
      cropping: true,
    }).then(image => {
      handleChange('image_cmt', `data:${image.mime};base64,${image.data}`);
    });
  };
  return (
    <>
      <Header content={'Comment'} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <FontAwesomeIcon size={32} color="#8252E7" icon={faClose} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>You are answering {userName}</Text>
            <View style={styles.postUserInfo}>
              <View style={styles.userAvt}>
                <FontAwesomeIcon color={'white'} icon={faUser} />
              </View>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <View style={styles.postUserContent}>
              <Text style={styles.postUserContentText}>{content}</Text>
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
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.commentContainer}>
        <View style={styles.commentButton}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Review the Question</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={upload}>
            <FontAwesomeIcon
              style={styles.commentIcon}
              size={32}
              color="#8252E7"
              icon={faImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(createCommentRequest(postId, input));
              navigation.goBack();
            }}>
            <FontAwesomeIcon size={32} color="#8252E7" icon={faPaperPlane} />
          </TouchableOpacity>
        </View>
        <TextInput
          multiline={true}
          numberOfLines={8}
          placeholder="Write down your answer..."
          onChangeText={text => handleChange('content_cmt', text)}
          style={styles.commentInput}
        />
      </View>
    </>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
  },
  modalView: {
    backgroundColor: 'white',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 32,
    paddingTop: '12%',
    width: '95%',
    height: 'auto',
  },
  modalTitle: {
    textAlign: 'center',
    fontFamily: 'Kanit-Medium',
    fontSize: 22,
    color: '#8252E7',
  },
  closeButton: {
    position: 'absolute',
    top: '2%',
    right: '5%',
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvt: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
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
  commentButton: {
    width: '95%',
    position: 'absolute',
    bottom: '2%',
    right: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  commentIcon: {},
  reviewButton: {
    width: '75%',
    height: 48,
    backgroundColor: '#8252E7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButtonText: {
    fontFamily: 'Kanit-Medium',
    fontSize: 22,
    color: 'white',
  },
  commentInput: {
    width: '100%',
    paddingLeft: '5%',
    fontSize: 22,
    textAlignVertical: 'top',
  },
});
