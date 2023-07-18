
import TLV from "../../base/TLV.js"
import BITSTRING from "../../base/BITSTRING.js"
import INTEGER from "../../base/INTEGER.js"
import Seal from "./Seal.js";
import OctetString from "../../base/OctetString.js";
import IA5String from "../../base/IA5String.js";
import IDENTIFIER from "../../base/IDENTIFIER.js";


export default class Sign extends TLV {

    constructor() {
        super();
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.version = new INTEGER();
        this.eseal = new Seal();
        this.timeInfo = new BITSTRING();
        this.dadaHash = new BITSTRING();
        this.propertyInfo = new IA5String()
        this.cert = new OctetString();
        this.signatureAlgorthm = new IDENTIFIER();

    }

    Parse(data) {
        super.Parse(data);
        this.version.Parse(data.slice(this.offset));
        let step = this.offset + this.version.offset + this.version.lenth;
        this.eseal.Parse(data.slice(step));
        step = this.offset + this.eseal.offset + this.eseal.lenth;
        this.timeInfo.Parse(data.slice(step));
        step = this.offset + this.timeInfo.offset + this.timeInfo.lenth;
        this.dadaHash.Parse(data.slice(step));
        step = this.offset + this.dadaHash.offset + this.dadaHash.lenth;
        this.propertyInfo.Parse(data.slice(step));
        step = this.offset + this.propertyInfo.offset + this.propertyInfo.lenth;
        this.cert.Parse(data.slice(step));
        step = this.offset + this.cert.offset + this.cert.lenth;
        this.signatureAlgorthm.Parse(data.slice(step));

    }

    GetDrawData() {


    }

}