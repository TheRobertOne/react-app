


let bigLetterArr = [];
let smallLetterArr = [];

for (let i = 0; i < 26; i++) {
    bigLetterArr[i] = String.fromCharCode(65 + i);
}

for (let i = 0; i < 26; i++) {
    smallLetterArr[i] = String.fromCharCode(97 + i);
}


let obj = {

};

for (let i = 0; i < bigLetterArr.length; i++) {
    obj[bigLetterArr[i]] = require('./big/' + bigLetterArr[i] + '.json');

}

for (let i = 0; i < smallLetterArr.length; i++) {
    obj[smallLetterArr[i]] = require('./small/' + smallLetterArr[i] + '.json');

}


let arr = [];
for (let k in obj) {
    arr.push({
        name: k,
        Pdata: obj[k]
    })
}

export default arr;