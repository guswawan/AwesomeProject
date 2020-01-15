import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Home,
  CardEngineerDetail,
  SignIn,
  Register,
  HomeEngineer,
  EngineerProfile,
  CompanyProfile,
  // Sidebar,
} from '../../containers/pages';

const HomeStack = createStackNavigator(
  {
    Home,
    CardEngineerDetail,
    CompanyProfile,
    // Sidebar,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

const SignInStack = createStackNavigator(
  {
    Register,
    SignIn,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SignIn',
  },
);

const HomeEngineerStack = createStackNavigator(
  {
    HomeEngineer,
    EngineerProfile,
  },
  {
    headerMode: 'none',
    initialRouteName: 'HomeEngineer',
  },
);

const Router = createSwitchNavigator(
  {
    HomeStack,
    SignInStack,
    HomeEngineerStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SignInStack',
  },
);

export default createAppContainer(Router);
