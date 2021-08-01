import firebase from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { USER_STATE_CHANGE } from "../constants";


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