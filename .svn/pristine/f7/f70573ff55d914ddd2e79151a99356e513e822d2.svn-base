

import Reference from "./Reference.js" 


export default class References {
  constructor(docs) {
    this.docs = docs;
    /* 
    摘要方法,视应用场景的不同使用不同的摘要方法。
    用于各行业应用时,应使用符合该行业安全标准的算法
    */
    this.checkMethod = 'MD5';


    /*
      针对一个文件的摘要节点
    */
    this.reference = [];



  }


  ParseFromXml(xml) {


    if (xml._CheckMethod != null)
      this.checkMethod=xml._CheckMethod.toString();;


    if (xml.Reference != null) {
      if (xml.Reference != null && Array.isArray(xml.Reference)) {
        for (var n = 0; n < xml.Reference.length; n++) {
          var texml = xml.Reference[n];
          let docBody = new Reference(this.docs);
          docBody.ParseFromXml(texml);
          this.reference.push(docBody);
        }
      }
      else if (xml.StampAnnot != null) {
        let docBody = new Reference(this.docs);
        docBody.ParseFromXml(xml.StampAnnot);
        this.reference.push(docBody);
      }
    }

  }

}


