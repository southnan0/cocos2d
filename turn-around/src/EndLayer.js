var EndLayer =  cc.LayerColor.extend({
    ctor:function (score) {
        this._super();
        const winSize = cc.winSize;
        this.width = winSize.width;
        this.height = winSize.height;
        this.attr({
            x: winSize.width / 2 - this.width/2,
            y: winSize.height / 2 - this.height/2
        })

        this.setColor(cc.color(255,255,255))
        this.setOpacity(100);
        
        var scoreLabel = new cc.LabelTTF.create('Game Over! all scroe is:'+score,"Times New Roman", 32);
        scoreLabel.attr({
            x:this.width/2,
            y:this.height/2,
            boundingWidth:this.width,
            textAlign:cc.TEXT_ALIGNMENT_CENTER
        });
        this.addChild(scoreLabel,2);
        console.info(this)
    }
}); 
