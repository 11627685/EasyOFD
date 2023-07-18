
import Signature from "./Signature.js"



export default class Signatures {
    constructor(xml) {
        this.docs = xml.docs[0];
        /* 
        /*
        安全标识的最大值，作用与文档入口文件Documentxml中的MaxID
        相同，为了避免在签名时影响文档入口文件，采用了与STID不一样
         的II编码方式。推荐使用“sNNN”的编码方式，NNN从1开始

        */
        this.maxSignId = '';
        this.signature = [];
    }


    ParseFromXml(signaturesLoc) {

        let readpath='';
        if (signaturesLoc.concat('Doc')) {
            readpath = signaturesLoc.replace('Doc_0/', '');
        }

        //'Signs/Signatures.xml'
        let xml = this.docs.get(readpath).Signatures;
        if (xml.MaxSignId != null)
            this.maxSignId = xml.MaxSignId.toString();

        if (xml.Signature != null) {
            if (xml.Signature != null && Array.isArray(xml.Signature)) {
                for (var n = 0; n < xml.Signature.length; n++) {
                    var texml = xml.Signature[n];
                    let docBody = new Signature(this.docs);
                    docBody.ParseFromXml(texml);
                    this.signature.push(docBody);
                }
            }
            else if (xml.Signature != null) {
                let docBody = new Signature(this.docs);
                docBody.ParseFromXml(xml.Signature);
                this.signature.push(docBody);
            }
        }
    }

    Draw(ctx,pageNow) {
        for (var n = 0; n < this.signature.length; n++) {
            var signature = this.signature[n];
            signature.Draw(ctx,pageNow);
            break;
        }
    }

}


