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



import Provider from "./Provider.js"
import References from "./References.js"
import StampAnnot from "./StampAnnot.js"
import Seal from "./SealFile/Seal.js"
import OFDImage from "./OFDImage.js"


export default class SingedInfo {
    constructor(docs, signature) {
        this.docs = docs;
        this.signature = signature;
        /*创建签名时所使用的签章组件提供者信息*/
        this.provider = new Provider(docs);
        this.ofdImage=new OFDImage(this);
        /* 
        签名方法，记录安全模块返回的签名算法代码，以便验证时使用
        */
        this.signatureMethod = '';

        /* 签名时间，记录安全模块返回的签名时间，以便验证时使用*/
        this.signatureDateTime = '';
        /*
        包内文件计算所得的摘要记录列表
        一个受本次签名保护的包内文件对应一个Reference节点
        */
        this.references = new References(docs);

        /*
       本签名关联的外观，该节点可出现多次*/

        this.stampAnnot = [];

        //电子印章信息
        this.sealLoc = null;

    }


    ParseFromXml(xml, baseLoc) {

        if (xml.Provider != null)
            this.provider.ParseFromXml(xml.Provider);

        if (xml.SignatureMethod != null)
            this.signatureMethod = xml.SignatureMethod.toString();

        if (xml.SignatureDateTime != null)
            this.signatureDateTime = xml.SignatureDateTime.toString();

        if (xml.References != null)
            this.references.ParseFromXml(xml.References);

        if (xml.StampAnnot != null) {
            if (xml.StampAnnot != null && Array.isArray(xml.StampAnnot)) {
                for (var n = 0; n < xml.StampAnnot.length; n++) {
                    var texml = xml.StampAnnot[n];
                    let docBody = new StampAnnot(this.docs);
                    docBody.ParseFromXml(texml);
                    this.stampAnnot.push(docBody);
                }
            }
            else if (xml.StampAnnot != null) {
                let docBody = new StampAnnot(this.docs);
                docBody.ParseFromXml(xml.StampAnnot);
                this.stampAnnot.push(docBody);
            }
        }

        if (xml.Seal != null) {
            this.sealLoc = xml.Seal.BaseLoc.toString();
            this.sealdate = this.docs.get('Signs/' + baseLoc.replace('Signature.xml', this.sealLoc));
            this.seal = new Seal();
            this.seal.Parse(this.sealdate);
        }

    }

    Draw(ctx, pageNow) {

        
        try {
           
            //get page box 
            let box = this.GetPageBox(pageNow);
            if (box == null) return;
            let x = this.ToPX(box.x);
            let y = this.ToPX(box.y);
            let width = this.ToPX(box.w);
            let height = this.ToPX(box.h);

            //这里绘制签章或电子签
            if (this.signature.signature != null) {

                let imagetype = this.signature.signature.signature.toSign.eseal.eSealInof.picture.type.value;
                if(imagetype=='ofd')//直接绘制到ctx上面
                {
                    this.ofdImage.Draw(ctx, pageNow);

                }else
                {

                    let oneImagep = this.signature.signature.GetDrawData();
                    oneImagep.then((image) => {
                        if(image==null) return;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.drawImage(image, x, y, width, height);
                        ctx.restore();
    
                    });
                }

               
            }
            else if (this.seal != null) {

                let oneImagep = this.seal.GetDrawData();
                oneImagep.then((image) => {
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.drawImage(image, x, y, width, height);
                    ctx.restore();

                })
            }
        } catch (e) {
            console.log(e);
        }

      

    }
    GetPageBox(pageNow) {
        for (var n = 0; n < this.stampAnnot.length; n++) {
            var stampAnnot = this.stampAnnot[n];
            if (stampAnnot.pageRef == pageNow)
                return stampAnnot.boundary;

        }
        if( this.stampAnnot.length>0) return this.stampAnnot[0].boundary;
       
    }

    /**
       * 所以1英寸=25.4毫米
       * @param {12.7 毫米 = 0.127 厘米 = 0.5 英寸 
                 12.7 毫米 = 0.5 英寸×96 像素/英寸 = 48 像素} x 
       */
    ToPX(v) {
        return parseFloat(parseFloat(v) / 25.4 * 96);
    }


}


