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



import SingedInfo from "./SingedInfo.js"

import SignatureFile from "./SealFile/Signature.js";


export default class Signature {
    constructor(docs) {
        this.docs = docs;
        /* 签名或签章的标识*/
        this.id = '';
        /* 签名节点的类型，目前规定了两个可选值，Scal表示是安全签章，Sign
       表示是纯数字签名*/
        this.type = '';

        /* 指向包内的签名描述文件*/
        this.baseLoc = '';

        this.singedInfo = new SingedInfo(this.docs, this);

        /* 地址
        签名值指向包内的一个二进制文件,该文件存放数字签名或签章结果。
        该值需满足的密码安全要求在其他规范中限定。*/
        this.signedValue = '';


    }

    ParseFromXml(xml) {
        if (xml._ID != null)
            this.id = xml._ID.toString();

        if (xml._Type != null)
            this.type = xml._Type.toString();

        if (xml._BaseLoc != null) {
            this.baseLoc = xml._BaseLoc.toString();

            if (this.baseLoc.includes('Doc')) {
                this.baseLoc = this.baseLoc.replace('/Doc_0/', '');
            }

            if (!this.baseLoc.includes('Signs/')) {
                this.baseLoc = 'Signs/' + this.baseLoc
            }

            let signxml = this.docs.get(this.baseLoc).Signature;

            if (signxml.SignedValue != null) {
                this.signedValue = signxml.SignedValue.toString();
                if (this.signedValue.includes('Doc')) {
                    this.signedValue = this.signedValue.replace('/Doc_0/', '');
                    this.signedValue = this.signedValue.replace('Doc_0/', '');
                }

                if (!this.signedValue.includes('Signs/'))
                   this.signedate = this.docs.get(this.baseLoc.replace('Signature.xml',this.signedValue));
                else
                    this.signedate = this.docs.get(this.signedValue);

                this.signature = new SignatureFile();
                this.signature.Parse(this.signedate);
            }
            if (signxml.SignedInfo != null)
                this.singedInfo.ParseFromXml(signxml.SignedInfo, this.baseLoc);
        }
    }

    Draw(ctx, pageNow) {

        this.singedInfo.Draw(ctx, pageNow);

    }

}


