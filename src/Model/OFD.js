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


