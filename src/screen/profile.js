import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import firebase from 'firebase'
import { whileStatement } from '@babel/types';
export default class profile extends Component {
    state = {
        uid: ''
    }
    componentDidMount = async () => {
        await AsyncStorage.getItem('uid', (err, result) => {
            this.setState({ uid: result })
        })
    }
    render() {
        console.warn(this.props.navigation.state.params.data);
        console.warn(this.state.uid);

        return (
            <>
                <View style={{ width: '100%', height: 200, backgroundColor: '#aaa' }}>
                    {this.state.uid !== this.props.navigation.state.params.data.uid &&
                        <TouchableOpacity style={{ position: "absolute", alignSelf: 'flex-end', marginTop: 20, borderRadius: 50, padding: 10, width: 50, height: 50, backgroundColor: 'white', elevation: 3, right: 10 }} onPress={() => this.props.navigation.push('ChatRoom', {
                            uid: this.props.navigation.state.params.data.uid,
                            username: this.props.navigation.state.params.data.username,
                        })}>
                            <Image source={require('../assets/image/chat.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    }
                    <Text style={{position:"absolute",bottom:0,paddingVertical:20,paddingHorizontal:30,color:'white',fontSize:30}}>
                        {this.props.navigation.state.params.data.username}
                    </Text>
                </View>
            </>
        )
    }
}
