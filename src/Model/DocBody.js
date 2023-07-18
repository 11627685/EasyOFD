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


import DocInfo from "./DocInfo.js"
import Document from "../Model/Document/Document.js"
import Signatures from "./Signature/Signatures.js"



export default class DocBody {

  constructor(xml) {
    this.docInfo = new DocInfo();
    this.docRoot = new Document(xml);
    this.docRootLoc = "";
    this.signatures = new Signatures(xml);
    this.signaturesLoc = "";

  }

  ParseFromXml(xml) {
    if (xml.DocInfo != null)
      this.docInfo.ParseFromXml(xml.DocInfo);
    if (xml.DocRoot != null)
      this.docRootLoc = xml.DocRoot.toString().replace('/Doc_', 'Doc_');
    if (xml.Signatures != null) {
      this.signaturesLoc = xml.Signatures.toString().replace('/Doc_', 'Doc_');
      this.signatures.ParseFromXml(this.signaturesLoc);
    }

    this.docRoot.ParseFromXml(xml);
  }



}
