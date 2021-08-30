import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import  {Component} from 'react';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import LandingScreen from './Components/auth/Landing';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from 'firebase/app';
import RegisterScreen from './Components/auth/register';
import LoginScreen from './Components/auth/Login'
import {View , Text, Image, Button} from 'react-native'
import {Provider} from 'react-redux';
import rootReducer from './redux/reducers'
import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import MainScreen from './Components/Main'
import AddScreen from './Components/main/Add'
import LogScreen from './Components/auth/Log';
import RegScreen from './Components/auth/Reg'
import LandScreen from './Components/auth/Land'
import * as Animatable from 'react-native-animatable';






const store =createStore(rootReducer , applyMiddleware(thunk))


function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={LandScreen} />
      <Drawer.Screen name="Article" component={RegScreen} />
    </Drawer.Navigator>
  );
}


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
    
    this.toggleDrawer=this.toggleDrawer.bind(this)
  }
  toggleDrawer(){
    //Props to open/close the drawer
    console.log(navigation.toggleDrawer());
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
          <View style={{ flex: 1, justifyContent: 'center' , alignItems:'center'}}>
            <Image source= {require('./assets/Spinner.svg')} style = {{ width: 200, height: 200 }}></Image>
          </View>
      )
    }

    if (!loggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName = "Landing">
          <Stack.Screen name="Landing" component={LandScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={RegScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={LogScreen} options={{headerShown:false}}/>
          
        </Stack.Navigator>
        </NavigationContainer>
      )
    }
    // test = () => {
    //   console.log("Hello");
    //   console.log(this.props);
    // }
    //     this.props.navigation.openDrawer();
    
    return (
      <Provider store = {store}>
        <NavigationContainer>
       <Stack.Navigator initialRouteName = "Main">
          <Stack.Screen name="Main" component={MainScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Add" component={AddScreen}/>
        </Stack.Navigator> 
        {/*  */}
        
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

