
import CommonData from "./CommonData.js"
import Pages from "./Pages.js"


export default class Document {
    constructor(xml) {
        this.docs = xml.docs[0];
        //文档公共数据，定义了页面区域、公共资源等数据
        this.commonData = new CommonData(this.docs);
        //页树，
        this.pages = new Pages(this.docs,this.commonData);

        // //大纲
        // this.outLines = new OutLines();
        // //文档的权限声明
        // this.Permissions = new Permissions();
        // //文档管理的动作序列，当存在多个Action对象时，所有动作以此执行
        // this.action = []; //Action 
        // //文档的视图首选项
        // this.vPreferences = new VPreferences();
        //文档的书签集
        this.bookmarks = [];//Bookmark
        //指向附件列表文件
        this.annotations = "Annots/Annotations.xml";
        //指向注释列表文件
        this.attachments = "Attachs/Attachments.xml";
        this.rootPath = "";
    }

    ParseFromXml(xml) {

        if (this.docs != null) {
            let doc = this.docs.get('Document.xml').Document;
            if (doc.CommonData != null)
                this.commonData.ParseFromXml(doc.CommonData);

            if (doc.Pages != null)
                this.pages.ParseFromXml(doc.Pages);
        }

    }


}






