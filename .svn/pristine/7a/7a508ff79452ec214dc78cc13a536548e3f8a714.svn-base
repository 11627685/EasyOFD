




export default class Reference {
  constructor() {


    /* 
     指向包内的文件，使用绝对路径

    */
    this.fileRef = '';


    /*
      对包内文件进行摘要计算,对所得的二进制摘要值进行basc64编码所得结果
    */
    this.checkValue = '';

  }


  ParseFromXml(xml) {


    if (xml._FileRef != null)
      this.fileRef = xml._FileRef.toString();;


    if (xml.CheckValue != null)
      this.checkValue = xml.CheckValue.toString();;


  }
}


