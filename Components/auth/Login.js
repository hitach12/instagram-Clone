import React, { Component } from 'react';
import {View , Button , TextInput} from 'react-native'
import firebase from 'firebase/app';



class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password: '',
            name : ''
        }
        this.onSignUp=this.onSignIn.bind(this)
    }

    onSignIn(){
        const {email , password ,name} = this.state;
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(email,password).then((result) => {
            console.log(result) 
        }).catch((error) => {
            console.log(error)
        })

    }
    render() {
        return (

            <View style={{ flex: 1, justifyContent: 'center' }} >
                <TextInput placeholder ="email"
                onChangeText={(email) => this.setState({email})}/>
                <TextInput placeholder ="password"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}/>

                <Button
                onPress={() => this.onSignIn()}
                title="Sign-in"
                />
            </View>
        );
    }
}

export default Login;