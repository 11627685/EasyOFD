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
import INTEGER from "../../base/INTEGER.js"

export default class Header extends TLV {
     
    constructor() {
        super();
        this.elementType='SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.ID =new IA5String('ES');  //头标识
        this.version=new INTEGER(4); //印章版本号
        this.Vid=new IA5String(); //厂商标识
        
    }

    Parse(data) {
        super.Parse(data);
        this.ID.Parse(data.slice(this.offset));
        let step = this.offset + this.ID.offset + this.ID.lenth;
        this.version.Parse(data.slice(step));
        step =step+ this.version.offset + this.version.lenth;
        this.Vid.Parse(data.slice(step));
      
    }
     
   
}