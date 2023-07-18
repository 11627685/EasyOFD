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



import TLV from "../../base/TLV.js"
import IA5String from "../../base/IA5String.js"
import OctetString from "../../base/OctetString.js"
import INTEGER from "../../base/INTEGER.js"



export default class CertList extends TLV {
     
    constructor() {
        super();
        this.elementType = 'SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.type = new IA5String();  //图像类型 GIF、BMP、JPG等
        this.data = new OctetString(); //图像数据
        this.width = new INTEGER(); //图像显示宽度  单位MM
        this.height = new INTEGER();//图像显示高度  单位MM
    }

    Parse(data) {
        super.Parse(data);
        this.type.Parse(data.slice(this.offset));
        let step = this.offset + this.type.offset + this.type.lenth;
        this.data.Parse(data.slice(step));
        step = step + this.data.offset + this.data.lenth;
        this.width.Parse(data.slice(step));
        step = step + this.width.offset + this.width.lenth;
        this.height.Parse(data.slice(step));
    }
     
     
   
}