


export default class View {


    constructor(easyOFD) {
        this.easyOFD = easyOFD;
        this.doc = easyOFD.doc;
        this.pageNow = 1;

    }

    Draw(ctx) //参数画图设备，此处为canvas
    {
        //文件对象入口，可以存在多个，以便在一个档中包含多个文书类版式文档
        this.docBody = this.doc.ofd.docBody[0];//本版本只默认一个

        let page = this.docBody.docRoot.pages.page[this.pageNow - 1];
        this.AllPageNo= this.docBody.docRoot.pages.page.length;
        //页面大小

        //该节点不出现时则使用模板页中的定义，如果模板页不存在或模板页中没有定义页面区域则使用文件CommonData 中的定义
        let template = this.docBody.docRoot.commonData.GetTemplatePageByID(page.template[0].templateID)
        //绘制模版
        if (template != null) {
            template.Draw(ctx);
        }
        // //绘制模版
        if (page != null) {
            page.Draw(ctx);
        }
        //电子签字绘制
        let signatures = this.docBody.signatures;
        if (signatures != null) {
            signatures.Draw(ctx, page.id);
        }
    }
    SetPage(pageNow) {
        this.pageNow = pageNow;
    }
    GetAllPageNo()
    {
        AllPageNo
    }

    GetPagePhysicalBox() {
        //文件对象入口，可以存在多个，以便在一个档中包含多个文书类版式文档
        this.docBody = this.doc.ofd.docBody[0];//本版本只默认一个
        //顺序，定义该页页面区域的大小和位置，仅对该页有效。该节点不出
        // 现时则使用模板页中的定义，如果模板页不存在或模板页中没
        // 有定义页面区域则使用文件 CommonData 中的定义
        let page = this.docBody.docRoot.pages.page[this.pageNow - 1];

        if (page!=null & page.area!=null &page.area.physicalBox != null)
            return page.area.physicalBox;
        let template = this.docBody.docRoot.commonData.GetTemplatePageByID(page.template[0].templateID);
        if (template.page.area.physicalBox != null)
            return template.page.area.physicalBox;
        return this.docBody.docRoot.commonData.pageArea.physicalBox;
    }

}


