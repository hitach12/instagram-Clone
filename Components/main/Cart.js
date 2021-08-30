import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Title, TextInput } from 'react-native-paper';
const Cart = ({partie}) => {
  return(
  <View >
  <Card style={{margin:20 , borderColor:"red"  , shadowColor:'grey' , shadowOffset:{  width: 5,  height:5  },shadowOpacity: 0.5 , shadowRadius :5 }  }>
    <Card.Title title={partie} 
     right={(props) => <Avatar.Image 
      size={80}
      source={require('../../assets/logo.jpg')}/>} 
      titleStyle={{textAlign:"center"}}
      rightStyle={{margin : 5}}/>
    <Card.Content>
      <Title style={{textAlign:"center"}}>عدد الأصوات</Title>
      <TextInput
      label="عدد الأصوات"
      
    />
    </Card.Content>
    <Card.Actions style={{alignItems:"center"}}>
      <Button>حفظ</Button>
      </Card.Actions>
  </Card>
  </View>
  );}

export default Cart;


let a = () => {return 1};