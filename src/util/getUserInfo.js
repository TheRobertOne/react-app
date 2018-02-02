
/**
 * 
 * @param {Object} rootState 应用根state
 */
export default function getUserInfo(rootState) {
    let {
        user,
        token
    } = rootState['userInfo'].toJS();

    return {
        user,
        token
    };
}