import React from 'react';
import {
  SwitchNavigator,
  TabNavigator,
  StackNavigator
} from 'react-navigation';
import {
  Login,
  Register,
  Home,
  Reflection,
  Analytics
} from './components/screens';

const Tabs = TabNavigator({
  home: Home,
  reflect: Reflection,
  analytics: Analytics
});

const Intro = StackNavigator({
  login: Login,
  register: Register
});

const Root = SwitchNavigator({
  intro: Intro,
  main: Tabs
});

export default Root;
