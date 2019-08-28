import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'
import {
    AsyncStorage,
    View,
    Text
} from 'react-native'
export default class chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: this.props.navigation.state.params.username,
            uid: this.props.navigation.state.params.uid,
            text: '',
            myuid: '',
            myusername: '',
            messagesList: [],
        };
    }
    
    static navigationOptions= ({ navigation }) => {
        return {
            headerTitle: 
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{ width: 40, height: 40, backgroundColor: '#ddd', borderRadius: 50, marginRight:10, }}></Text>
                    <Text style={{ width: 300, height: 40,textAlignVertical:'center',fontSize:15}}>{navigation.state.params.username}</Text>
                </View>
            ,
        }
    }
    async componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({
            myuid: await AsyncStorage.getItem('uid'),
            myusername: await AsyncStorage.getItem('username'),
        });
        await firebase
            .database().ref('messages').child(this.state.myuid).child(this.state.uid).on('child_added', value => {
                this.setState(previousState => {
                    return {
                        messagesList: GiftedChat.append(
                            previousState.messagesList,
                            value.val(),
                        ),
                    };
                });
            });
    };
    sendMessage = async () => {
        if (this.state.text.length > 0) {
            let msgId = firebase.database().ref('messages').child(this.state.myuid).child(this.state.uid).push().key;
            let updates = {};
            let message = {
                _id: msgId,
                text: this.state.text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    _id: this.state.myuid,
                    name: this.state.myusername,
                },
            };
            updates[
                'messages/' + this.state.myuid + '/' + this.state.uid + '/' + msgId
            ] = message;
            updates[
                'messages/' + this.state.uid + '/' + this.state.myuid + '/' + msgId
            ] = message;
            firebase
                .database()
                .ref()
                .update(updates);
            this.setState({ text: '' });
        }
    }
    render() {
        return (
            <View style={{width:'100%',height:'100%'}}>
                <GiftedChat
                    text={this.state.text}
                    messages={this.state.messagesList}
                    onSend={this.sendMessage}
                    showAvatarForEveryMessage={false}
                    user={{
                        _id: this.state.myuid,
                        name: this.state.myusername,
                    }}
                    onInputTextChanged={value => this.setState({ text: value })}
                />
            </View>

        )
    }
}
