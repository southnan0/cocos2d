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


var findPathMethod = function (point1, point2,arr, shouldCheckNext) {
    var iDirection = point2.y - point1.y;
    var jDirection = point2.x - point1.x;

    var iR = iDirection > 0 ? 1 : -1;
    var jR = jDirection > 0 ? 1 : -1;
    const arrPath = [[]];
    const i1 = point1.y;
    const j1 = point1.x;

    for (var i = 0; i <= Math.abs(iDirection); i++) {

        arrPath[i] = [];
        for (var j = 0; j <= Math.abs(jDirection); j++) {
            const curi = i1 + i * iR;
            const curj = j1 + j * jR;
            const curPoint = {...arr[curi][curj]};
            curPoint.next = ( (i===0 && j===0) || shouldCheckNext(curPoint)) ? checkNext(i, j, iDirection, jDirection, i1, j1, iR, jR, arr) : [];
            arrPath[i][j] = curPoint;
        }
    }
    const startPoint = arrPath[0][0];
    const allPath = [[startPoint]];
    if (startPoint && startPoint.next) {
        getPath(arrPath[0][0], allPath[0], allPath);
        return allPath;
    } else {
        return [];
    }
};

function getPath(item, firstArray, all) {
    if (item.next.map) {
        var newArray = firstArray.slice(0, firstArray.length);
        item.next.map((p, index) => {
            if (index === 0) {
                firstArray.push(p);

                if (p.next) {
                    getPath(p, firstArray, all);
                }

            } else {
                newArray.push(p);

                all.push(newArray);

                if (p.next) {
                    getPath(p, newArray, all);
                }
            }
        })
    }
}

function checkNext(i, j, iDirection, jDirection, i1, j1, iR, jR, arr) {

    var arrNext = [];

    if (i >= Math.abs(iDirection) && j >= Math.abs(jDirection)) return arrNext;
    let l = 0;

    if (i < Math.abs(iDirection)) {
        const nexti = i1 + (i + 1) * iR;
        const nextj = j1 + j * jR;
        const nextPoint = {...arr[nexti][nextj]};
//         arrNext.push({[nexti+'_'+nextj]:nextPoint})
        arrNext.push(nextPoint)
    }

    if (j < Math.abs(jDirection)) {
        const nexti = i1 + i * iR;
        const nextj = j1 + (j + 1) * jR;
        const nextPoint = {...arr[nexti][nextj]};
//         arrNext.push({[nexti+'_'+nextj]:nextPoint})
        arrNext.push(nextPoint)
    }
    return arrNext;
}

function getShortPath(item1,item2,arr){




    //right

    //top

    //bottom
}

/**
 *
 * @param item1
 * @param item2
 * @param arr
 * @returns {Array}
 */
function findLeftPath(item1,item2,arr){
    //left
    //0 item1 0
    //0 0     item2
    //
    const item1_left = item1.x;
    const item2_left = item2.x;
    const left = item1_left>item2_left?item2_left:item1_left;
    const gap = item1_left-item2_left;
    const dGap = gap>0;
    const yGap = item2.y - item1.y;
    let arrLeft = [];
    if(yGap === 0) return [];
    const arr1 = [];
    const arr2 = [];

    const x = dGap?item2.x:item1.x;

    for(let k = 1;k<=Math.abs(gap);k++){
        if(dGap){
            arr1.push(arr[item1.y][item1_left-k]);
        }else{
            arr2.push(arr[item2.y][item2_left-k]);
        }
    }

    for(let i = 1;i<=left;i++){
        arr1.push(arr[item1.y][x-i]);
        arr2.push(arr[item2.y][x-i]);
        arrLeft.push(arr1);
        const dY = yGap>0?1:-1;

        for(let j = 1;j<Math.abs(yGap);j++){
            arrLeft[i-1].push(arr[item1.y+j*dY][x-i])
        }
        const arr2_bak = arr2.slice(0,arr2.length);
        arrLeft = arrLeft[i-1].concat(arr2_bak.reverse());
    }
    return arrLeft;
}

// module.exports = {findPathMethod,checkNext,getPath};