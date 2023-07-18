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



import BITSTRING from "../../base/BITSTRING.js";
import IDENTIFIER from "../../base/IDENTIFIER.js";
import OctetString from "../../base/OctetString.js";
import TLV from "../../base/TLV.js"
import Sign from "./Sign.js"

export default class Signature extends TLV {

    constructor() {
        super();
        this.version = '2020';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.toSign = new Sign();
        this.cert = new OctetString();
        this.signatureAlID = new IDENTIFIER();
        this.signature = new BITSTRING();

    }

    Parse(data) {
        super.Parse(data);
        this.toSign.Parse(data.slice(this.offset));
        let step = this.offset + this.toSign.offset + this.toSign.lenth;
        this.Signature.Parse(data.slice(step));
        step = this.offset + this.Signature.offset + this.Signature.lenth;
        this.cert.Parse(data.slice(step));
        step = this.offset + this.cert.offset + this.cert.lenth;
        this.signatureAlID.Parse(data.slice(step));
        step = this.offset + this.signatureAlID.offset + this.signatureAlID.lenth;
        this.signature.Parse(data.slice(step));

    }

    GetDrawData() {


    }

}