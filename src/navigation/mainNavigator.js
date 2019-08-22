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
import ChatRoom from '../screen/chatRoom'

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
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'wadoadoi',
                headerLeft: <Text style={{ width: 40, height: 40, backgroundColor: '#ddd', borderRadius: 50, marginLeft:10 }}></Text>
            }
        }
    }
}, {
        initialRouteName: 'ChatRoom'
    })

export default createAppContainer(stackNavigator)