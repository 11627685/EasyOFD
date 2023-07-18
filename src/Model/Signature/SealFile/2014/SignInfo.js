import TLV from "../../base/TLV.js"
 


export default class SignInfo extends TLV {


    constructor() {
        super();
        this.elementType = 'SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        // this.cert = new Header();  //制章人签名证书
        // this.signatureAlgorithm = new IA5String(); //签名算法标识
        // this.signData = new ESPropertyInfo(); //制章人的签名值
       
    }

    Parse(data) {
        super.Parse(data);
       
    }


}