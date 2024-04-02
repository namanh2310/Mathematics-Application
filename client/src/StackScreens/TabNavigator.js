import {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../TabScreens/HomeScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faCamera,
  faUserGroup,
  faUserEdit,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import ScanScreen from '../TabScreens/ScanScreen';
import User from '../TabScreens/User';
import Notification from '../TabScreens/Notification';
import Main from '../TabScreens/Forum/Main';
import Empty from './Empty';
import {useRoute} from '@react-navigation/native';
import Auth from './Auth';
import {auth$} from '../Redux/selectors';
import {useSelector, useDispatch} from 'react-redux';

const TabNavigator = () => {
  const isLogin = useSelector(auth$);
  console.log(isLogin);
  const Tab = createBottomTabNavigator();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [hide, setHide] = useState(false);

  function getWidth() {
    let width = Dimensions.get('window').width;

    width = width - 80;

    return width / 5;
  }
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: '2%',
            marginHorizontal: 20,
            borderRadius: 24,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 50,
              height: 50,
            },
            paddingHorizontal: 20,
          },
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomePage}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.controllerBtn}>
                <FontAwesomeIcon
                  icon={faHouse}
                  color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                  size={24}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              setHide(false);
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="Empty"
          component={Empty}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.controllerBtn}>
                <FontAwesomeIcon
                  icon={faBell}
                  color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                  size={24}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              setHide(false);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="ScanScreen"
          component={ScanScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <>
                <View style={styles.activeBtn}>
                  <FontAwesomeIcon icon={faCamera} color="white" size={24} />
                </View>
              </>
            ),
          }}
          listeners={{
            tabPress: () => {
              setHide(true);
            },
          }}
        />

        <Tab.Screen
          name="Auth"
          component={isLogin.isLogin ? Main : Auth}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.controllerBtn}>
                <FontAwesomeIcon
                  icon={faUserGroup}
                  color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                  size={24}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              setHide(false);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="User"
          component={isLogin.isLogin ? User : Auth}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.controllerBtn}>
                <FontAwesomeIcon
                  icon={faUserEdit}
                  color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                  size={24}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              setHide(false);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>

      <Animated.View
        style={
          hide
            ? {
                display: 'none',
                width: getWidth() - 20,
                height: 4,
                backgroundColor: 'rgba(34,115,254,255)',
                position: 'absolute',
                bottom: 70,
                left: 50,
                borderRadius: 20,
                transform: [{translateX: tabOffsetValue}],
              }
            : {
                width: getWidth() - 20,
                height: 3,
                backgroundColor: 'rgba(34,115,254,255)',
                position: 'absolute',
                bottom: 70,
                left: 50,
                borderRadius: 20,
                transform: [{translateX: tabOffsetValue}],
              }
        }></Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  controllerBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  activeBtn: {
    position: 'absolute',
    top: '-30%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(34,115,254,255)',
  },
});

export default TabNavigator;
