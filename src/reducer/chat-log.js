import immutable from 'immutable';
let initState = {
    chatmessage: ''
};
let $$initState = immutable.fromJS(initState);

const chatLog = ($$state = $$initState, action) => {
    switch (action.type) {
        case 'CHAT':
            return $$state.merge({ 'chatmessage': action.payload +"yoynnn"});
        default:
            return $$state;
    }
};

export default chatLog;

