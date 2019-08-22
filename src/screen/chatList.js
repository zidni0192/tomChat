import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList
} from 'react-native'
export default class chatList extends Component {
    state = {
        data: [{ a: 'az' }, { a: 'az' },]
    }
    renderItem = (item) => {
        return (
            <View style={{ width: '100%', flex: 2, flexDirection: 'row' ,marginTop:10,borderBottomWidth:1,borderBottomColor:'#ddd',paddingBottom:10,paddingLeft:10}}>
                <Text style={{ width: 50, height: 50, backgroundColor: '#ddd', borderRadius: 50, marginRight: 10 }}></Text>
                <View style={{paddingTop:5}}>
                    <Text>
                        USer
                    </Text>
                    <Text style={{marginTop:5,color:'#888'}}>
                        Last chat
                    </Text>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View>
                <FlatList
                    style={{ height: '100%', width: '100%' }}
                    data={this.state.data}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}
