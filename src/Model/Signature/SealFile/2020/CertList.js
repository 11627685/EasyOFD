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




export default class CertList{
     
    constructor() {
       // this.elementType='CHOICE';//??
       
        this.elementType='SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;

        // this.certs =new CertInfoList();  //签章者证书 对象为 OctetString
        // this.certsDigestList=new CertsDigestList(); //签章者证书杂凑值  CertDigestObj
   
    }
     
   
}