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
