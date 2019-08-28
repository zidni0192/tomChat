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
import Loading from '../screen/loading'
import ChatList from '../screen/chatList'
import ChatRoom from '../screen/chat'
import Profile from '../screen/profile'
const stackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    Loading: {
        screen: Loading,
        navigationOptions: {
            header: null
        }
    },
    ChatList: {
        screen: ChatList,
        navigationOptions: {
            headerTitle: 'Chat'
        }
    },
    ChatRoom: {
        screen: ChatRoom,
    },
    Profile:{
        screen:Profile,
        navigationOptions:{
            headerStyle:{
                position:'absolute'
            },
            headerTransparent:true
        }
    }
}, {
        initialRouteName: 'Loading'
    })

export default createAppContainer(stackNavigator)