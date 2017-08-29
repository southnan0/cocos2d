/// <reference path="../interface.d.ts" />

var StartScene = cc.Layer.extend({
    _picNumber: 4,
    _imgList: g_pic,
    _row: 4,
    _col: 4,
    _objItem: {
        x: null,
        y: null,
        status: null,  // 0 消去  1 未消去  null 空
        src: null      //img src
    },
    // 初始化数据
    initData() {
        this._arrData = [];
        const allImg = this.getAllImg();
        for (let i = 0; i < this._col + 2; i++) {
            this._arrData.push([]);
            for (let j = 0; j < this._row + 2; j++) {
                if (j !== 0 && i !== 0 && i !== this._col + 1 && j !== this._row + 1) {
                    const len = allImg.length;
                    const order = Math.floor(Math.random() * len);
                    this._arrData[i].push({...this._objItem, x: j, y: i, status: 1, src: allImg.splice(order, 1)[0]});
                } else {
                    this._arrData[i].push({...this._objItem, x: j, y: i});
                }
            }
        }
    },
    getAllImg() {
        const eachPicNumber = this._row * this._col / this._picNumber;
        const arrAllImg = [];
        for (let i = 0; i < eachPicNumber; i++) {
            for (let j = 0; j < this._picNumber; j++) {
                arrAllImg.push(this._imgList[j]);
            }
        }

        return arrAllImg;
    },
    resetLayer(){
        this.removeLayer();
        this.renderLayer();
    },
    removeLayer() {
        this.removeChild(this.playLayer);
    },
    renderLayer() {
        this.playLayer = new PlayLayer(this._arrData, this._objItem, this);
        this.addChild(this.playLayer);
    },
    ctor() {
        this._super();
        this.initData();
        this.renderLayer();
    }
});