import {View, Text, LogBox, StatusBar} from 'react-native';
import NavigatorScreen from './src/TabScreens';
import {Provider} from 'react-redux';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './src/Redux/reducers';
import mySaga from './src/Redux/sagas';
const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

const App = () => {
  LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);
  return (
    <Provider store={store}>
      <NavigatorScreen />
    </Provider>
  );
};

export default App;
