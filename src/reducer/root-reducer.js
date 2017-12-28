
import { combineReducers } from 'redux';
import chatLog from './chat-log';


const rootReducer = combineReducers({
    chatLog: chatLog
});



export default rootReducer;



