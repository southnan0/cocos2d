var PlayLayer = cc.Layer.extend({
    _nameSpliter: '@_@',
    _lastSelectImg: null,
    ctor(arrData, objItem,parent) {
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
                    if (this._lastSelectImg && this._lastSelectImg.src === src) {
                        this._arrData[this._lastSelectImg.y][this._lastSelectImg.x] = this._objItem;
                        this._arrData[y][x] = this._objItem;
                        this._lastSelectImg = null;
                        this._parentLayer.resetLayer.call(this._parentLayer);
                        console.info('yes')
                    } else {
                        this._lastSelectImg = curItem;
                    }
                }
            }
        );

        buttonItem.attr({
            scale: 0.5
        });

        const name = item.x + this._nameSpliter + item.y;
        buttonItem.setName(name);
        var button = new cc.Menu(buttonItem);
        button.x = item.x * 70;
        button.y = item.y * 60 + 300;
        this.addChild(button);
        return true;
    },

    //检查能否消除两个图片
    checkEliminated() {

    },
    // 是否没有拐点
    checkZeroPoint() {

    },
    // 是否只有一个拐点
    checkOnePoint() {

    },
    // 是否只有两个拐点
    checkTwoPoint() {

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