import React, { Component } from 'react';
import {View , Text} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser , fetchData} from '../redux/actions/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedScreen from './main/Feed'
import AddScreen from './main/Add'
import ProfileScreen from './main/Profile'
import AjouterScreen from './main/Ajouter'
import {DrawerContent} from './main/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ElectionCFScreen from './main/electionCF';
import ElectionCHScreen from './main/electionCH';
import ElectionPFScreen from './main/electionPF';
import ElectionPHScreen from './main/electionPH';
import ElectionRFScreen from './main/electionRF';
import ElectionRHScreen from './main/electionRH';
import Cart from './main/Cart';
const Drawer = createDrawerNavigator();
///// error 

//////

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchData();
        
        
    }
    
    render() {
        return (
            
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} drawerPosition='right'>
          <Drawer.Screen name="Home" component={FeedScreen} options={{ headerTitle: 'الصفحة الرئيسية' }}/>
          <Drawer.Screen name="ElectionCFScreen" component={ElectionCFScreen} options={{ headerTitle: 'لائحة الجماعة المرأة' }}/>
          <Drawer.Screen name="ElectionCHScreen" component={ElectionCHScreen} options={{ headerTitle: 'لائحة الجماعة المشتركة' }}/>
          <Drawer.Screen name="ElectionPFScreen" component={ElectionPFScreen} options={{ headerTitle: 'لائحة البرلمان المرأة' }}/>
          <Drawer.Screen name="ElectionPHScreen" component={ElectionPHScreen} options={{ headerTitle: 'لائحة البرلمان المشتركة' }}/>
          <Drawer.Screen name="ElectionRFScreen" component={ElectionRFScreen} options={{ headerTitle: 'لائحة الجهة المرأة' }}/>
          <Drawer.Screen name="ElectionRHScreen" component={ElectionRHScreen} options={{ headerTitle: 'لائحة الجهة المشتركة' }}/>
        </Drawer.Navigator>
            
        );
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentData: store.feedState.currentData

})
const mapDispatchProps =  (dispatch) => bindActionCreators({fetchUser , fetchData},dispatch)
export default connect (mapStateToProps, mapDispatchProps)(Main);