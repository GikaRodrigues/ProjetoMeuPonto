import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SignInScreen from './pages/signin';
import DashboardScreen from './pages/dashboard';
import CadastrarScreen from './pages/cadastrar';
import AppScreen from './pages/App';
// criar a navegaçao com o login = autenticaçao
const AuthStack = createStackNavigator({
  Sign: {screen: SignInScreen},
  Cadastrar: {screen: CadastrarScreen}
})

const MainNavigator = createBottomTabNavigator(
  {
    Dashboard:{
        screen: DashboardScreen,
    },
    // App:{
    //   screen: AppScreen
    // }

    
  },
  {
    // define a rota inicial
    initialRouteName: 'Dashboard',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor:'white',
      inactiveTintColor:'white',
      inactiveBackgroundColor: '#3f2558',
      activeBackgroundColor:'#370441' ,
      style: {
        width: '100%',
        height: 45,
      },
    },
  },
);
export default createAppContainer(createSwitchNavigator(
  {
    // define as telas que vão aparecer
    MainNavigator,
    AuthStack
  }, {

    initialRouteName: 'AuthStack',
  }
),
);
