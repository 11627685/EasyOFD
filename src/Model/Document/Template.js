


export default class Template {
    constructor() {

        this.templateID = "";
        //模板页默认图层类型，其类型描述和呈现顺序与Layer中Type的描述和处理一致。
        //如果页面引用多个模板的此属性相同，则应根据引用的顺序来展示，先引用先绘制。
        this.zOrder = "";
    }

    ParseFromXml(xml) {
        if (xml._TemplateID != null)
            this.templateID = xml._TemplateID.toString();
        if (xml._ZOrder != null)
            this.zOrder = xml._ZOrder.toString();

    }
}