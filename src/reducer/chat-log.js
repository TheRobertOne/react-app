import immutable from 'immutable';
let initState = {};
let $$initState = immutable.fromJS(initState);

const chatLog = (state = $$initState, action) => {
    switch (action.type) {
        case 'CHAT':
            console.log(state);
            return action.payload;
        default:
            return state;
    }
};

export default chatLog;