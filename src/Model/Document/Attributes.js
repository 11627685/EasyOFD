


export default class Attributes {
    constructor(commonData) {
        // Body 正文层，Foregroud 前景层，Background 背景层
        this.commonData=commonData;
        this.type = 'Body';
        this.drawParam = '';//
        this.id = '';
        /*
                              最上层
            前景层       
            前景模板
            正文层
            正文模板
            背景层
            背景模板
                            最下层
        */
    }

    Draw(ctx) {
 

    }

    ParseFromXml(xml) {

        if (xml._ID != null)
            this.id = xml._ID.toString();

        if (xml._Type != null)
            this.type = xml._Type.toString();

        if (xml._DrawParam != null)
            this.drawParam = xml._DrawParam.toString();

    }
}