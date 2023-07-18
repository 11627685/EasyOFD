
 /* Copyright 2023  ZhangXinPan 
 *  11627685@qq.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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