
import TLV from "../../base/TLV.js"
import IA5String from "../../base/IA5String.js"
import OctetString from "../../base/OctetString.js"
import INTEGER from "../../base/INTEGER.js"



export default class CertList extends TLV {

    constructor() {
        super();
        this.elementType = 'SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.type = new IA5String();  //图像类型 GIF、BMP、JPG等
        this.data = new OctetString(); //图像数据
        this.width = new INTEGER(); //图像显示宽度  单位MM
        this.height = new INTEGER();//图像显示高度  单位MM
    }

    Parse(data) {
        super.Parse(data);
        this.type.Parse(data.slice(this.offset));
        let step = this.offset + this.type.offset + this.type.lenth;
        this.data.Parse(data.slice(step));
        step = step + this.data.offset + this.data.lenth;
        this.width.Parse(data.slice(step));
        step = step + this.width.offset + this.width.lenth;
        this.height.Parse(data.slice(step));
        
    }



}