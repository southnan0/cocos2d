//todo 随机出个小人

var StartLayer = cc.Layer.extend({
    speed: 5000,
    times: 0,
    failTimes: 0,
    largeFailTime: 3,
    curPosition: Math.round(Math.random() * 3),
    timer: null,
    arrPosition: ['top', 'right', 'bottom', 'left'],
    label: null,
    ctor: function () {
        this._super();

        var size = cc.winSize;
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        this.addChild(this.bgSprite, 0);
        this.addSoldier();
        this.addButton('top', size.width / 2, size.height - 30);
        this.addButton('right', size.width - 40, size.height / 2 - 15);
        this.addButton('bottom', size.width / 2, 40);
        this.addButton('left', 30, size.height / 2 - 15);
        this.showPosition();
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
        if (_self.failTimes > _self.largeFailTime) return console.info('game over');
        _self.curPosition = Math.round(Math.random() * 3);

        _self.addLabel.call(_self);
        this.speed = this.speed - 50;
        console.info(this.speed)
        this.timer = setTimeout(function () {
            _self.failTimes++;
            _self.showPosition();
        }, this.speed);
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
                        return console.info('game over')
                    }
                    _self.showPosition();
                }
            }
        );

        buttonItem.attr({
            scale: 0.2
            // x:x,
            // y:y
        });

        buttonItem.setName(id);

        var button = new cc.Menu(buttonItem);
        button.x = x;
        button.y = y;
        this.addChild(button, 1);

        return true;
    },
    addLabel: function () {
        this.label && this.removeChild(this.label);
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF.create(this.arrPosition[this.curPosition], "Times New Roman", 32);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2;
        helloLabel.color = '#000';
        helloLabel.background = '#fff';
        this.label = helloLabel;
        this.addChild(helloLabel);
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});