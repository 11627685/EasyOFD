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



import Layer from "./Layer.js"



export default class Content {
    constructor(commonData) {
        this.commonData=commonData;
        /*
       页面内容描述。该节点不存在时，表示空白页
        */
        this.layers = [];//
    }

    Draw(ctx) {
        for (var n = 0; n < this.layers.length; n++) {
            var layer = this.layers[n];
            layer.Draw(ctx);
        }

    }


    ParseFromXml(xml) {

        if (xml.Layer != null && Array.isArray(xml.Layer)) {
            for (var n = 0; n < xml.Layer.length; n++) {
                var docBodyxml = xml.Layer[n];
                let docBody = new Layer(this.commonData);
                docBody.ParseFromXml(docBodyxml);
                this.layers.push(docBody);
            }
        } else if (xml.Layer != null) {
            let docBody = new Layer(this.commonData);
            docBody.ParseFromXml(xml.Layer);
            this.layers.push(docBody);
        }
    }
}