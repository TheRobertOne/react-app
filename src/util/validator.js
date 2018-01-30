//是否邮箱
function isEmail(str) {

}
//是否空字符串
function isEmptyString(str) {
    str = (str || '').trim();
    if (str.length > 0) {
        return false;
    } else {
        return true;
    }
}

//是否是json字符串
function isJsonString(str) {
    if (!str) {
        return false;
    } else {
        let val = false;
        try {
            JSON.parse(str);
            val = true;
            console.log(val);
        } catch (error) {
            val = false;
        }
        return val;
    }
}


const validator = {
    isEmail,
    isEmptyString,
    isJsonString
};
export default validator;