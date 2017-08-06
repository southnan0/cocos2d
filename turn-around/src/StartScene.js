var StartLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scaleX: size.width / this.bgSprite.width,
            scaleY: size.height / this.bgSprite.height
        });

        this.addChild(this.bgSprite,0);
        this.addMenu();
    },
    addMenu:function () {
        var startItem = new cc.MenuItemFont('start',this.handleStart.bind(this),this);
        var menu = new cc.Menu(startItem);

        this.addChild(menu);
        return true;
    },
    handleStart:function () {
        cc.director.pushScene(new PlayScene());
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});