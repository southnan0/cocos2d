//todo 随机出个小人

var StartLayer = cc.Layer.extend({
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
    addButton: function (id, x, y) {
        var size = cc.winSize;
        var _self = this;
        var buttonItem = new cc.MenuItemImage(
            res.solider,
            res.soliderActive,
            function (button) {
                switch(button.getName()){
                    case 'top':
                        return _self.solider.rotation = 0;
                    case 'right':
                        return _self.solider.rotation = 90;
                    case 'bottom':
                        return _self.solider.rotation = 180;
                    case 'left':
                        return _self.solider.rotation = 270;
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
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});