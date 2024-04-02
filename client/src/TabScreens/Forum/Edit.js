import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {auth$} from '../../Redux/selectors';
import {createPostRequest, updatePostRequest} from '../../Redux/actions';
import Header from '../../Components/Header';
import Background from '../../Components/Background';
import {useRoute} from '@react-navigation/native';

import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import {updatePost} from '../../apis';

const Edit = ({navigation}) => {
  const [img, setImg] = useState();
  const auth = useSelector(auth$);
  const route = useRoute();
  const category = route.params.category;
  const content = route.params.content;
  const image = route.params.image;
  const postID = route.params.postID;
  const data = [
    {key: '1', value: 'Mathematics', disabled: false},
    {key: '2', value: 'Numerical Method', disabled: false},
    {key: '3', value: 'Geometric', disabled: false},
    {key: '4', value: 'Probability', disabled: false},
    {key: '5', value: 'Physics', disabled: false},
    {key: '6', value: 'Information Technology', disabled: false},
  ];
  const [input, setInput] = useState({
    image: image,
    // id: postID,
    user_id: auth.id,
    category: category,
    content: content,
    // post_comments: [
    //   {
    //     comment_id: 'a309e0e2-2b77-4377-aa3c-commentid',
    //     user_id: 'a309e0e2-2b77-4377-aa3c-18606394b982',
    //   },
    // ],
  });
  const handleChange = (name, text) => {
    setInput({...input, [name]: text});
  };
  const dispatch = useDispatch();

  return (
    <>
      <Header nav={'TabNavigator'} content={'Update Post'} />
      <Background type={'Create/Update'} />
      <View style={styles.updatePostContainer}>
        <SelectList
          placeholder="Category"
          setSelected={val => handleChange('category', val)}
          data={data}
          save="value"
          defaultOption={data.filter(item => item.value === category)[0]}
        />
        <View>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Content"
            onChangeText={text => handleChange('content', text)}
            style={styles.inputField}
            defaultValue={content}
          />
          {/* 
          <TouchableOpacity style={styles.imageIcon} onPress={upload}>
            <FontAwesomeIcon
              onPress={upload}
              icon={faPaperclip}
              color={'#2874fc'}
              size={20}
            />
          </TouchableOpacity> */}
        </View>
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

        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => {
            // dispatch(createPostRequest(input));
            // navigation.navigate('TabNavigator');
            dispatch(updatePostRequest(postID, input));
            navigation.goBack();
          }}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Edit;

const styles = StyleSheet.create({
  updatePostContainer: {
    flex: 1,
    marginTop: '5%',
    gap: 24,
  },
  inputField: {
    borderWidth: 3,
    borderColor: '#2874fc',
    borderRadius: 12,
    paddingLeft: 16,
    // fontSize: 22,
    textAlignVertical: 'top',
  },
  imageButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  imageText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
    color: '#fff',
  },
  imageIcon: {
    position: 'absolute',
    bottom: '10%',
    right: '3%',
  },
  submitText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 26,
    color: 'white',
  },
});
