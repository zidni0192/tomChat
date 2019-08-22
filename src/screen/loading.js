import React, { Component } from 'react'
import {
    ActivityIndicator,
    AsyncStorage
} from 'react-native'
export default class loading extends Component {
    state={
        uid:''
    }
    componentWillMount = async()=>{
        await AsyncStorage.getItem('uid', (error, result) => {
            this.setState({ uid: result })
        })        
        this.props.navigation.navigate(this.state.uid ?'Home':'Login')
    }
    render() {
        return (
            <ActivityIndicator size='large' color='blue' />
        )
    }
}
