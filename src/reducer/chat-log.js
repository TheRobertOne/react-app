const chatLog = (state = {}, action) => {
    switch (action.type) {
        case 'CHAT':
            return state + action.payload;
        default:
            return state;
    }
};

export default chatLog;