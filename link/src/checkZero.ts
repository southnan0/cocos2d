function checkZeroPoint(item1, item2, arr) {
    let withoutObstacle = true;
    if (item1.x === item2.x) {
        const num = item2.y - item1.y;
        const numD = num > 0 ? 1 : -1;

        for (let i = 1; i < Math.abs(num); i++) {
            if (arr[item1.y + i * numD][item1.x].src) {
                withoutObstacle = false;
                break;
            }
        }
    } else if (item1.y === item2.y) {
        const num = item2.x - item1.x;
        const numD = num > 0 ? 1 : -1;

        for (let i = 1; i < Math.abs(num); i++) {
            if (arr[item1.y][item1.x + i * numD].src) {
                withoutObstacle = false;
                break;
            }
        }
    } else {
        withoutObstacle = false;
    }

    return withoutObstacle;
}