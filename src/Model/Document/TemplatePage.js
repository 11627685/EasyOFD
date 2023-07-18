

import Page from "./Page.js"

export default class TemplatePage {
    constructor(docs,commonData) {
        this.docs = docs;
        this.commonData=commonData;
        //模板页的标识，不能与已有标识重复
        this.id = "";
        this.page = new Page(this.docs,this.commonData);
        //指向模板页内容描述文件
        this.baseLoc = "";
        //模板页名称
        this.name = "";
        //模板页默认图层类型，其类型描述和呈现顺序与Layer中Type的描述和处理一致。
        //如果页面引用多个模板的此属性相同，则应根据引用的顺序来展示，先引用先绘制。
        this.zOrder = "";
    }

    Draw(ctx) {
        this.page.Draw(ctx);

    }

    ParseFromXml(xml) {
        if (xml._ID != null)
            this.id = xml._ID.toString();
        if (xml._BaseLoc != null) {
            this.baseLoc = xml._BaseLoc.toString();
            let page = this.docs.get(this.baseLoc);
            this.page.ParseFromXml(page.Page);
        }

        if (xml._Name != null)
            this.name = xml._Name.toString();
        if (xml._ZOrder != null)
            this.zOrder = xml._ZOrder.toString();

    }

}