import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import HomePage from '../screens/homepage';
import ChoosePerson from '../screens/homepage/choosePerson';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FluidNavigator} from 'react-navigation-fluid-transitions';
import Login from '../screens/auth/login';
import Loading from '../screens/auth/loading';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';

const screenWidth = Math.round(Dimensions.get('window').width);

const TabBar = props => {
  const {navigation, activeTintColor, inactiveTintColor} = props;
  const {state} = navigation;
  const {index: activeRouteIndex} = state;
  const routeNames = {
    HomePage: {title: 'Anasayfa', icon: 'home'},
    Profile: {title: 'Profil', icon: 'user-alt'},
    Settings: {title: 'Ayarlar', icon: 'cog'},
  };
  return (
    <View
      style={{
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {state.routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
        return (
          <TouchableOpacity
            key={routeIndex}
            activeOpacity={1}
            onPress={() => navigation.navigate(route.routeName)}
            style={{
              width: Math.round(screenWidth / state.routes.length),
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={routeNames[route.routeName].icon}
              size={isRouteActive ? 21 : 20}
              color={tintColor}
              solid
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HomePageStack = FluidNavigator(
  {
    HomePage: {screen: HomePage},
    PersonDetail: {screen: Profile},
    ChoosePerson: {screen: ChoosePerson},
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none',
  },
);

const TabNavigator = createMaterialTopTabNavigator(
  {
    Profile: {
      screen: Profile,
    },
    HomePage: {
      screen: HomePageStack,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    lazy: false,
    initialRouteName: 'HomePage',
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: '#300B92',
      activeBackgroundColor: '#110050',
      inactiveBackgroundColor: '#110050',
      inactiveTintColor: 'gray',
    },
  },
);

const MainStack = createStackNavigator(
  {
    MainPage: {
      screen: TabNavigator,
    },
  },
  {
    initialRouteName: 'MainPage',
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const AppNavigator = createAnimatedSwitchNavigator(
  {
    AuthStack: {
      screen: AuthStack,
    },
    Loading: {
      screen: Loading,
    },
    MainPage: {
      screen: MainStack,
    },
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-top"
          durationMs={1000}
          interpolation="easeInOut"
        />
        <Transition.In
          type="fade"
          interpolation="easeInOut"
          durationMs={1000}
        />
      </Transition.Together>
    ),
    initialRouteName: 'Loading',
  },
);

const AppNavigatorContainer = createAppContainer(AppNavigator);

export default AppNavigatorContainer;

export const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};
