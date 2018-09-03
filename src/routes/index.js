import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MainScreen from '../screens/Main.js';
import TaskScreen from '../screens/Task.js';
import AuthScreen from '../screens/Auth.js';
import EditTaskScreen from '../screens/EditTask.js';

export default createStackNavigator(
    {
        Main: MainScreen,
        Task: TaskScreen,
        Auth: AuthScreen,
        EditTask: EditTaskScreen,
    },
    {
        initialRouteName: 'Main',
    }
);