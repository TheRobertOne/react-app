
let A = require('./big/A.json');
let B = require('./big/B.json');

let a = require('./small/a.json');
let b = require('./small/b.json');

let obj = {
    A,
    B,
    a,
    b,
};

let arr = [];
for (let k in obj) {
    arr.push({
        name: k,
        Pdata: obj[k]
    })
}

export default arr;