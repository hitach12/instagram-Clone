import React from 'react';
import { useState , useEffect } from 'react';
import firebase from 'firebase/app';
import DropDownPicker from 'react-native-dropdown-picker';
import { 
  View, 
  Text, 
  Button,
  ScrollView,
  TouchableOpacity, 
  TextInput,
  Platform,
  StyleSheet ,
  StatusBar,
  Alert,
  Picker,
  SafeAreaView,
  FlatList
} from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { useTheme } from 'react-native-paper';
import { fetchData } from '../../redux/actions';
import Svg, {
  Use,
  Image,
} from 'react-native-svg';

import Cart from './Cart';


const renderItem = ({ item }) => (
    <Cart partie={item.partie} />
  );

function ElectionCH(props) {
    
         
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [data,setData] = useState([])
 
  useEffect(() => {
    if(props.currentData && props.currentData.length>0){
        console.log( props.currentData[0])
        let array = Array.from(props.currentData);
    setItems(array.map(item => { return {label:item.partie , value : item.num}}))
    setData(props.currentData)
    // props.currentData.forEach(element => items.push({label:element.partie , value : element.num}))
}
},[props.currentData]) ;

  const onSignout = () => {
    const auth = firebase.auth();
    auth.signOut().then((result) => {
        console.log(result) 
    }).catch((error) => {
        console.log(error)
    })

}

const adVotes = (num,vote) => {

    axios.post('https://my-app534.herokuapp.com/api', {
    num: num,
    vote: vote
  })
  .then(function (response) {
    alert("تمت الاضافة بنجاح")
  })
  .catch(function (error) {
    alert(error);
  });


}

const [vote, setVote] = useState(0);

const { colors } = useTheme();


if (!data) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' , alignItems:'center' , backgroundColor:"white"}}>
      <Svg width="200" height="200">
     <Image href={require('../../assets/Spinner.svg')} />
    </Svg>
      <Text>تحميل البيانات</Text>
    </View>
)
        
}else {
    return (
      
             <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
          
        <View style={styles.header}>
            <Text style={styles.text_header}>اضافة محضر انتاخابات الجماعة - اللائحة المشرتكة -</Text>
        </View>
        
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <ScrollView>
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>اسم الحزب </Text>

{data.length==0 ? 
                <View style={{ flex: 1, justifyContent: 'center' , alignItems:'center' , backgroundColor:'F6F6F6'}}>
                <Svg width="200" height="200">
               <Image href={require('../../assets/Spinner.svg')} />
              </Svg>
                <Text>تحميل البيانات</Text>
              </View>
                : 
                <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.num}
    />    
                }
    
            
            <View style={styles.button}>
                <TouchableOpacity
                     style={[styles.signIn, {
                      borderColor: '#009387',
                      borderWidth: 1,
                      marginTop: 15
                  }]}
                    onPress={() => {adVotes( value , vote )
                    console.log(value , vote)
                    }}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>اضافة اصوات</Text>
                
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onSignout()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>خروج</Text>
                </TouchableOpacity>
            </View>
            </ScrollView> 
        </Animatable.View>
        
      </View>

        
    );
};
}
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
      flex: 10,
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
      
      
      
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      padding:2,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      borderWidth: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,

  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
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
  }
});

const mapStateToProps = (store) => ({
  currentData: store.feedState.currentData

})
const mapDispatchProps =  (dispatch) => bindActionCreators({fetchData},dispatch)
export default connect (mapStateToProps, mapDispatchProps)(ElectionCH);
  
  