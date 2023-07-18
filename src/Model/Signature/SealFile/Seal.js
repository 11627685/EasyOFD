
import Seal2014 from "./2014/Seal.js"
import Seal2020 from "./2020/Seal.js"


export default class Seal {

    constructor() {
        this.seal = null;
        this.version = '2014';
    }

    Parse(data) {
        this.seal = null;
        try {
            this.seal = new Seal2014();
            this.seal.Parse(data)
        } catch (e) {
            try {
                this.version = '2020';
                this.seal = new Seal2020();
                this.seal.Parse(data)
            } catch (e2) {
                console.log("Seal解析异常：" + e2.message);
            }
        }
    }

    GetDrawData() {

        let imaValue = this.seal.eSealInof.picture.data.value
        let imagetype = this.seal.eSealInof.picture.type.value;

        return new Promise((resolve, reject) => {


            if (imagetype == 'ofd')
                imagetype = 'png';
            // 将Uint8Array转换为Blob对象
            const blob = new Blob([imaValue], { type: 'image/' + imagetype });

            // 创建图片URL
            const imageUrl = URL.createObjectURL(blob);

            // 创建图片元素
            const img = document.createElement('img');
            img.src = imageUrl;


            // 监听图像加载完成事件
            img.onload = function () {
                // 图像加载完成后，将Promise状态置为已完成
                resolve(img);
            };

            // 监听图像加载错误事件
            img.onerror = function () {
                // 图像加载错误时，将Promise状态置为已拒绝
                reject(new Error("Failed to load image"));
            };



        });

    }




}