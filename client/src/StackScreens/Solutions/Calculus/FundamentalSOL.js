import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import MathView, {MathText} from 'react-native-math-view';
import axios from 'axios';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import Header from '../../../Components/Header';
import {fundamentalCaluclus} from '../../../apis/cal.api';
import {AIScannerApp} from '../../../apis/ai.api';

const Fundamental = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const scanImg = route.params.scanImg;
  const result = route.params.data;
  const equation = route.params.equation;
  let raw_eq = route.params.raw_eq;

  raw_eq = raw_eq === undefined ? equation : raw_eq;
  const step = route.params.step;
  console.log('stepstep', step);
  const img = route.params.img;
  const error = route.params.error;

  const handleSubmit = async data => {
    await fundamentalCaluclus(data).then(res => {
      try {
        if (res.data.message) {
          console.error(res.data.message);
        } else {
          if (res.data.result.length < 1000) {
            navigation.navigate('ReFundamental SOL', {
              data: res.data.result,
              equation: res.data.equation,
              step: res.data.step,
              img: res.data.img,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const regenerateScanResult = async () => {
    setIsLoading(true);
    console.log('scanImg', scanImg);
    await AIScannerApp({regenerate_status: true, img: scanImg})
      .then(res => {
        setModalVisible(true);
        setOptions(res.data.res_list);
      })
      .catch(err => {
        navigation.navigate('TabNavigator');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editEquation = mathText => {
    setModalVisible(false);

    navigation.navigate('Fundamental', {mathText});
  };

  const CustomModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>OPTIONS</Text>
            {options.map(el => (
              <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => handleSubmit(el)}>
                  <MathText
                    style={styles.mathText}
                    value={`\\(${el} \\)`}
                    direction="ltr"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editEquation(el)}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    color={'#000'}
                    size={16}
                    style={styles.optionIcon}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  if (equation === undefined || error) {
    return (
      <>
        <Header />
        <View style={styles.container}>
          <View style={styles.infor}>
            <Text style={styles.textError}>
              Our system is unable to process your image at the moment, please
              try again!
            </Text>
            <TouchableOpacity
              style={styles.showStepBtn}
              onPress={regenerateScanResult}>
              <Text style={styles.textBtn}>Re-generate</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomModal />
      </>
    );
  }

  function StepEquation() {
    return (
      <>
        {step.map(el => (
          <MathText style={styles.mathText} value={el} direction="ltr" />
        ))}
      </>
    );
  }

  return (
    <>
      <Header content={'Calculus'} />

      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
        <View style={styles.infor}>
          <MathView style={styles.equation} resizeMode="cover" math={raw_eq} />

          {result && result.length < 500 ? (
            <MathView
              style={
                typeof result === 'string' && result.length <= 40
                  ? styles.result
                  : typeof result === 'object' && result.length >= 4
                  ? styles.result_scale
                  : typeof result === 'string' && result.length >= 40
                  ? styles.result_scale
                  : styles.result
              }
              resizeMode="cover"
              math={typeof result !== 'string' ? result.toString() : result}
            />
          ) : (
            <View>
              <Text style={styles.cannot}>Can not calculate</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.showStepBtn}
            onPress={regenerateScanResult}>
            <Text onPress={regenerateScanResult} style={styles.textBtn}>
              Re-generate
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.step}>
          <ScrollView style={{marginHorizontal: '5%'}}>
            <StepEquation />
            {img && (
              <Image
                source={{uri: img}}
                style={{width: '100%', height: undefined, aspectRatio: 1.5}}
              />
            )}
          </ScrollView>
        </View>
      </View>
      <CustomModal />
    </>
  );
};

export default Fundamental;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    elevation: 3, // works on android
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  infor: {
    flex: 0.3,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '10%',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    width: '100%',
  },
  equation: {
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
    maxWidth: '100%',
  },
  result: {
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
  },

  result_scale: {
    width: '100%',
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
  },

  text: {
    fontSize: 24,
    fontWeight: 600,
    color: '#fff',
  },
  textError: {
    fontSize: 24,
    fontWeight: 600,
    width: '100%',
    color: 'black',
    marginBottom: '5%',
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
    borderColor: '#ed4337',
    borderWidth: 8,
    padding: '5%',
    borderRadius: 24,
  },
  showStepBtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  textBtn: {
    fontSize: 18,
    color: '#000',
    fontWeight: 500,
  },
  step: {
    flex: 0.7,
  },
  stepText: {
    fontSize: 20,
    color: 'black',
    marginTop: '5%',
  },
  stepTitle: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'black',
  },
  mathText: {
    marginLeft: '3%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cannot: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 700,
    marginBottom: '5%',
  },
});
