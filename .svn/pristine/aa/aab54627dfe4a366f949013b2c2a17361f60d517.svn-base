import TLV from "../../base/TLV.js"
import IA5String from "../../base/IA5String.js"
import Header from "./Header.js"
import ESPropertyInfo from "./ESPropertyInfo.js"
import ESPictrueInfo from "./ESPictrueInfo.js"


export default class SealInfo extends TLV {


    constructor() {
        super();
        this.elementType = 'SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.header = new Header();  //印章头
        this.esID = new IA5String(); //印章标识
        this.property = new ESPropertyInfo(); //印章属性
        this.picture = new ESPictrueInfo(); //印章图像数据 --只处理到这里
        // this.extDatas=new ExtensionDatas(); //自定义数据-舍弃不处理
    }

    Parse(data) {
        super.Parse(data);
        this.header.Parse(data.slice(this.offset));
        let step = this.offset + this.header.offset + this.header.lenth;
        this.esID.Parse(data.slice(step));
        step = step + this.esID.offset + this.esID.lenth;
        this.property.Parse(data.slice(step));
        step = step + this.property.offset + this.property.lenth;
        this.picture.Parse(data.slice(step));
         
    }


}