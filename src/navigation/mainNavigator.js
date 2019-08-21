import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import Home from '../screen/home'
import Login from '../screen/login'
import Register from '../screen/register'

const stackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions:{
            header:null
        }
    },
    Login:{
        screen:Login,
        navigationOptions:{
            header:null
        }
    },
    Register:{
        screen:Register,
        navigationOptions:{
            header:null
        }
    }
},{
    initialRouteName:'Home'
})

export default createAppContainer(stackNavigator)