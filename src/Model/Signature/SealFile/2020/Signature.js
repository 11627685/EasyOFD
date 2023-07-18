
import BITSTRING from "../../base/BITSTRING.js";
import IDENTIFIER from "../../base/IDENTIFIER.js";
import OctetString from "../../base/OctetString.js";
import TLV from "../../base/TLV.js"
import Sign from "./Sign.js"

export default class Signature extends TLV {

    constructor() {
        super();
        this.version = '2020';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.toSign = new Sign();
        this.cert = new OctetString();
        this.signatureAlID = new IDENTIFIER();
        this.signature = new BITSTRING();

    }

    Parse(data) {
        super.Parse(data);
        this.toSign.Parse(data.slice(this.offset));
        let step = this.offset + this.toSign.offset + this.toSign.lenth;
        this.Signature.Parse(data.slice(step));
        step = this.offset + this.Signature.offset + this.Signature.lenth;
        this.cert.Parse(data.slice(step));
        step = this.offset + this.cert.offset + this.cert.lenth;
        this.signatureAlID.Parse(data.slice(step));
        step = this.offset + this.signatureAlID.offset + this.signatureAlID.lenth;
        this.signature.Parse(data.slice(step));

    }

    GetDrawData() {


    }

}