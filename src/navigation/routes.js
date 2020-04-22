import React from 'react';
import {
    createAppContainer
} from 'react-navigation';
import {
    createStackNavigator
} from 'react-navigation-stack';

import MainMenu from '../screens/mainMenu';
import GameScreen from '../screens/game';

const MainNavigation = createStackNavigator ({
    MainMenu: {
        screen: MainMenu,
        navigationOptions: () => ({
            header: null,
        }),
    },
    GameScreen: {
        screen: GameScreen,
        navigationOptions: () => ({
            header: null,
        }),
    },   
},
{
    initialRouteName: 'MainMenu',
}
)
const Routes = createAppContainer(MainNavigation);

export default Routes;

