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



import Signature2014 from "./2014/Signature.js";
import Signature2020 from "./2020/Signature.js";

export default class Signature {

    constructor() {

        this.version = '2014';


    }

    Parse(data) {
        this.signature = null;
        try {
            this.signature = new Signature2014();
            this.signature.Parse(data)
        } catch (e) {
            try {
                this.version = '2020';
                this.signature = new Signature2020();
                this.signature.Parse(data);
            } catch (e2) {
                console.log("Seal解析异常：" + e2.message);
            }
        }
    }

    GetDrawData() {


        let imaValue = this.signature.toSign.eseal.eSealInof.picture.data.value;
        let imagetype = this.signature.toSign.eseal.eSealInof.picture.type.value;
        if(imaValue==null) 
        {
            return new Promise((resolve, reject) => {
                resolve(null);
            });
        }

        
        return new Promise((resolve, reject) => {


            // 将Uint8Array转换为Blob对象
            const blob = new Blob([imaValue], { type: 'image/'+imagetype });

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
            img.onerror = function (e) {
                // 图像加载错误时，将Promise状态置为已拒绝
                reject(new Error("Failed to load image"));
            };



        });

    }

}