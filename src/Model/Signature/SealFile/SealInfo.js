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


import TLV from "./base/TLV.js"
import IA5String from "./base/IA5String.js"
import Header from "./Header.js"
import ESPropertyInfo from "./ESPropertyInfo.js"
import ESPictrueInfo from "./ESPictrueInfo.js"


export default class SealInfo extends TLV {


    constructor() {
        super();
        this.elementType = 'SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.header = new Header();  //印章头
        this.esID = new IA5String(); //印章标识
        this.property = new ESPropertyInfo(); //印章属性
        this.picture = new ESPictrueInfo(); //印章图像数据 --只处理到这里
        // this.extDatas=new ExtensionDatas(); //自定义数据-舍弃不处理
    }

    Parse(data) {
        super.Parse(data);
        this.header.Parse(data.slice(this.offset));
        let step = this.offset + this.header.offset + this.header.lenth;
        this.esID.Parse(data.slice(step));
        step = step + this.esID.offset + this.esID.lenth;
        this.property.Parse(data.slice(step));
        step = step + this.property.offset + this.property.lenth;
        this.picture.Parse(data.slice(step));
        console.log('非法的seal文件')

    }


}