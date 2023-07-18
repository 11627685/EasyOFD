
import PageArea from "./PageArea.js"

import TemplatePage from "./TemplatePage.js"
 /* Copyright 2023  ZhangXinPan 
 *  11627685@qq.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



import Res from "./Res.js"


export default class CommonData {


    constructor(docs) {
        this.docs = docs;
        //当前文档中所有对象使用标识的最大值，初始值为0。当向文档中新增一个对象时，需要分配一个新的标识，新标识为此值+1
        this.maxUnitID = "";
        //指定该文档页面区域的默认大小和位置
        this.pageArea = new PageArea();
        //公共资源序列，每个节点指向OFD包内的一个资源描述文档
        this.publicRes = ''; //"PublicRes.xml";

        this.pubres = [];//new Res();

        this.documentRes = ''; //"DocumentRes.xml";

        this.docres = [];//new Res();
        //模板页序列，为一系列模板页的集合，模板内容结构和普通页面相同
        this.templatePage = [];// new TemplatePage();
        //引用在资源文件中定义的颜色空间标识，有关颜色空间见8.3.1
        this.defaultCS = "";
    }


    GetTemplatePageByID(id) {
        for (var n = 0; n < this.templatePage.length; n++) {
            var templatePage = this.templatePage[n];
            if (templatePage.id == id) {
                return templatePage;
            }
        }
        return null;
    }

    GetPublicRes() {
        if (this.pubres.length > 0)
            return this.pubres;
        else
            return null;
    }
    GetMultiMediasByID(id) {
        //顺序 先从公共资源获取，没有再从docres获取
        if (this.pubres.length > 0) {
            for (var p = 0; p < this.pubres.length; p++) {
                var res = this.pubres[p];
                let reMedia = res.GetMultiMediasByID(id);
                if (reMedia != null) return reMedia;
            }
        }
        if (this.docres.length > 0) {
            for (var p = 0; p < this.docres.length; p++) {
                var res = this.docres[p];
                let reMedia = res.GetMultiMediasByID(id);
                if (reMedia != null) return reMedia;
            }
        }

        return null;
    }
    GetFontByID(id) {
        for (var n = 0; n < this.templatePage.length; n++) {
            var templatePage = this.templatePage[n];
            if (templatePage.id == id) {
                return templatePage;
            }
        }
        return null;
    }


    ParseFromXml(xml) {

        if (xml.MaxUnitID != null)
            this.maxUnitID = xml.MaxUnitID.toString();
        if (xml.DefaultCS != null)
            this.defaultCS = xml.DefaultCS.toString();
        if (xml.PageArea != null)
            this.pageArea.ParseFromXml(xml.PageArea);

        //模板页序列
        if (xml.TemplatePage != null && Array.isArray(xml.TemplatePage)) {
            for (var n = 0; n < xml.TemplatePage.length; n++) {
                var texml = xml.TemplatePage[n];
                let docBody = new TemplatePage(this.docs, this);
                docBody.ParseFromXml(texml);
                this.templatePage.push(docBody);
            }
        }
        else if (xml.TemplatePage != null) {
            let docBody = new TemplatePage(this.docs, this);
            docBody.ParseFromXml(xml.TemplatePage);
            this.templatePage.push(docBody);
        }
        //公共资源
        if (xml.PublicRes != null && Array.isArray(xml.PublicRes)) {
            this.publicRes = xml.PublicRes.toString();
            for (var n = 0; n < xml.PublicRes.length; n++) {
                var texml = xml.TemplatePage[n];
                let docBody = new Res(this.docs);
                docBody.ParseFromXml(texml);
                this.pubres.push(docBody);
            }
        }
        else if (xml.PublicRes != null) {
            this.publicRes = xml.PublicRes.toString();
            let docBody = new Res(this.docs);
            docBody.ParseFromXml(xml.PublicRes);
            this.pubres.push(docBody);
        }

        //documentRes
        if (xml.DocumentRes != null && Array.isArray(xml.DocumentRes)) {
            this.documentRes = xml.DocumentRes.toString();
            for (var n = 0; n < xml.DocumentRes.length; n++) {
                var texml = xml.TemplatePage[n];
                let docBody = new Res(this.docs);
                docBody.ParseFromXml(texml);
                this.docres.push(docBody);
            }
        }
        else if (xml.DocumentRes != null) {
            this.documentRes = xml.DocumentRes.toString();
            let docBody = new Res(this.docs);
            docBody.ParseFromXml(xml.DocumentRes);
            this.docres.push(docBody);
        }



    }

}