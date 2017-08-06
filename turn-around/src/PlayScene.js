var PlayLayer = cc.Layer.extend({
    label: null,  //展示文字对象
    timer:null,
    ctor: function () {
        this._super();
        this.reset();
        var size = cc.winSize;
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scaleX: size.width / this.bgSprite.width,
            scaleY: size.height / this.bgSprite.height
        });

        this.addChild(this.bgSprite, 0);
        this.addSoldier();
        this.addLabelLayer();
        this.addButton('top', size.width / 2, size.height - 30);
        this.addButton('right', size.width - 40, size.height / 2 - 15);
        this.addButton('bottom', size.width / 2, 40);
        this.addButton('left', 30, size.height / 2 - 15);
        this.showPosition();

        this.addTimerBar();
        this.schedule(this.runTimer, 1, this.timeout, 1);//自动更新
    },
    reset: function () {
        this.speed = 5000;
        this.times = 0;   //正确次数
        this.failTimes = 0;  //错误次数
        this.largeFailTime = 3;  //最大失败次数
        this.curPosition = null;  //当前方向
        this.arrPosition = ['top', 'right', 'bottom', 'left'];  // 位置数组
        this.timeLimit = 30;  //计时器
        this._count = 0;  //计时器当前次数
    },
    runTimer: function () {
        this._count++;
        if (this._count > this.timeLimit) {
            this._count = 0;
            this.overGame();
            return;
        }

        this._loading && this._loading.setPercent((this._count / 30) * 100);
    },
    addTimerBar: function () {
        this._loading = new ccui.LoadingBar();
        var size = cc.winSize;
        this._loading.setName("LoadingBar");
        this._loading.loadTexture(res.loading);//设置进度条的加载图片
        this._loading.setScale((size.width / this._loading.width), 20 / this._loading.height);
        this._loading.setPercent(0);//开始的进度
        this._loading.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0
        });
        this.addChild(this._loading);
    },
    addSoldier: function () {
        this.solider = new SoldierSprite(res.solider);
        var size = cc.winSize;

        this.solider.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5
        });

        this.solider.setName('solider');

        this.addChild(this.solider, 0);
    },
    showPosition: function () {
        const _self = this;
        clearTimeout(this.timer);
        if (_self.failTimes > _self.largeFailTime) return this.overGame();
        _self.curPosition = Math.round(Math.random() * 3);

        _self.addLabel.call(_self, _self.arrPosition[_self.curPosition]);
        this.speed = this.speed - 50;
        this.timer = setTimeout(function () {
            _self.failTimes++;
            _self.showPosition();
        }, this.speed);
    },
    overGame: function () {
        clearTimeout(this.timer);
        this.unschedule(this.runTimer);
        this.reset();
        this.addLabel.call(this, 'Game Over!  ' + this.times);
    },
    addButton: function (id, x, y) {
        var size = cc.winSize;
        var _self = this;
        var buttonItem = new cc.MenuItemImage(
            res.solider,
            res.soliderActive,
            function (button) {
                if (button.getName() === _self.arrPosition[_self.curPosition]) {
                    _self.times++;
                    _self.showPosition();
                    switch (button.getName()) {
                        case 'top':
                            return _self.solider.rotation = 0;
                        case 'right':
                            return _self.solider.rotation = 90;
                        case 'bottom':
                            return _self.solider.rotation = 180;
                        case 'left':
                            return _self.solider.rotation = 270;
                    }
                } else {
                    _self.failTimes++;
                    if (_self.failTimes === _self.largeFailTime) {
                        return _self.overGame();
                    }
                    _self.showPosition();
                }
            }
        );

        buttonItem.attr({
            scale: 0.2
        });

        buttonItem.setName(id);

        var button = new cc.Menu(buttonItem);
        button.x = x;
        button.y = y;
        this.addChild(button, 1);

        return true;
    },
    addLabelLayer: function () {
        this.helloContent = new cc.LayerColor(cc.color(255, 255, 255, 100), 100, 50);
        this.helloContent.attr({
            x: cc.winSize.width / 2 - 50,
            y: cc.winSize.height - 120
        });
        this.addChild(this.helloContent);
    },
    addLabel: function (text) {
        this.label && this.helloContent.removeChild(this.label);
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF.create(text, "Times New Roman", 32);
        helloLabel.x = 50;
        helloLabel.y = 25;
        this.label = helloLabel;
        this.helloContent.addChild(helloLabel);
    }
});

var PlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});