import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import LandingScreen from './Components/auth/Landing';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from 'firebase/app';
import RegisterScreen from './Components/auth/register';
import LoginScreen from './Components/auth/Login'
import {View , Text} from 'react-native'
import {Provider} from 'react-redux';
import rootReducer from './redux/reducers'
import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import MainScreen from './Components/Main'
const store =createStore(rootReducer , applyMiddleware(thunk))


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXUcdUJTE38uSQ06lkoFBpn29zDKgUXOU",
  authDomain: "instagram-clone-1abd3.firebaseapp.com",
  projectId: "instagram-clone-1abd3",
  storageBucket: "instagram-clone-1abd3.appspot.com",
  messagingSenderId: "533722286317",
  appId: "1:533722286317:web:31bcebed65321411b824e4",
  measurementId: "G-1WRHX24T7K"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loaded : false
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn : false,
          loaded : true,
        })
      }else {
        this.setState({
          loggedIn : true,
          loaded : true,
        })
      }
    })
  }
  render() {
    const {loggedIn , loaded}  = this.state;
    if(!loaded){
      return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Loading ...!</Text>
          </View>
      )
    }

    if (!loggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName = "Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return (
      <Provider store = {store}>
        <NavigationContainer>
      <Stack.Navigator initialRouteName = "Main">
          <Stack.Screen name="Main" component={MainScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

