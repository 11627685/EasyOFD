

import TLV from "./TLV.js"




export default class IDENTIFIER extends TLV {

    constructor() {
        super();
        this.elementType = 'IDENTIFIER';
        this.ocxNumber = 6;
        this.hexNumber = 0x6;



    }

    Parse(data) {
        super.Parse(data);
       
    }


}