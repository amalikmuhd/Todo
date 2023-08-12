import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LockScreen from '../screens/LockScreen';
import TaskScreen from '../screens/TaskScreen';

import Route from '../utils/Route';

const Stack = createNativeStackNavigator();

const AuthNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name={Route.LOCK_SCREEN} component={LockScreen} />
      <Stack.Screen name={Route.TODO_SCREEN} component={TaskScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
