

import Layer from "./Layer.js"



export default class Content {
    constructor(commonData) {
        this.commonData=commonData;
        /*
       页面内容描述。该节点不存在时，表示空白页
        */
        this.layers = [];//
    }

    Draw(ctx) {
        for (var n = 0; n < this.layers.length; n++) {
            var layer = this.layers[n];
            layer.Draw(ctx);
        }

    }


    ParseFromXml(xml) {

        if (xml.Layer != null && Array.isArray(xml.Layer)) {
            for (var n = 0; n < xml.Layer.length; n++) {
                var docBodyxml = xml.Layer[n];
                let docBody = new Layer(this.commonData);
                docBody.ParseFromXml(docBodyxml);
                this.layers.push(docBody);
            }
        } else if (xml.Layer != null) {
            let docBody = new Layer(this.commonData);
            docBody.ParseFromXml(xml.Layer);
            this.layers.push(docBody);
        }
    }
}