import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {auth$} from '../../Redux/selectors';
import {createPostRequest} from '../../Redux/actions';
import Header from '../../Components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import Background from '../../Components/Background';
import {SelectList} from 'react-native-dropdown-select-list';

const Create = ({navigation}) => {
  const [img, setImg] = useState(null);
  const auth = useSelector(auth$);

  const data = [
    {key: '1', value: 'Mathematics', disabled: false},
    {key: '2', value: 'Numerical Method', disabled: false},
    {key: '3', value: 'Geometric', disabled: false},
    {key: '4', value: 'Probability', disabled: false},
    {key: '5', value: 'Physics', disabled: false},
    {key: '6', value: 'Information Technology', disabled: false},
  ];

  const upload = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 400,
      freeStyleCropEnabled: true,
      includeBase64: true,
      width: 600,
      height: 300,
      cropping: true,
    }).then(image => {
      setImg(image);
      handleChange('image', `data:${image.mime};base64,${image.data}`);
    });
  };

  const [input, setInput] = useState({
    image:
      'https://cdn.dribbble.com/users/1507491/screenshots/4945826/media/116a8ebc414c519ad1cfc0fe63f79d3e.jpg?compress=1&resize=400x300',
    id: auth.id,
  });

  const handleChange = (name, text) => {
    setInput({...input, [name]: text});
  };

  const dispatch = useDispatch();

  const renderSelectedImage = () => {
    if (img) {
      return (
        <Image
          source={{uri: `data:${img.mime};base64,${img.data}`}}
          style={{width: '100%', height: 200, borderRadius: 12, marginTop: 10}}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Header nav={'TabNavigator'} />
      <Background type={'Create/Update'} />
      <View style={styles.createPostContainer}>
        <SelectList
          placeholder="Category"
          setSelected={val => handleChange('category', val)}
          data={data}
          save="value"
        />
        <View>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Content"
            onChangeText={text => handleChange('content', text)}
            style={styles.inputField}
          />

          {renderSelectedImage()}

          <TouchableOpacity style={styles.imageIcon} onPress={upload}>
            <FontAwesomeIcon
              onPress={upload}
              icon={faPaperclip}
              color={'#2874fc'}
              size={20}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => {
            dispatch(createPostRequest(input));
            navigation.navigate('TabNavigator');
          }}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Create;

const styles = StyleSheet.create({
  createPostContainer: {
    flex: 1,
    marginTop: '5%',
    gap: 24,
  },
  inputField: {
    borderWidth: 3,
    borderColor: '#2874fc',
    borderRadius: 12,
    paddingLeft: 16,
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
