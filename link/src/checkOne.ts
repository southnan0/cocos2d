function checkOnePoint(item1, item2, arr) {
    if (item1.x === item2.x || item1.y === item2.y) return false;

    const intersection: ObjectItem[] = [{x: item1.x, y: item2.y}, {x: item2.x, y: item1.y}];

    const item1_x1 = intersection[0].x - item1.x;
    const item1_y1 = intersection[0].y - item1.y;

    const item1_x2 = intersection[1].x - item1.x;
    const item1_y2 = intersection[1].y - item1.y;

    const item2_x1 = intersection[0].x - item2.x;
    const item2_y1 = intersection[0].y - item2.y;

    const item2_x2 = intersection[1].x - item2.x;
    const item2_y2 = intersection[1].y - item2.y;

    return !(checkObstacle(item1_x1, item1_y1, item1, arr) || checkObstacle(item2_x1, item2_y1, item2, arr))
        || !(checkObstacle(item1_x2, item1_y2, item1, arr) || checkObstacle(item2_x2, item2_y2, item2, arr))
}

function checkObstacle(xGap, yGap, item, arr) {
    let hasObstacle = false;
    const xType = xGap >= 0 ? 1 : -1;
    const yType = yGap >= 0 ? 1 : -1;

    if (xGap === 0) {
        for (let j = 1; j < Math.abs(yGap); j++) {
            console.info(item.y + j * yType)
            console.info(item.x)
            if (arr[item.y + j * yType][item.x].src) {
                hasObstacle = true;
                break;
            }
        }
    } else if (yGap === 0) {
        for (let i = 1; i < Math.abs(xGap); i++) {
            if (arr[item.y][item.x + i * xType].src) {
                hasObstacle = true;
                break;
            }
        }
    } else {
        for (let i = 1; i < Math.abs(xGap); i++) {
            for (let j = 1; j < Math.abs(yGap); j++) {
                if (arr[item.y + j * yType][item.x + i * xType].src) {
                    hasObstacle = true;
                    break;
                }
            }
            if (hasObstacle) break;
        }
    }

    return hasObstacle;
}

