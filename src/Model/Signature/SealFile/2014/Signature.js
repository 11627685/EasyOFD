
import BITSTRING from "../../base/BITSTRING.js";
import TLV from "../../base/TLV.js"
import Sign from "./Sign.js"

export default class Signature extends TLV {

    constructor() {
        super();
        this.version = '2014';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.toSign = new Sign();
        this.Signature = new BITSTRING();

    }

    Parse(data) {
        super.Parse(data);
        this.toSign.Parse(data.slice(this.offset));
        let step = this.offset + this.toSign.offset + this.toSign.lenth;
        this.Signature.Parse(data.slice(step));
    }

    GetDrawData() {


    }

}