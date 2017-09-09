// todo 无解检查  测试用例
var PlayLayer = cc.Layer.extend({
    _nameSpliter: '@_@',
    _lastSelectImg: null,
    ctor: function (arrData, objItem, parent) {
        this._super();
        this._arrData = arrData;
        this._objItem = objItem;
        this._parentLayer = parent;
        this.initLayer();
    },
    //初始化连连看
    initLayer: function () {
        var _this = this;
        this._arrData.map(function (item) {
            item.map(function (obj) {
                _this.initButtonItem(obj);
            });
        });
    },
    initButtonItem: function (item) {
        var _this = this;
        var buttonItem = new cc.MenuItemImage(item.src, item.src, function (button) {
            var name = button.getName();
            if (!name)
                return;
            var x = name.split(_this._nameSpliter)[0];
            var y = name.split(_this._nameSpliter)[1];
            var curItem = _this._arrData[y][x];
            var src = curItem.src;
            if (src) {
                if (_this._lastSelectImg && _this._lastSelectImg.src === src && _this.checkEliminated(_this._lastSelectImg, curItem)) {
                    // todo 消除时，几秒钟的动画效果
                    _this._arrData[_this._lastSelectImg.y][_this._lastSelectImg.x].src = null;
                    _this._arrData[y][x].src = null;
                    _this._lastSelectImg = null;
                    _this._curSelectItem = null;
                    _this._parentLayer.resetLayer.call(_this._parentLayer);
                    console.info('yes');
                }
                else {
                    _this._lastSelectImg = curItem;
                    _this._curSelectItem = null;
                }
            }
        });
        buttonItem.attr({
            scale: 0.5
        });
        var name = item.x + this._nameSpliter + item.y;
        buttonItem.setName(name);
        var button = new cc.Menu(buttonItem);
        button.x = item.x * 70;
        button.y = item.y * 60 + 100; //todo
        this.addChild(button);
        return true;
    },
    //检查能否消除两个图片
    checkEliminated: function (item1, item2) {
        return this.checkZeroPoint(item1, item2) || this.checkOnePoint(item1, item2) || this.checkTwoPoint(item1, item2);
    },
    // 是否没有拐点
    checkZeroPoint: function (item1, item2) {
        return checkZeroPoint(item1, item2, this._arrData);
    },
    // 是否只有一个拐点
    checkOnePoint: function (item1, item2) {
        return checkOnePoint(item1, item2, this._arrData);
    },
    // 求[]的最短路径
    getShortPath: function (xGap1, xGap2, yGap1, yGap2, item1, item2, arr) {
        var hasPath = false;
        if (xGap1 === xGap2 && xGap2 === 0) {
            var g = yGap1 > yGap2 ? yGap1 : yGap2;
            for (var i = 0; i < g; i++) {
                hasPath = !(checkObstacle(0, g + i, item1, arr) || checkObstacle(0, g + i, item2, arr));
                if (hasPath)
                    break;
            }
        }
        if (yGap1 === yGap2 && yGap2 === 0) {
            var g = xGap1 > xGap2 ? xGap1 : xGap2;
            for (var i = 0; i < g; i++) {
                hasPath = !(checkObstacle(g + i, 0, item1, arr) || checkObstacle(g + i, 0, item2, arr));
                if (hasPath)
                    break;
            }
        }
        return hasPath;
    },
    // 是否只有两个拐点
    checkTwoPoint: function (item1, item2) {
        // 判断两个点，在x轴或者y轴上，是否都不存在障碍
        // 这里还需要求最优解
        // x1 x 坐标的左边所有情况
        var x1_hasPath = this.getShortPath(-item1.x, -item2.x, 0, 0, item1, item2, this._arrData);
        // const x1_hasPath = !(
        //     checkObstacle(-item1.x, 0, item1, this._arrData)
        //     ||
        //     checkObstacle(-item2.x, 0, item2, this._arrData)
        // );
        var x2_hasPath = this.getShortPath(this._parentLayer._row + 1 - item1.x, this._parentLayer._row + 1 - item2.x, 0, 0, item1, item2, this._arrData);
        // const x2_hasPath = !(
        //     checkObstacle(this._parentLayer._row + 1 - item1.x, 0, item1, this._arrData)
        //     ||
        //     checkObstacle(this._parentLayer._row + 1 - item2.x, 0, item2, this._arrData)
        // );
        //
        var y1_hasPath = this.getShortPath(0, 0, -item1.y, -item2.y, item1, item2, this._arrData);
        // const y1_hasPath = !(
        //     checkObstacle(0, -item1.y, item1, this._arrData)
        //     ||
        //     checkObstacle(0, -item2.y, item2, this._arrData)
        // );
        var y2_hasPath = this.getShortPath(0, 0, this._parentLayer._col + 1 - item1.y, this._parentLayer._col + 1 - item2.y, item1, item2, this._arrData);
        // const y2_hasPath = !(
        //     checkObstacle(0, this._parentLayer._col + 1 - item1.y, item1, this._arrData)
        //     ||
        //     checkObstacle(0, this._parentLayer._col + 1 - item2.y, item2, this._arrData)
        // );
        console.info(x1_hasPath + ' ' + x2_hasPath + ' ' + y1_hasPath + ' ' + y2_hasPath);
        if (x1_hasPath || x2_hasPath || y1_hasPath || y2_hasPath) {
            return true;
        }
        var allPath = findPathMethod(item1, item2, this._arrData, function (curPoint) {
            return !curPoint.src;
        }) || [];
        var obj = null;
        allPath.map(function (item, index) {
            var obstacleLength = checkGroupPoint(item);
            var pointLength = item.length;
            if (obstacleLength <= 2) {
                if ((obj && ((obj.obstacleLength < obstacleLength) || (obj.obstacleLength === obstacleLength && obj.pointLength < pointLength)))) {
                    return;
                }
                obj = {
                    pointLength: pointLength,
                    obstacleLength: obstacleLength
                };
            }
        });
        console.info(obj);
        return !!obj;
    },
    //重置选中状态
    resetSelectStatus: function () {
    },
    // 检查是否是死局
    checkDead: function () {
    },
    // 用户超过N秒没有反应，做出提示
    doHint: function () {
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
//# sourceMappingURL=PlayLayer.js.map