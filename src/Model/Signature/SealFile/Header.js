

import TLV from "./base/TLV.js"

export default class Header extends TLV {
     
    constructor() {
        super();
        this.elementType='SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        // this.ID =new IA5String('ES');  //头标识
        // this.version=new INTEGER(4); //印章版本号
        // this.signAlgID=new IA5String(); //厂商标识
        
    }

    Parse(data) {
        super.Parse(data);
      
    }
     
   
}