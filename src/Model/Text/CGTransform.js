
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



export default class CGTransform {
    constructor() {
        /*TextCode 中字符编码的起始位置，从 0 开始*/
        this.CodePosition = 0;
        /*变换关系中字符的数量，该数值应大于或等于 1，否则属于错误描述，默认为 1*/
        this.CodeCount = 1;
        /*
         变换关系中字型索引的个数，该数值应大于或等于 1，否则属于错误描述，默认为 1*/

        this.GlyphCount = 1;
        /*  变换关系中字型索引列表*/
        this.Glyphs = [];
    }


    ParseFromXml(xml) {


        if (xml._CodePosition != null)
            this.CodePosition = parseInt(xml._CodePosition.toString());

        if (xml._CodeCount != null)
            this.CodeCount = parseInt(xml._CodeCount.toString());

        if (xml._GlyphCount != null)
            this.GlyphCount = parseInt(xml._GlyphCount.toString());


        if (xml.Glyphs != null) {
            let aArray = xml.Glyphs.toString().split(' ');
            for (var n = 0; n < aArray.length; n++) {
                this.Glyphs.push(parseFloat(aArray[n]));
            }
        }



    }
}
