import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    FlatList
} from 'react-native'
export default class chatRoom extends Component {
    state = {
        data: [{ a: '1' }, { a: '2' }, { a: '3' }, { a: '4' }, { a: 'asz' }, { a: 'asssz' }, { a: 'asssssz' }, { a: 'asz' }, { a: 'asssz' }, { a: 'asssssz' }, { a: 'asz' }, { a: 'asssz' }, { a: 'asssssz' }, { a: 'asz' }, { a: 'asssz' }, { a: 'asssssz' }, { a: 'asz' }, { a: 'asssz' }, { a: 'asssssz' }, { a: 'asz' }, { a: 'asssz' }, { a: 'asssssz' }, { a: 'asd dada adad adad adad adad adad adad adadada adadad adadad adadad adadad sssssssssz' }]
    }
    renderItem = (item) => {
        return (
            <>
            <View style={{ flex: 1, alignItems: 'flex-start' ,marginVertical:10,marginRight:10}}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' ,maxWidth:'70%',paddingHorizontal:20,paddingVertical:10,borderRadius:20}}>
                    <Text>asdas asdasndia asindiasjdn asndiasnd ausndiasd uiansdiasd iuansdiuasd uiansdinasd iuansdiuasd iausndiuasd ansdiabsd asuidbnas</Text>
                    <Text style={{alignSelf:"flex-end",marginVertical:5}}>jam</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' ,marginVertical:10,marginRight:10}}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' ,maxWidth:'70%',paddingHorizontal:20,paddingVertical:10,borderRadius:20}}>
                    <Text>asdas asdasndia asindiasjdn asndiasnd ausndiasd uiansdiasd iuansdiuasd uiansdinasd iuansdiuasd iausndiuasd ansdiabsd asuidbnas</Text>
                    <Text style={{alignSelf:"flex-end",marginVertical:5}}>jam</Text>
                </View>
            </View>
            </>
        )
    }
    render() {
        return (
            <>
                <View style={{ height: '90%' }}>
                    <FlatList
                        inverted
                        data={this.state.data}
                        renderItem={this.renderItem}
                        initialScrollIndex={0}
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToIndex({ index: 0, animated: true })}
                    />
                </View>
                <View style={{ backgroundColor: 'white', flex: 1, width: '100%', flexDirection: 'row', position: "absolute", bottom: 0, paddingHorizontal: 15, paddingVertical: 10 }}>
                    <TextInput style={{ alignSelf: "flex-start", height: 40, width: '80%', borderWidth: 1, borderColor: '#ddd' }} />
                </View>
            </>
        )
    }
}
