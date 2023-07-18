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

export default class ESPropertyInfo extends TLV {
     
    constructor() {
        super();
        this.elementType = 'SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        // this.type =new INTEGER();  //印章类型
        // this.name=new UTF8String(); //印章名称  XX财务专用章  
        // this.certListType=new INTEGER(); //签章者证书信息类型 1 数字证书 2 数字证书的杂凑值
        // this.certList=new CertList(); //签章者证书信息列表
        // this.createDate=new GeneralizedTime(); //签章者证书信息类型
        // this.validStart=new GeneralizedTime(); //签章者证书信息类型
        // this.validEnd=new GeneralizedTime(); //签章者证书信息类型
        
    }

    Parse(data) {
        super.Parse(data);
        

    }
     
   
}