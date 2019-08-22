import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    StatusBar
} from 'react-native'
import * as GeoLocation from '@react-native-community/geolocation'
const firebase = require('firebase')
class Register extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        region: {
            latitude: 0,
            longitude: 0,
        }
    }

    regis = async () => {
        await GeoLocation.getCurrentPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0
            }
            this.setState({
                region: { ...this.state.region, ...region }
            });
        }, (err) => {
            console.warn(err);
        })
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: 'AIzaSyBeik8UWYHbu71aLy__L4j3Q1x7x0wGYCo',
                authDomain: 'tomchat-9968d.firebaseapp.com',
                databaseURL: 'https://tomchat-9968d.firebaseio.com/',
                projectId: 'tomchat-9968d',
                storageBucket: 'tomchat-9968d.appspot.com',
                messagingSenderId: '362309626919',
                appId: '1:362309626919:android:89fe6e9c6f2268a7'
            })
        }
        await firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((value) => {
                firebase.database().ref(`users/${value.user.uid}`).set({
                    username: this.state.username,
                    longitude: this.state.region.longitude,
                    latitude: this.state.region.latitude
                }).then(() => {
                    AsyncStorage.setItem('uid', value.user.uid)
                    AsyncStorage.setItem('username', this.state.username)
                    AsyncStorage.setItem('longitude',this.state.region.longitude)
                    AsyncStorage.setItem('latitude',this.state.region.latitude)
                    this.props.navigation.navigate('Home')
                }).catch((error) => {
                    console.warn('baru error', error);
                })
            })
            .catch(error => Alert.alert("Error", error))
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
                <StatusBar hidden={false} />
                <View>
                    <View>
                        {/* <Image source={require('../assets/img/vector.png')} style={{ width: '100%', marginTop: -30 }} /> */}
                        <Text style={{ fontSize: 35, position: "absolute", top: 50, left: '10%', color: 'white' }}>
                            Register
                    </Text>
                        {/* <Image source={require('../assets/img/login.png')} style={{ position: 'absolute', right: '8%', width: '50%', height: 100, top: 30 }} /> */}
                    </View>
                    <View style={{ marginTop: 50, }}>
                        <TextInput style={{ borderColor: '#ddd', borderWidth: 1, marginHorizontal: '10%', paddingHorizontal: '5%', marginVertical: 5 }} placeholder={'Username'} onChangeText={(username) => this.setState({ username })} />
                        <TextInput style={{ borderColor: '#ddd', borderWidth: 1, marginHorizontal: '10%', paddingHorizontal: '5%', marginVertical: 5 }} placeholder={'Email'} keyboardType={'email-address'} onChangeText={(email) => this.setState({ email })} />
                        <TextInput style={{ borderColor: '#ddd', borderWidth: 1, marginHorizontal: '10%', paddingHorizontal: '5%', marginVertical: 5 }} placeholder={'Password'} secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                    </View>
                    <View style={{ flex: 1, flexDirection: "column", width: '80%', marginHorizontal: '10%' }}>
                        <Text style={{ alignSelf: "flex-start", height: 50, marginTop: 25, textAlignVertical: 'center' }}>
                            Sign Up
                    </Text>
                        <View style={{ marginTop: -50, alignSelf: "flex-end" }}>
                            <TouchableOpacity style={{ backgroundColor: '#6C63FF', width: 50, height: 50, borderRadius: 50, paddingHorizontal: 4 }} onPress={this.regis}>
                                <Text style={{ fontSize: 50, color: 'white', marginTop: -10 }}>
                                    &#8594;
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2, flexDirection: "row", width: '80%', marginHorizontal: '10%', marginVertical: 20, marginTop: 120, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>
                        Have an account ? &nbsp;
                    </Text>
                    <TouchableOpacity style={{ width: 40, }} onPress={() => this.props.navigation.push('Login')}>
                        <Text style={{ height: 50, width: 40, textAlign: "center" }}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

export default (Register)