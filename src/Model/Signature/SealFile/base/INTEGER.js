import TLV from "./TLV.js"


export default class INTEGER extends TLV {
     
    constructor() {
        super();
        this.elementType='INTEGER';
        this.ocxNumber=2;
        this.hexNumber=0x2;
        this.value='';
    }

    Parse(data) {
        super.Parse(data);
        this.value=this.BitToInt(data.slice(this.offset, this.offset + this.lenth));

    }
     
   
}