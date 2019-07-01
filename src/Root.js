import React from 'react';
import {
  SwitchNavigator,
  TabNavigator,
  StackNavigator
} from 'react-navigation';
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ReflectionsScreen,
  AssessmentScreen,
  AnalyticsScreen
} from './screens';

const Tabs = TabNavigator({
  home: HomeScreen,
  reflect: StackNavigator({
    list: ReflectionsScreen,
    assessment: AssessmentScreen
  }),
  analytics: AnalyticsScreen
});

const Intro = StackNavigator({
  login: LoginScreen,
  register: RegisterScreen
});

const Root = SwitchNavigator({
  intro: Intro,
  main: Tabs
});

export default Root; // Router?
