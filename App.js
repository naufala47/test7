/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Page/Dashboard/Dashboard';
import Login from './Page/Login/Login';
import Register from './Page/Register/Register';
import CheckIn from './Page/CheckIn/CheckIn';
import CheckOut from './Page/CheckOut/CheckOut';
import History from './Page/History/History';
import Ijin from './Page/Ijin/Ijin';
import Testing from './Page/Testing/Testing';


const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoggedin: false
    }
  }

  componentDidMount() {
    auth().onAuthStateChanged((userData) => {
      console.log("user" + JSON.stringify(userData))
      if (userData === null) {
        this.setState({ isLoggedin: false })
      } else {
        this.setState({ user: userData, isLoggedin: false })
      }
    });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isLoggedin ? <></> : <Stack.Screen name="Login" component={Login} />}
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="CheckIn" component={CheckIn} />
          <Stack.Screen name="CheckOut" component={CheckOut} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Ijin" component={Ijin} />
          <Stack.Screen name="Testing" component={Testing} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

