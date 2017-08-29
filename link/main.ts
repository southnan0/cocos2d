/// <reference path="./interface.d.ts" />

window.onload = function () {
    cc.game.onStart = ()=>{
        cc.loader.resPath = "res";
        cc.LoaderScene.preload(g_resources,()=>{
            cc.director.runScene(new StartScene());
        })
    };
    cc.game.run("gameCanvas");
};