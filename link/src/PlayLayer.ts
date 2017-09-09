interface ObjectItem {
    x: number;
    y: number;
}

// todo 无解检查  测试用例
var PlayLayer = cc.Layer.extend({
    _nameSpliter: '@_@',
    _lastSelectImg: null,
    ctor(arrData, objItem, parent) {
        this._super();
        this._arrData = arrData;
        this._objItem = objItem;
        this._parentLayer = parent;
        this.initLayer();
    },
    //初始化连连看
    initLayer() {
        this._arrData.map((item) => {
            item.map((obj) => {
                this.initButtonItem(obj);
            })
        });
    },
    initButtonItem(item) {
        const buttonItem = new cc.MenuItemImage(
            item.src,
            item.src,
            (button) => {
                const name = button.getName();
                if (!name) return;
                const x = name.split(this._nameSpliter)[0];
                const y = name.split(this._nameSpliter)[1];
                const curItem = this._arrData[y][x];
                const src = curItem.src;
                if (src) {
                    if (this._lastSelectImg && this._lastSelectImg.src === src && this.checkEliminated(this._lastSelectImg, curItem)) {
                        // todo 消除时，几秒钟的动画效果
                        this._arrData[this._lastSelectImg.y][this._lastSelectImg.x].src = null;
                        this._arrData[y][x].src = null;
                        this._lastSelectImg = null;
                        this._curSelectItem = null;
                        this._parentLayer.resetLayer.call(this._parentLayer);
                        console.info('yes')
                    } else {
                        this._lastSelectImg = curItem;
                        this._curSelectItem = null;
                    }
                }
            }
        );

        buttonItem.attr({
            scale: 0.5
        });

        const name = item.x + this._nameSpliter + item.y;
        buttonItem.setName(name);
        const button = new cc.Menu(buttonItem);
        button.x = item.x * 70;
        button.y = item.y * 60 + 100;  //todo
        this.addChild(button);
        return true;
    },

    //检查能否消除两个图片
    checkEliminated(item1, item2) {
        return this.checkZeroPoint(item1, item2) || this.checkOnePoint(item1, item2) || this.checkTwoPoint(item1, item2);
    },
    // 是否没有拐点
    checkZeroPoint(item1, item2) {
        return checkZeroPoint(item1, item2, this._arrData);
    },
    // 是否只有一个拐点
    checkOnePoint(item1, item2) {
        return checkOnePoint(item1, item2, this._arrData);
    },
    // 求[]的最短路径
    getShortPath(xGap1, xGap2, yGap1, yGap2, item1, item2, arr) {
        let hasPath = false;
        if (xGap1 === xGap2 && xGap2 === 0) {
            const g = yGap1 > yGap2 ? yGap1 : yGap2;
            for (let i = 0; i < g; i++) {
                hasPath = !(checkObstacle(0, g + i, item1, arr) || checkObstacle(0, g + i, item2, arr));
                if (hasPath) break;
            }
        }

        if (yGap1 === yGap2 && yGap2 === 0) {
            const g = xGap1 > xGap2 ? xGap1 : xGap2;
            for (let i = 0; i < g; i++) {
                hasPath = !(checkObstacle(g + i, 0, item1, arr) || checkObstacle(g + i, 0, item2, arr));
                if (hasPath) break;
            }
        }

        return hasPath;
    },

    // 是否只有两个拐点
    checkTwoPoint(item1, item2) {
        // 判断两个点，在x轴或者y轴上，是否都不存在障碍
        // 这里还需要求最优解
        // x1 x 坐标的左边所有情况
        const x1_hasPath = this.getShortPath(-item1.x, -item2.x, 0, 0, item1, item2, this._arrData);
        // const x1_hasPath = !(
        //     checkObstacle(-item1.x, 0, item1, this._arrData)
        //     ||
        //     checkObstacle(-item2.x, 0, item2, this._arrData)
        // );
        const x2_hasPath = this.getShortPath(this._parentLayer._row + 1 - item1.x, this._parentLayer._row + 1 - item2.x, 0, 0, item1, item2, this._arrData);
        // const x2_hasPath = !(
        //     checkObstacle(this._parentLayer._row + 1 - item1.x, 0, item1, this._arrData)
        //     ||
        //     checkObstacle(this._parentLayer._row + 1 - item2.x, 0, item2, this._arrData)
        // );
        //
        const y1_hasPath = this.getShortPath(0, 0, -item1.y, -item2.y, item1, item2, this._arrData);
        // const y1_hasPath = !(
        //     checkObstacle(0, -item1.y, item1, this._arrData)
        //     ||
        //     checkObstacle(0, -item2.y, item2, this._arrData)
        // );
        const y2_hasPath = this.getShortPath(0, 0, this._parentLayer._col + 1 - item1.y, this._parentLayer._col + 1 - item2.y, item1, item2, this._arrData);
        // const y2_hasPath = !(
        //     checkObstacle(0, this._parentLayer._col + 1 - item1.y, item1, this._arrData)
        //     ||
        //     checkObstacle(0, this._parentLayer._col + 1 - item2.y, item2, this._arrData)
        // );

        console.info(x1_hasPath + ' ' + x2_hasPath + ' ' + y1_hasPath + ' ' + y2_hasPath);

        if (x1_hasPath || x2_hasPath || y1_hasPath || y2_hasPath) {
            return true;
        }
        const allPath = findPathMethod(item1, item2, this._arrData, (curPoint) => {
            return !curPoint.src;
        }) || [];

        let obj = null;
        allPath.map((item, index) => {
            const obstacleLength = checkGroupPoint(item);
            const pointLength = item.length;
            if (obstacleLength <= 2) {
                if ((obj && ((obj.obstacleLength < obstacleLength) || (obj.obstacleLength === obstacleLength && obj.pointLength < pointLength) ))) {
                    return;
                }
                obj = {
                    pointLength,
                    obstacleLength
                }
            }
        });
        console.info(obj);
        return !!obj;
    },

    //重置选中状态
    resetSelectStatus() {

    },
    // 检查是否是死局
    checkDead() {

    },
    // 用户超过N秒没有反应，做出提示
    doHint() {

    }
});

/*
for (let j = 0; j < Math.abs(direction.x); j++) {
    arr[i][j] = {
        y: item1.y + i * y,
        x: item1.x + i * x
    };
    if (!this._arrData[item1.y + i * y][item1.x + i * x].src) {
        arr[i][j] = null;
    } else {
        if (i === 0 && j === 0) {
            if (direction.y < 0 && direction.x < 0) {
                arr[i][j].t = 2;
                arr[i][j].r = 2;
                arr[i][j].b = 0;
                arr[i][j].l = 0;
            } else if (direction.y < 0 && direction.x > 0) {
                arr[i][j].t = 2;
                arr[i][j].r = 0;
                arr[i][j].b = 0;
                arr[i][j].l = 2;
            } else if (direction.y > 0 && direction.x > 0) {
                arr[i][j].t = 0;
                arr[i][j].r = 0;
                arr[i][j].b = 2;
                arr[i][j].l = 2;
            } else if (direction.y > 0 && direction.x < 0) {
                arr[i][j].t = 0;
                arr[i][j].r = 2;
                arr[i][j].b = 2;
                arr[i][j].l = 0;
            }
        } else {
            if (i === 0 && direction.y < 0) {
                arr[i][j].t = 2;
                arr[i][j].r = 1;
                arr[i][j].b = 0;
                arr[i][j].l = 1;
            } else if (i === 0 && direction.y > 0) {
                arr[i][j].b = 2;
                arr[i][j].t = 0;
                arr[i][j].r = 1;
                arr[i][j].l = 1;
            } else if (j === 0 && direction.x < 0) {
                arr[i][j].l = 2;
                arr[i][j].r = 0;
                arr[i][j].b = 1;
                arr[i][j].t = 1;
            } else if (j === 0 && direction.x > 0) {
                arr[i][j].r = 2;
                arr[i][j].l = 0;
                arr[i][j].b = 1;
                arr[i][j].t = 1;
            }
        }
    }
}
*/
