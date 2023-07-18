import TLV from "./TLV.js"



export default class OctetString extends TLV {  
     
    constructor() {
        super();
        this.elementType='OCTET STRING';
        this.ocxNumber=4;
        this.hexNumber=0x4;
    }

    Parse(data) {
        super.Parse(data);
        this.value= data.slice(this.offset, this.offset + this.lenth);
    }

     
   
}
