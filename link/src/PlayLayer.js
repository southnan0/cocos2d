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
                if (_this._lastSelectImg && _this._lastSelectImg.src === src) {
                    _this._arrData[_this._lastSelectImg.y][_this._lastSelectImg.x] = _this._objItem;
                    _this._arrData[y][x] = _this._objItem;
                    _this._lastSelectImg = null;
                    _this._parentLayer.resetLayer.call(_this._parentLayer);
                    console.info('yes');
                }
                else {
                    _this._lastSelectImg = curItem;
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
        button.y = item.y * 60 + 300;
        this.addChild(button);
        return true;
    },
    //检查能否消除两个图片
    checkEliminated: function () {
    },
    // 是否没有拐点
    checkZeroPoint: function () {
    },
    // 是否只有一个拐点
    checkOnePoint: function () {
    },
    // 是否只有两个拐点
    checkTwoPoint: function () {
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
//# sourceMappingURL=PlayLayer.js.map