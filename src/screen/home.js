import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps'
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native'
import * as GeoLocation from '@react-native-community/geolocation'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
const firebase = require('firebase')

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.showMenu.bind(this)
    }

    state = {
        region: {
            latitude: 0,
            longitude: 0,
        },
        uid:''
    }
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };
    componentDidMount = async () => {
        await AsyncStorage.getItem('uid', (error, result) => {
            this.setState({ uid: result })
        })        
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
            console.warn(position);

        }, (err) => {
            console.warn(err);
        })
    }
    logout = async () => {
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
        const uid = await AsyncStorage.getItem('uid')
        console.warn(uid);
        await firebase.auth().signOut()
        await firebase.database().ref('/user/' + uid).update({ status: 'offline' }).then(async() => {
            await AsyncStorage.clear()
            this.hideMenu()
            this.props.navigation.push('Loading')
        }).catch((error)=>{
            console.warn(error);
            this.hideMenu()
        })
    }
    render() {
        console.warn(this.state.region);
        const userLocation = this.state.region && this.state.region
        return (
            <>
                <Menu style={{ marginTop: 70 }}
                    ref={this.setMenuRef}
                    button={
                        <TouchableOpacity style={{ marginTop: 20, borderRadius: 50, padding: 10, width: 50, height: 50, backgroundColor: 'white', marginLeft: 10, elevation: 3 }} onPress={this.showMenu}>
                            <Image source={require('../assets/image/menu.png')} style={{ height: 20, width: 20, marginLeft: 5, marginTop: 5 }} />
                        </TouchableOpacity>}
                >
                    <MenuItem onPress={this.hideMenu}>Makan</MenuItem>
                    <MenuItem onPress={this.logout}>Logout</MenuItem>
                </Menu>
                <TouchableOpacity style={{ position: "absolute", alignSelf: 'flex-end', marginTop: 20, borderRadius: 50, padding: 10, width: 50, height: 50, backgroundColor: 'white', elevation: 3, right: 10 }}>
                    <Image source={require('../assets/image/headerRight.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <MapView
                    initialRegion={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                        position: "absolute"
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude
                        }}>
                        <View style={{ backgroundColor: 'blue', height: 50, width: 50, borderRadius: 50, alignItems: "center" }}>
                            <Text style={{ marginTop: 10, color: 'white', fontWeight: "bold", fontSize: 10 }}>Ayaam</Text>
                        </View>
                    </Marker>
                </MapView>
            </>
        )
    }
}
