// /*var arr = [];
//
// for(var i = 0;i<4;i++){
//     arr[i] = [];
//     for(var j = 0;j<4;j++){
//         arr[i][j] = {
//             i:i,
//             j:j,
//             id:i+'_'+j
//         }
//     }
// }
//
// var point1 = arr[3][1];
// var point2 = arr[0][2];*/
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var findPathMethod = function (point1, point2, arr, shouldCheckNext) {
    var iDirection = point2.y - point1.y;
    var jDirection = point2.x - point1.x;
    var iR = iDirection > 0 ? 1 : -1;
    var jR = jDirection > 0 ? 1 : -1;
    var arrPath = [[]];
    var i1 = point1.y;
    var j1 = point1.x;
    for (var i = 0; i <= Math.abs(iDirection); i++) {
        arrPath[i] = [];
        for (var j = 0; j <= Math.abs(jDirection); j++) {
            var curi = i1 + i * iR;
            var curj = j1 + j * jR;
            var curPoint = __assign({}, arr[curi][curj]);
            curPoint.next = ((i === 0 && j === 0) || shouldCheckNext(curPoint)) ? checkNext(i, j, iDirection, jDirection, i1, j1, iR, jR, arr) : [];
            arrPath[i][j] = curPoint;
        }
    }
    var startPoint = arrPath[0][0];
    var allPath = [[startPoint]];
    if (startPoint && startPoint.next) {
        getPath(arrPath[0][0], allPath[0], allPath);
        return allPath;
    }
    else {
        return [];
    }
};
function getPath(item, firstArray, all) {
    if (item.next.map) {
        var newArray = firstArray.slice(0, firstArray.length);
        item.next.map(function (p, index) {
            if (index === 0) {
                firstArray.push(p);
                if (p.next) {
                    getPath(p, firstArray, all);
                }
            }
            else {
                newArray.push(p);
                all.push(newArray);
                if (p.next) {
                    getPath(p, newArray, all);
                }
            }
        });
    }
}
function checkNext(i, j, iDirection, jDirection, i1, j1, iR, jR, arr) {
    var arrNext = [];
    if (i >= Math.abs(iDirection) && j >= Math.abs(jDirection))
        return arrNext;
    var l = 0;
    if (i < Math.abs(iDirection)) {
        var nexti = i1 + (i + 1) * iR;
        var nextj = j1 + j * jR;
        var nextPoint = __assign({}, arr[nexti][nextj]);
        //         arrNext.push({[nexti+'_'+nextj]:nextPoint})
        arrNext.push(nextPoint);
    }
    if (j < Math.abs(jDirection)) {
        var nexti = i1 + i * iR;
        var nextj = j1 + (j + 1) * jR;
        var nextPoint = __assign({}, arr[nexti][nextj]);
        //         arrNext.push({[nexti+'_'+nextj]:nextPoint})
        arrNext.push(nextPoint);
    }
    return arrNext;
}
//# sourceMappingURL=findPath.js.map