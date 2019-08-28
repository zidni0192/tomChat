import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import firebase from 'firebase'
export default class chatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: [],
            users: [],
            data: [],
            uid: null,
        }
    }
    componentDidMount = async () => {
        const uid = await AsyncStorage.getItem('uid')
        this.setState({ uid });
        firebase.database().ref('messages/' + this.state.uid).on('child_added', (data) => {
            let person = data.val();
            person.id = data.key;
            this.state.chat.push({
                uid: person.id
            })
            this.setState({ chat: this.state.chat })
        })

        firebase.database().ref('users/').on('value', (result) => {
            let data = result.val();
            if (data !== null) {
                let users = Object.values(data);
                this.setState({
                    users,
                })
            }
            console.warn(this.state.users);
            
        })
    };
    renderItem = (item) => {
        console.warn(item);
        return (
            <TouchableOpacity style={{ width: '100%', flex: 2, flexDirection: 'row' ,marginTop:10,borderBottomWidth:1,borderBottomColor:'#ddd',paddingBottom:10,paddingLeft:10}} onPress={()=>this.props.navigation.push('ChatRoom',{uid:item.item.uid,username:item.item.username})}>
                <Text style={{ width: 50, height: 50, backgroundColor: '#ddd', borderRadius: 50, marginRight: 10 }}></Text>
                <View style={{paddingTop:5}}>
                    <Text>
                        {item.item.username}
                    </Text>
                    <Text style={{marginTop:5,color:'#888'}}>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const users = this.state.users;
        const chat = this.state.chat
        const data = []
        chat.forEach((chat, key) => {
            data[key] = users.find((item) => item.uid === chat.uid)
        })
        return (
            <View>
                <FlatList
                    style={{ height: '100%', width: '100%' }}
                    data={data}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}
