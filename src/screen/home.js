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
        uid: '',
        username:'',
        users: []
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
        await AsyncStorage.getItem('uid', (error, result) => {
            this.setState({ uid: result })
        })
        await AsyncStorage.getItem('username', (error, result) => {
            this.setState({ username: result })
        })

        await firebase.database().ref('/users').on('value', (result) => {
            let data = Object.values(result.val());
            this.setState({ users: data })
        })
    }
    logout = async () => {
        const uid = await AsyncStorage.getItem('uid')
        await firebase.auth().signOut()
        await firebase.database().ref('/users/' + uid).update({ status: 'offline' }).then(async () => {
            await AsyncStorage.clear()
            this.hideMenu()
            this.props.navigation.push('Loading')
        }).catch((error) => {
            console.warn(error);
            this.hideMenu()
        })
    }
    profile= async(data)=>{
        console.warn('ini uid',data);
        
        this.hideMenu()
        this.props.navigation.push('Profile',{data:data})
    }
    render() {
        console.warn('uid coy',this.state.uid);
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
                    <MenuItem onPress={()=>this.profile({uid:this.state.uid,username:this.state.username})}>Profile</MenuItem>
                    <MenuItem onPress={this.logout}>Logout</MenuItem>
                </Menu>
                <TouchableOpacity style={{ position: "absolute", alignSelf: 'flex-end', marginTop: 20, borderRadius: 50, padding: 10, width: 50, height: 50, backgroundColor: 'white', elevation: 3, right: 10 }} onPress={() => this.props.navigation.push('ChatList')}>
                    <Image source={require('../assets/image/headerRight.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <MapView
                    initialRegion={{
                        latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                        position: "absolute"
                    }}
                    showsCompass={false}
                    showsUserLocation
                >
                    {this.state.users.map((item) => {
                        return <Marker
                            onPress={() => this.profile({uid:item.uid,username:item.username})}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude
                            }}>
                            <Image source={{ uri: 'http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png' }}
                                style={{ height: 50, width: 50, borderRadius:50 ,borderWidth:this.state.uid === item.uid?1:0,borderColor:'red' }}
                            />
                        </Marker>
                    })}
                </MapView>
            </>
        )
    }
}
