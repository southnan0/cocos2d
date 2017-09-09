/// <reference path="../interface.d.ts" />
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var StartScene = cc.Layer.extend({
    _picNumber: 4,
    _imgList: g_pic,
    _row: 4,
    _col: 7,
    _objItem: {
        x: null,
        y: null,
        status: null,
        src: null //img src
    },
    // 初始化数据
    initData: function () {
        this._arrData = [];
        var allImg = this.getAllImg();
        for (var i = 0; i < this._col + 2; i++) {
            this._arrData.push([]);
            for (var j = 0; j < this._row + 2; j++) {
                if (j !== 0 && i !== 0 && i !== this._col + 1 && j !== this._row + 1) {
                    var len = allImg.length;
                    var order = Math.floor(Math.random() * len);
                    this._arrData[i].push(__assign({}, this._objItem, { x: j, y: i, status: 1, src: allImg.splice(order, 1)[0] }));
                }
                else {
                    this._arrData[i].push(__assign({}, this._objItem, { x: j, y: i }));
                }
            }
        }
    },
    getAllImg: function () {
        var eachPicNumber = this._row * this._col / this._picNumber;
        var arrAllImg = [];
        for (var i = 0; i < eachPicNumber; i++) {
            for (var j = 0; j < this._picNumber; j++) {
                arrAllImg.push(this._imgList[j]);
            }
        }
        return arrAllImg;
    },
    resetLayer: function () {
        this.removeLayer();
        this.renderLayer();
    },
    removeLayer: function () {
        this.removeChild(this.playLayer);
    },
    renderLayer: function () {
        this.playLayer = new PlayLayer(this._arrData, this._objItem, this);
        this.addChild(this.playLayer);
    },
    ctor: function () {
        this._super();
        this.initData();
        this.renderLayer();
    }
});
//# sourceMappingURL=StartScene.js.map