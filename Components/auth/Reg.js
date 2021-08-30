import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { RadioButton } from 'react-native-paper';
import firebase from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirm_password: '',
        name:'',
        bureau : '',
        id:0,
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    
    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const onSignUp = () => {
        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(data.email,data.password).then((result) => {
            let firetore = firebase.firestore()
            firetore.collection("users").doc(firebase.auth().currentUser.uid).set({
                email:data.email,
                name:data.name,
                bureau:data.bureau,
                id:data.id

            })
            console.log(result) 
        }).catch((error) => {
            console.log(error)
        })

    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Name</Text>
            <View style={styles.action}>
            <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Name"
                    style={styles.textInput}
                    onChangeText={(val) => {
                        setData({
                            ...data,
                            name:val
                        })
                    }}
                    
                />
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>ID</Text>
            <View style={styles.action}>
            <Text style={{margin:5 , fontWeight:'600' , fontSize:20 }}>1</Text>
        <RadioButton
        value="1"
        status={ data.id === 1 ? 'checked' : 'unchecked' }
        onPress={() => setData({
            ...data,
            id: 1
        })}
      />
      <Text style={{margin:5 , fontWeight:'600' , fontSize:20 }}>2</Text>
      <RadioButton
        value="2"
        status={ data.id === 2 ? 'checked' : 'unchecked' }
        onPress={() => setData({
            ...data,
            id: 2
        })}
      />
      <Text style={{margin:5 , fontWeight:'600' , fontSize:20 }}>3</Text>
      <RadioButton
        value="3"
        status={ data.id === 3 ? 'checked' : 'unchecked' }
        onPress={() => {
            setData({
                ...data,
                id: 3
            })
        
        
        }}
      />
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Bureau</Text>
            <View style={styles.action}>
                <Feather 
                    name="folder"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Bureau"
                    style={styles.textInput}
                    keyboardType='numeric'
                    value={data.bureau}
                    onChangeText={(val) => {
                        if(val>264) {
                            alert('bureau non existed'),
                            setData({
                                ...data,
                                bureau:''
                            })
                            

                        }else {
                        setData({
                            ...data,
                            bureau:val
                        })
                    }
                    }}
                    
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => onSignUp()}
                >
                {/* <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                > */}
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                {/* </LinearGradient> */}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                    }
                    }
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });