import firebase from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { USER_STATE_CHANGE } from "../constants";
import { FEED_STATE_CHANGE } from "../constants";
import axios from "axios";


export function fetchUser(){

    return ((dispatch) => {
        let firestore = firebase.firestore()
        firestore.collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot)=> {
            if(snapshot.exists){
                // console.log(snapshot.data())
                dispatch({type : USER_STATE_CHANGE, currentUser : snapshot.data()})
            }else{
                console.log('does not exist')
            }
        })
    })
}

export function fetchData(){

    return ((dispatch) => {
let firestore = firebase.firestore()
        firestore.collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot)=> {
            if(snapshot.exists){
                 console.log(snapshot.data().bureau)
                 axios.get(`https://my-app534.herokuapp.com/api/${snapshot.data().bureau}`).then(response => {
                    dispatch({type : FEED_STATE_CHANGE, currentData : response.data.result})
                
            }).catch(error => console.log(error))
            }else{
                console.log('does not exist')
            }})

        
    })
}
