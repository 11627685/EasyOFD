

import TLV from "./TLV.js"

export default class IA5String extends TLV {

    constructor() {
        super();
        this.elementType = 'IA5String';
        this.ocxNumber = 22;
        this.hexNumber = 0x16;
        this.value = '';
    }

    Parse(data) {
        super.Parse(data);
        let uint8Array = data.slice(this.offset, this.offset + this.lenth);
        this.value = String.fromCharCode.apply(null, uint8Array);
    }

}