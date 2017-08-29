/// <reference path="../interface.d.ts" />

var g_pic = (
    function () {
        const arr = [];
        for(let i=1;i<7;i++){
            arr.push(`p${i}.png`)
        }
        return arr;
    }
)();
    
var g_resources: any[] = ['p1.png'];