
import TLV from "../../base/TLV.js"

import INTEGER from "../../base/INTEGER.js"
import UTF8String from "../../base/UTF8String.js" 
import CertList from "./CertList.js"
import GeneralizedTime from "../../base/GeneralizedTime.js"
 


export default class ESPropertyInfo extends TLV {
     
    constructor() {
        super();
        this.elementType = 'SEQUENCE';
        this.ocxNumber = 48;
        this.hexNumber = 0x30;
        this.type =new INTEGER();  //印章类型
        // this.name=new UTF8String(); //印章名称  XX财务专用章  
        // this.certListType=new INTEGER(); //签章者证书信息类型 1 数字证书 2 数字证书的杂凑值
        // this.certList=new CertList(); //签章者证书信息列表
        // this.createDate=new GeneralizedTime(); //签章者证书信息类型
        // this.validStart=new GeneralizedTime(); //签章者证书信息类型
        // this.validEnd=new GeneralizedTime(); //签章者证书信息类型
        
    }

    Parse(data) {
        super.Parse(data);
      

    }
     
   
}