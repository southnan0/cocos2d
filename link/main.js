/// <reference path="./interface.d.ts" />
window.onload = function () {
    cc.game.onStart = function () {
        cc.loader.resPath = "res";
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new StartScene());
        });
    };
    cc.game.run("gameCanvas");
};
//# sourceMappingURL=main.js.map