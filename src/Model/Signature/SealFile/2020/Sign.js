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
import BITSTRING from "../../base/BITSTRING.js"
import INTEGER from "../../base/INTEGER.js"
import Seal from "./Seal.js";
import GeneralizedTime from "../../base/GeneralizedTime.js";
import IA5String from "../../base/IA5String.js";
 


export default class Sign extends TLV {

    constructor() {
        super();
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.version = new INTEGER();
        this.eseal = new Seal();
        this.timeInfo = new GeneralizedTime();
        this.dadaHash = new BITSTRING();
        this.propertyInfo = new IA5String()
        

    }

    Parse(data) {
        super.Parse(data);
        this.version.Parse(data.slice(this.offset));
        let step = this.offset + this.version.offset + this.version.lenth;
        this.eseal.Parse(data.slice(step));
        step = this.offset + this.eseal.offset + this.eseal.lenth;
        this.timeInfo.Parse(data.slice(step));
        step = this.offset + this.timeInfo.offset + this.timeInfo.lenth;
        this.dadaHash.Parse(data.slice(step));
        step = this.offset + this.dadaHash.offset + this.dadaHash.lenth;
        this.propertyInfo.Parse(data.slice(step));
       

    }

    GetDrawData() {


    }

}