function checkZeroPoint(item1, item2, arr) {
    var withoutObstacle = true;
    if (item1.x === item2.x) {
        var num = item2.y - item1.y;
        var numD = num > 0 ? 1 : -1;
        for (var i = 1; i < Math.abs(num); i++) {
            if (arr[item1.y + i * numD][item1.x].src) {
                withoutObstacle = false;
                break;
            }
        }
    }
    else if (item1.y === item2.y) {
        var num = item2.x - item1.x;
        var numD = num > 0 ? 1 : -1;
        for (var i = 1; i < Math.abs(num); i++) {
            if (arr[item1.y][item1.x + i * numD].src) {
                withoutObstacle = false;
                break;
            }
        }
    }
    else {
        withoutObstacle = false;
    }
    return withoutObstacle;
}
//# sourceMappingURL=checkZero.js.map