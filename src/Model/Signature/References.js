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


