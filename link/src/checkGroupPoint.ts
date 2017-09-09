/**
 * 计算一组点是否有拐点
 * 前提是这组件都是相邻的点，三个点间，最多只有一个拐点
 * @param arrPoint
 * @returns {number}
 */
function checkGroupPoint(arrPoint) {
    const len = arrPoint.length;
    switch (len) {
        case 0:
        case 1:
            return 0;
        case 2:
            return 1;
        default:
            let count = 0;
            for (let i = 0; i < len - 2; i++) {
                if ((arrPoint[i].x === arrPoint[i + 1].x === arrPoint[i + 2].x) || (arrPoint[i].y === arrPoint[i + 1].y === arrPoint[i + 2].y)) {
                    count = count + 0;
                } else {
                    count++;
                }
            }
            return count;
    }
}