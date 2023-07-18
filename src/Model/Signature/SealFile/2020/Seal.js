
import SealInfo from "./SealInfo.js"
import TLV from "../../base/TLV.js"
import OctetString from "../../base/OctetString.js"
import IDENTIFIER from "../../base/IDENTIFIER.js"
import BITSTRING from "../../base/BITSTRING.js"

export default class Seal extends TLV {

    constructor() {
        super();
        this.version = '2020';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.eSealInof = new SealInfo();  //印章信息
        this.cert = new OctetString(); //制章者证书
        this.signAlgID = new IDENTIFIER(); //签名算法标识
        this.signValue = new BITSTRING(); //签名值
    }

    Parse(data) {
        super.Parse(data);
        this.eSealInof.Parse(data.slice(this.offset));
        let step = this.offset + this.eSealInof.offset + this.eSealInof.lenth;
        this.cert.Parse(data.slice(step));
        step = step + this.cert.offset + this.cert.lenth;
        this.signAlgID.Parse(data.slice(step));
        step = step + this.signAlgID.offset + this.signAlgID.lenth;
        this.signValue.Parse(data.slice(step));

       

    }


}