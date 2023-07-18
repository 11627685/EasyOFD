/*
页节点。一个页树中可以包含一个或多个页节点，页顺序是根据页树进行前序遍历时叶节点的访问顺序
*/

import Page from "./Page.js"


export default class Pages {
    constructor(docs,commonData) {
        this.docs = docs;
        this.commonData=commonData;
        this.page = [];
    }

    ParseFromXml(xml) {

        if (xml.Page != null && Array.isArray(xml.Page)) {
            for (var n = 0; n < xml.Page.length; n++) {
                var docBodyxml = xml.Page[n];
                let docBody = new Page(this.docs,this.commonData);
                docBody.ParseFromXml(docBodyxml);
                this.page.push(docBody);
            }
        } else if (xml.Page != null) {
            let docBody = new Page(this.docs,this.commonData);
            docBody.ParseFromXml(xml.Page);
            this.page.push(docBody);
        }




    }
}