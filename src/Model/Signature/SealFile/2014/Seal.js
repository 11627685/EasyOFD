
import SealInfo from "./SealInfo.js" 
import TLV from "../../base/TLV.js"
import SignInfo from "./SignInfo.js" 


 

export default class Seal extends TLV {

    constructor() {
        super();
        this.version = '2014';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.eSealInof = new SealInfo();  //印章信息
        this.signInfo = new SignInfo(); //制章人对印章的签名的信息
    }

    Parse(data) {
        super.Parse(data);
        this.eSealInof.Parse(data.slice(this.offset));
        let step = this.offset + this.eSealInof.offset + this.eSealInof.lenth;
        this.signInfo.Parse(data.slice(step));
       
    }


}