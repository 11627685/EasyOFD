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



import DocBody from "./DocBody.js"


export default class OFD {
  constructor() {
    this.version = "1.1";
    this.docType = "OFD";
    this.docBody = [];//DocBody();
    this.xmlns__ofd = "http://www.ofdspec.org/2016";
  }


  ParseFromXml(xml) {
    this.docBody = [];//DocBody();
    if (xml.ofd.OFD != null) {
      let ofd = xml.ofd.OFD;
      if (ofd.DocBody != null && Array.isArray(ofd.DocBody)) {
        for (var n = 0; n < ofd.DocBody.length; n++) {
          var docBodyxml = ofd.DocBody[n];
          let docBody = new DocBody(xml);
          docBody.ParseFromXml(docBodyxml);
          this.docBody.push(docBody);
        }

      } else if (ofd.DocBody != null) {
        let docBody = new DocBody(xml);
        docBody.ParseFromXml(ofd.DocBody);
        this.docBody.push(docBody);
      }

    }

  }




}


