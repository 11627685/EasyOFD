import TLV from "./TLV.js"


 

export default class GeneralizedTime extends TLV{

    constructor() {
        super();
        this.elementType = 'GeneralizedTime';
        this.ocxNumber = 24;
        this.hexNumber = 0x18;

    }

    Parse(data) {
        // super.Parse(data);
       

    }


}