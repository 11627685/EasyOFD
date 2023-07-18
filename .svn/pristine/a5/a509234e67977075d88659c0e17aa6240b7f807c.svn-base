export default class DocInfo {

  constructor() {
    // UUID算法生成的32个字符
    this.docID = "";
    //文档标题
    this.title = "";
    //文档作者
    this.author = "";
    //文档主题
    this.subject = "";
    //文档的摘要和注释
    this.abstract = "";
    //文档创建日期
    this.creationDate = "";
    //文档最近修改日期
    this.modDate = "";
    //文档分类 Normal--普通文档 默认  EBook--电子书 ENewsPaper--电子报纸 EMagzinc-电子期刊
    this.docUsage = "";
    //文档封面，次路径指向一个图片文件
    this.cover = "";
    //创建文档的应用程序
    this.creator = "";
    //创建文档的应用程序的版本信息
    this.creatorVersion = "";

  }

  ParseFromXml(xml) {

 
    if (xml.DocID != null)
      this.docID = xml.DocID.toString();

    if (xml.Title != null)
      this.title = xml.Title.toString();

    if (xml.Author != null)
      this.author = xml.Author.toString();


    if (xml.Subject != null)
      this.subject = xml.Subject.toString();


    if (xml.Abstract != null)
      this.abstract = xml.Abstract.toString();


    if (xml.CreationDate != null)
      this.creationDate = xml.CreationDate.toString();
 

    if (xml.ModDate != null)
      this.modDate = xml.ModDate.toString();


    if (xml.DocUsage != null)
      this.docUsage = xml.DocUsage.toString();

    if (xml.Cover != null)
      this.cover = xml.Cover.toString();

    if (xml.Creator != null)
      this.creator = xml.Creator.toString();

      

    if (xml.CreatorVersion != null)
      this.creatorVersion = xml.CreatorVersion.toString();
   


  }

}