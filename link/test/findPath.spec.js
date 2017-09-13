var assert = require('assert');
var findPath = require('../src/findPath.js');
var g_pic = (function () {
    var arr = [];
    for (var i = 1; i < 7; i++) {
        arr.push("p" + i + ".png");
    }
    return arr;
})();
let _picNumber = 4;
let _imgList = g_pic;
let _row = 4,
    _col = 7,
    _objItem = {
        x: null,
        y: null,
        status: null,  // 0 消去  1 未消去  null 空
        src: null      //img src
    };

var _arrData = [];
// 初始化数据
const initData = () => {
    _arrData = [];
    const allImg = getAllImg();
    for (let i = 0; i < _col + 2; i++) {
        _arrData.push([]);
        for (let j = 0; j < _row + 2; j++) {
            if (j !== 0 && i !== 0 && i !== _col + 1 && j !== _row + 1) {
                const len = allImg.length;
                const order = Math.floor(Math.random() * len);
                _arrData[i].push(Object.assign({}, _objItem, {x: j, y: i, status: 1, src: allImg.splice(order, 1)[0]}));
            } else {
                _arrData[i].push(Object.assign({}, _objItem, {x: j, y: i}));
            }
        }
    }
};
const getAllImg = () => {
    const eachPicNumber = _row * _col / _picNumber;
    const arrAllImg = [];
    for (let i = 0; i < eachPicNumber; i++) {
        for (let j = 0; j < _picNumber; j++) {
            arrAllImg.push(_imgList[j]);
        }
    }

    return arrAllImg;
};

describe('findPath', () => {
    describe('findPathMethod', () => {
        initData();
        const point1 = _arrData[2][3];
        const point2 = _arrData[5][4];
        it('should return a array', () => {
            const allPath = findPath.findPathMethod(point1, point2, _arrData, (curPoint) => {
                return !curPoint.src;
            });

            console.info(allPath)

            assert.equal(true, allPath instanceof Array);
        });
    })
});
