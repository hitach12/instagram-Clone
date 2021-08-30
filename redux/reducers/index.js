import { combineReducers } from "redux";
import {user} from './user'
import {feed} from './feed'


const Reducers = combineReducers({
    userState:user,
    feedState:feed

})

export default Reducers 