import {useRef} from 'react';
import {SafeAreaView, Button} from 'react-native';
import {WebView} from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

import {html} from '../../../Components/html';
import Header from '../../../Components/Header';
import {fundamentalCaluclus} from '../../../apis/cal.api';

const Fundamental = ({navigation}) => {
  const webviewRef = useRef(null);
  const route = useRoute();
  const mathText = route.params.mathText;

  const handleSubmit = async data => {
    await fundamentalCaluclus(data).then(res => {
      try {
        if (res.data.message) {
          console.error(res.data.message);
        } else {
          console.log('##########', res.data.result.length);

          if (res.data.result.length < 1000) {
            navigation.navigate('Fundamental SOL', {
              data: res.data.result,
              equation: res.data.equation,
              raw_eq: data,
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

  const onMessage = data => {
    handleSubmit(data.nativeEvent.data);
  };

  const handleButtonClick = () => {
    if (mathText !== null) {
      webviewRef.current.injectJavaScript(
        `changeData(${JSON.stringify(mathText)});`,
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header nav={'CalculusList'} />
      {mathText !== '' && (
        <Button onPress={handleButtonClick} title="Edit Equation" />
      )}
      <WebView
        ref={webviewRef}
        style={{flex: 1, padding: 0, margin: 0}}
        scalesPageToFit={false}
        bounces={false}
        scrollEnabled={false}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        onError={() => console.log('Something went wrong')}
        source={{
          html: html,
        }}
      />
    </SafeAreaView>
  );
};

export default Fundamental;
