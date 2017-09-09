function checkOnePoint(item1, item2, arr) {
    if (item1.x === item2.x || item1.y === item2.y)
        return false;
    var intersection = [{ x: item1.x, y: item2.y }, { x: item2.x, y: item1.y }];
    var item1_x1 = intersection[0].x - item1.x;
    var item1_y1 = intersection[0].y - item1.y;
    var item1_x2 = intersection[1].x - item1.x;
    var item1_y2 = intersection[1].y - item1.y;
    var item2_x1 = intersection[0].x - item2.x;
    var item2_y1 = intersection[0].y - item2.y;
    var item2_x2 = intersection[1].x - item2.x;
    var item2_y2 = intersection[1].y - item2.y;
    return !(checkObstacle(item1_x1, item1_y1, item1, arr) || checkObstacle(item2_x1, item2_y1, item2, arr))
        || !(checkObstacle(item1_x2, item1_y2, item1, arr) || checkObstacle(item2_x2, item2_y2, item2, arr));
}
function checkObstacle(xGap, yGap, item, arr) {
    var hasObstacle = false;
    var xType = xGap >= 0 ? 1 : -1;
    var yType = yGap >= 0 ? 1 : -1;
    if (xGap === 0) {
        for (var j = 1; j <= Math.abs(yGap); j++) {
            if (arr[item.y + j * yType][item.x].src) {
                hasObstacle = true;
                break;
            }
        }
    }
    else if (yGap === 0) {
        for (var i = 1; i <= Math.abs(xGap); i++) {
            if (arr[item.y][item.x + i * xType].src) {
                hasObstacle = true;
                break;
            }
        }
    }
    else {
        for (var i = 1; i < Math.abs(xGap); i++) {
            for (var j = 1; j < Math.abs(yGap); j++) {
                if (arr[item.y + j * yType][item.x + i * xType].src) {
                    hasObstacle = true;
                    break;
                }
            }
            if (hasObstacle)
                break;
        }
    }
    return hasObstacle;
}
//# sourceMappingURL=checkOne.js.map