
import { combineReducers } from 'redux';
import userInfo from './user-info';
import app from './app';


const rootReducer = combineReducers({
    userInfo,
    app
});



export default rootReducer;



