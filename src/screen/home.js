import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps'
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import * as GeoLocation from '@react-native-community/geolocation'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.showMenu.bind(this)
    }
    static navigationOptions = ({ navigation }) => {
        console.warn(navigation);

        return {
            // header:null
            headerLeft: <></>
            // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Menu
            //         ref={this.setMenuRef}
            //         button={<Text onPress={navigation.showMenu.bind(this)}>Show menu</Text>}
            //     >
            //         <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
            //         <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
            //         <MenuItem onPress={this.hideMenu} disabled>
            //             Menu item 3
            // </MenuItem>
            //         <MenuDivider />
            //         <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
            //     </Menu>
            // </View>

            // <TouchableOpacity style={{ marginTop: 20, zIndex: -10, borderRadius: 50, padding: 10, width: 50, height: 50, backgroundColor: 'white', marginLeft: 10, elevation: 3 }}>
            //     <Image source={require('../assets/image/menu.png')} style={{ height: 20, width: 20, marginLeft: 5, marginTop: 5 }} />
            // </TouchableOpacity>
            ,
            // headerTransparent: true,
            // headerRight:
            //     <TouchableOpacity style={{ marginTop: 20, borderRadius: 50, padding: 10, width: 50, height: 50, backgroundColor: 'white', marginRight: 10, elevation: 3 }}>
            //         <Image source={require('../assets/image/headerRight.png')} style={{ width: 30, height: 30 }} />
            //     </TouchableOpacity>,
        }
    }
    state = {
        region: {
            latitude: 0,
            longitude: 0,
        }
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
    }
    render() {
        console.warn(this.state.region);
        const userLocation = this.state.region && this.state.region
        return (
            <>
                <Menu style={{ marginTop: 70 }}
                    ref={this.setMenuRef}
                    button={
                        <TouchableOpacity style={{ position: "absolute", alignSelf: 'flex-start', marginTop: 20, zIndex: -10, borderRadius: 50, padding: 10, width: 50, height: 50, backgroundColor: 'white', marginLeft: 10, elevation: 3 }} onPress={this.showMenu}>
                            <Image source={require('../assets/image/menu.png')} style={{ height: 20, width: 20, marginLeft: 5, marginTop: 5 }} />
                        </TouchableOpacity>}
                >
                    <Text>Selamat Datang</Text>
                    <MenuItem onPress={this.hideMenu}>Makan</MenuItem>
                    <MenuItem onPress={this.hideMenu}>Logout</MenuItem>
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
                        zIndex: -1
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
