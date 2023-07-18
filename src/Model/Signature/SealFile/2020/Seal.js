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



import SealInfo from "./SealInfo.js"
import TLV from "../../base/TLV.js"
import OctetString from "../../base/OctetString.js"
import IDENTIFIER from "../../base/IDENTIFIER.js"
import BITSTRING from "../../base/BITSTRING.js"

export default class Seal extends TLV {

    constructor() {
        super();
        this.version = '2020';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.eSealInof = new SealInfo();  //印章信息
        this.cert = new OctetString(); //制章者证书
        this.signAlgID = new IDENTIFIER(); //签名算法标识
        this.signValue = new BITSTRING(); //签名值
    }

    Parse(data) {
        super.Parse(data);
        this.eSealInof.Parse(data.slice(this.offset));
        let step = this.offset + this.eSealInof.offset + this.eSealInof.lenth;
        this.cert.Parse(data.slice(step));
        step = step + this.cert.offset + this.cert.lenth;
        this.signAlgID.Parse(data.slice(step));
        step = step + this.signAlgID.offset + this.signAlgID.lenth;
        this.signValue.Parse(data.slice(step));

       

    }


}