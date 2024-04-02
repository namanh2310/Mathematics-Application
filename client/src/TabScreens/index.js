import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../StackScreens/Welcome';
import TabNavigator from '../StackScreens/TabNavigator';

//Auth
import Auth from '../StackScreens/Auth';
import Create from './Forum/Create';
import Register from '../StackScreens/Register';
import Post from './Forum/Post';
import PersonalPosts from './Forum/PersonalPosts';
import Edit from './Forum/Edit';
import Comment from './Forum/Comment';
import Verify from '../StackScreens/Verify';
import EnterEmailForgotPW from '../StackScreens/EnterEmailForgotPW';
import Notification from './Notification';

//Calculus
import CalculusList from '../routes/CalculusList';
import Fundamental from '../StackScreens/Methods/Calculus/Fundamental';
import FundamentalSol from '../StackScreens/Solutions/Calculus/FundamentalSOL';
//====

//Geometric
import GeoFundamental from '../StackScreens/Methods/Geometric/GeoFundamental';
import GeometricSOL from '../StackScreens/Solutions/Geometric/GeometricSOL';

//====

//TMC
import GoldenSection from '../StackScreens/Methods/TMC/Optimize/GoldenSection';
import GoldenSectionSOL from '../StackScreens/Solutions/TMC/Optimize/GoldenSectionSOL';
import Newton from '../StackScreens/Methods/TMC/Optimize/Newton';
import Parabolic from '../StackScreens/Methods/TMC/Optimize/Interpolation';
import NewtonMethodSOL from '../StackScreens/Solutions/TMC/Optimize/NewtonMethodSOL';
import EulerMethod from '../StackScreens/Methods/TMC/ODE/EulerMethod';
import EulerMethodSOL from '../StackScreens/Solutions/TMC/ODE/EulerMethodSOL';
import HeunMethod from '../StackScreens/Methods/TMC/ODE/HeunMethod';
import HeunMethodSOL from '../StackScreens/Solutions/TMC/ODE/HeunMethodSOL';
import TMCList from '../StackScreens/TMCList';
import MidPointMethod from '../StackScreens/Methods/TMC/ODE/MidPointMethod';
import RalstonMethod from '../StackScreens/Methods/TMC/ODE/RalstonMethod';
import ThirdOrderMethod from '../StackScreens/Methods/TMC/ODE/ThirdOrderMethod';
import MidPointMethodSOL from '../StackScreens/Solutions/TMC/ODE/MidPointMethodSOL';
import RalstonMethodSOL from '../StackScreens/Solutions/TMC/ODE/RalstonMethodSOL';
import ThirdOrderMethodSOL from '../StackScreens/Solutions/TMC/ODE/ThirdOrderMethodSOL';
import Classic4thOrder from '../StackScreens/Methods/TMC/ODE/Classic4thOrder';
import Classic4thOrderSOL from '../StackScreens/Solutions/TMC/ODE/Classic4thOrderSOL';
import Simpson13Rule from '../StackScreens/Methods/TMC/DiffnInt/Simpson13Rule';
import Simpson13RuleSOL from '../StackScreens/Solutions/TMC/DiffnInt/Simpson13RuleSOL';
import Simpson13RuleMA from '../StackScreens/Methods/TMC/DiffnInt/Simpson13RuleMA';
import Simpson13maSOL from '../StackScreens/Solutions/TMC/DiffnInt/Simpson13maSOL';
import Simpson38Rule from '../StackScreens/Methods/TMC/DiffnInt/Simpson38Rule';
import Simpson38SOL from '../StackScreens/Solutions/TMC/DiffnInt/Simpson38SOL';
import LRegression from '../StackScreens/Methods/TMC/CurveFitting/LRegression';
import LRegressionSOL from '../StackScreens/Solutions/TMC/CurveFitting/LRegressionSOL';
import SecOrderLR from '../StackScreens/Methods/TMC/CurveFitting/SecOrderLR';
import SecOrderLRSOL from '../StackScreens/Solutions/TMC/CurveFitting/SecOrderLRSOL';
import MulOrderLR from '../StackScreens/Methods/TMC/CurveFitting/MulOrderLR';
import MulOrderLRSOL from '../StackScreens/Solutions/TMC/CurveFitting/MulOrderLRSOL';

// Proba
import ProbaList from '../StackScreens/ProbaList';
import ProbaCal from '../StackScreens/Methods/Proba/ProbaCal';
import ProbaCalSol from '../StackScreens/Solutions/Proba/ProbaCalSol';
import ProbaIndepend from '../StackScreens/Methods/Proba/ProbaIndepend';
import ProbaIndendSOL from '../StackScreens/Solutions/Proba/ProbaIndependSol';
import Statistic from '../StackScreens/Methods/Proba/Statistic';
import StatisticSOL from '../StackScreens/Solutions/Proba/StatisticSOL';
import ConInterval from '../StackScreens/Methods/Proba/ConInterval';
import ConIntervalSOL from '../StackScreens/Solutions/Proba/ConIntervalSOL';
import SampleSize from '../StackScreens/Methods/Proba/SampleSize';
import SampleSizeSOL from '../StackScreens/Solutions/Proba/SampleSizeSOL';
import ZScore from '../StackScreens/Methods/Proba/ZScore';
import ZscoreSOL from '../StackScreens/Solutions/Proba/ZscoreSOL';
import MethodList from '../StackScreens/MethodList';
import NormalDis from '../StackScreens/Methods/Proba/NormalDis';
import NormalDisSOL from '../StackScreens/Solutions/Proba/NormalDisSOL';
import Trapezoidal from '../StackScreens/Methods/TMC/DiffnInt/Trapezoidal';
import TrapezoidalSOL from '../StackScreens/Solutions/TMC/DiffnInt/TrapezoidalSOL';
import TrapezoidalMA from '../StackScreens/Methods/TMC/DiffnInt/TrapezoidalMA';
import TrapezoidalmaSOL from '../StackScreens/Solutions/TMC/DiffnInt/TrapezoidalmaSOL';
import LinearAlgebra from '../StackScreens/Methods/Calculus/LinearAlgebra';
import LinearAlgebraSOL from '../StackScreens/Solutions/Calculus/LinearAlgebraSOL';
import Bisection from '../StackScreens/Methods/TMC/Optimize/Bisection';
import BisectionSOL from '../StackScreens/Solutions/TMC/Optimize/BisectionSOL';
import InterpolationSOL from '../StackScreens/Solutions/TMC/Optimize/InterpolationSOL';
import NaiveGE from '../StackScreens/Methods/TMC/Linear/NaiveGE';
import NaiveGESOL from '../StackScreens/Solutions/TMC/Linear/NaiveGESOL';
import GaussJordan from '../StackScreens/Methods/TMC/Linear/GaussJordan';
import ReFundamentalSOL from '../StackScreens/Solutions/Calculus/ReFundamentalSOL';
import ResetPassword from '../StackScreens/ResetPassword';

const NavigatorScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer style={{backgroundColor: 'red'}}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Enter Email Forgot PW"
          component={EnterEmailForgotPW}
        />
        <Stack.Screen name="Reset PW" component={ResetPassword} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Create Post" component={Create} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Personal Posts" component={PersonalPosts} />
        <Stack.Screen name="Edit Post" component={Edit} />
        <Stack.Screen name="Comment" component={Comment} />

        {/* Calculus */}
        <Stack.Screen name="CalculusList" component={CalculusList} />
        <Stack.Screen name="Fundamental" component={Fundamental} />
        <Stack.Screen name="Fundamental SOL" component={FundamentalSol} />
        <Stack.Screen name="ReFundamental SOL" component={ReFundamentalSOL} />
        <Stack.Screen name="Linear Algebra" component={LinearAlgebra} />
        <Stack.Screen name="Linear Algebra SOL" component={LinearAlgebraSOL} />

        {/* ===== */}

        {/* Geometric */}
        <Stack.Screen name="GeoFundamental" component={GeoFundamental} />
        <Stack.Screen name="GeoFundamentalSOL" component={GeometricSOL} />

        {/* ===== */}

        <Stack.Screen name="TMCList" component={TMCList} />
        <Stack.Screen name="Method List" component={MethodList} />
        {/* TMC - OPTIMIZE */}
        <Stack.Screen name="Golden Section" component={GoldenSection} />
        <Stack.Screen name="Golden Section SOL" component={GoldenSectionSOL} />
        {/* ===== */}
        <Stack.Screen name="Newton Method" component={Newton} />
        <Stack.Screen name="Newton Method SOL" component={NewtonMethodSOL} />
        {/* ===== */}
        <Stack.Screen name="Bisection Method" component={Bisection} />
        <Stack.Screen name="Bisection SOL" component={BisectionSOL} />
        <Stack.Screen name="Parabolic Interpolation" component={Parabolic} />
        <Stack.Screen
          name="Parabolic Interpolation SOL"
          component={InterpolationSOL}
        />

        {/* TMC - ODE */}
        <Stack.Screen name="Euler Method" component={EulerMethod} />
        <Stack.Screen name="Euler Method SOL" component={EulerMethodSOL} />
        {/* ===== */}
        <Stack.Screen name="Heun Method" component={HeunMethod} />
        <Stack.Screen name="Heun Method SOL" component={HeunMethodSOL} />
        {/* ===== */}
        <Stack.Screen name="MidPoint Method" component={MidPointMethod} />
        <Stack.Screen
          name="MidPoint Method SOL"
          component={MidPointMethodSOL}
        />
        {/* ===== */}
        <Stack.Screen name="Ralston Method" component={RalstonMethod} />
        <Stack.Screen name="Ralston Method SOL" component={RalstonMethodSOL} />
        {/* ===== */}
        <Stack.Screen name="Third-order Method" component={ThirdOrderMethod} />
        <Stack.Screen
          name="Third-order Method SOL"
          component={ThirdOrderMethodSOL}
        />
        {/* ===== */}
        <Stack.Screen
          name="Classic Fourth-order Method"
          component={Classic4thOrder}
        />
        <Stack.Screen
          name="Classic Fourth-order Method SOL"
          component={Classic4thOrderSOL}
        />

        {/* LINEAR EQUATION */}
        <Stack.Screen name="Naive Gauss Elimination" component={NaiveGE} />
        <Stack.Screen
          name="Naive Gauss Elimination SOL"
          component={NaiveGESOL}
        />
        <Stack.Screen name="Gauss Jordan" component={GaussJordan} />

        {/* DiffnInt TMC*/}
        <Stack.Screen name="Trapezoidal Rule" component={Trapezoidal} />
        <Stack.Screen name="Trapezoidal Rule SOL" component={TrapezoidalSOL} />
        {/* ===== */}
        <Stack.Screen name="Trapezoidal MA Rule" component={TrapezoidalMA} />
        <Stack.Screen
          name="TrapezoidalMA Rule SOL"
          component={TrapezoidalmaSOL}
        />
        {/* ===== */}
        <Stack.Screen name="Simpson 1/3 Rule" component={Simpson13Rule} />
        <Stack.Screen
          name="Simpson 1/3 Rule SOL"
          component={Simpson13RuleSOL}
        />
        {/* ===== */}
        <Stack.Screen name="Simpson 1/3 MA Rule" component={Simpson13RuleMA} />
        <Stack.Screen
          name="Simpson 1/3 MA Rule SOL"
          component={Simpson13maSOL}
        />
        {/* ===== */}
        <Stack.Screen name="Simpson 3/8 Rule" component={Simpson38Rule} />
        <Stack.Screen name="Simpson 3/8 Rule SOL" component={Simpson38SOL} />

        {/* Curve fitting*/}
        <Stack.Screen name="Linear Regression" component={LRegression} />
        <Stack.Screen name="Linear Regression SOL" component={LRegressionSOL} />
        {/* ===== */}
        <Stack.Screen name="2nd-order Regression" component={SecOrderLR} />
        <Stack.Screen
          name="2nd-order Regression SOL"
          component={SecOrderLRSOL}
        />
        {/* ===== */}
        <Stack.Screen name="Multi-order Regression" component={MulOrderLR} />
        <Stack.Screen
          name="Multi-order Regression SOL"
          component={MulOrderLRSOL}
        />

        {/* Probaaa */}
        <Stack.Screen name="ProbaList" component={ProbaList} />
        {/* ===== */}
        <Stack.Screen name="Probability Calculator" component={ProbaCal} />
        <Stack.Screen
          name="Probability Calculator SOL"
          component={ProbaCalSol}
        />
        {/* ===== */}
        <Stack.Screen name="Independent Events" component={ProbaIndepend} />
        <Stack.Screen
          name="Independent Events SOL"
          component={ProbaIndendSOL}
        />
        {/* ===== */}
        <Stack.Screen name="Normal Distribution" component={NormalDis} />
        <Stack.Screen name="Normal Distribution SOL" component={NormalDisSOL} />
        {/* ===== */}
        <Stack.Screen name="Statistic Calculator" component={Statistic} />
        <Stack.Screen
          name="Statistic Calculator SOL"
          component={StatisticSOL}
        />
        {/* ===== */}
        <Stack.Screen name="Sample Size" component={SampleSize} />
        <Stack.Screen name="Sample Size SOL" component={SampleSizeSOL} />
        {/* ===== */}
        <Stack.Screen name="Confidence Interval" component={ConInterval} />
        <Stack.Screen
          name="Confidence Interval SOL"
          component={ConIntervalSOL}
        />
        {/* ===== */}
        <Stack.Screen name="Z-score" component={ZScore} />
        <Stack.Screen name="Z-score SOL" component={ZscoreSOL} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorScreen;
