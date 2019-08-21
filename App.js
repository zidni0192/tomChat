import React, { Component } from 'react'
import {
  ScrollView
} from 'react-native'
import MapView from 'react-native-maps'
import MainNavigator from './src/navigation/mainNavigator';
export default class App extends Component {
  render() {
    return (
        <MainNavigator />
      )
  }
}
