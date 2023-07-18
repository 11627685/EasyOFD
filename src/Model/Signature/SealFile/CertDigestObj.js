



export default class CertDigestObj{
     
    constructor() {
        this.elementType='SEQUENCE';
        this.ocxNumber=16;
        this.hexNumber=0x10;
        
        this.type =new PrintableString();  //自定义类型
        this.value=new OctetString(); //证书杂凑值
   
    }
     
   
}