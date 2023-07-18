
import TLV from "./TLV.js"


 

export default class BITSTRING extends TLV{

    constructor() {
        super();
        this.elementType = 'BITSTRING';
        this.ocxNumber = 3;
        this.hexNumber = 0x3;

    }

    Parse(data) {
        super.Parse(data);
       

    }


}