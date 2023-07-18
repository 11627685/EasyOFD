
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



import PageArea from "./PageArea.js"
import Content from "./Content.js"
import Template from "./Template.js"


export default class Page {
    constructor(docs,commonData) {
        this.docs = docs;
        this.commonData=commonData;
        //声明该页的标识，不能与已有的标识重复
        this.id = "";
        //指向页对象描述文件
        this.baseLoc = "";
        /*
        该页所使用的模板页。模板页的内容结构和普通页相同，
        定义在CommonData指定的XMK文件中，一个页可以使用多个模板页。
        通过ZOrder属性来控制模板在页面中的呈现顺序
        */
        this.template = [];//
        //定义该页页面区域的大小和位置，仅对该页有效。该节点不出现时则使用模板页定义，
        //如果模板页不存在或没有定义页面区域，则使用CommonData
        this.area = new PageArea(this.commonData);

        //页资源，指向该页使用的资源文件
        this.pageRes = [];

        //页面内容描述，该节点不存在时，表示空白页
        this.content = [];
        //在 conten内层节点，一个页包含一个或多个层
        // this.layer = new Layer();
        //与页面关联的动作，事件类型应位PO
        this.actions = [];
    }

    Draw(ctx) {
        for (var n = 0; n < this.content.length; n++) {
            var docBodyxml = this.content[n];
            docBodyxml.Draw(ctx); 
        }
    }

    ParseFromXml(xml) {

        if (xml._ID != null)
            this.id = xml._ID.toString();

        if (xml._BaseLoc != null) {
            this.baseLoc = xml._BaseLoc.toString();
            if (this.docs != null)//根据地址初始化次Page类
            {
                xml = this.docs.get(this.baseLoc).Page;
            }
        }


        if (xml.Area != null)
            this.area.ParseFromXml(xml.Area);

        //页面内容描述，该节点不存在时，表示空白页
        if (xml.Content != null && Array.isArray(xml.Content)) {
            for (var n = 0; n < ofd.DocBody.length; n++) {
                var docBodyxml = xml.Content[n];
                let docBody = new Content(this.commonData);
                docBody.ParseFromXml(docBodyxml);
                this.content.push(docBody);
            }
        } else if (xml.Content != null) {
            let docBody = new Content(this.commonData);
            docBody.ParseFromXml(xml.Content);
            this.content.push(docBody);
        }


        //页面内容描述，该节点不存在时，表示空白页
        if (xml.Template != null && Array.isArray(xml.Template)) {
            for (var n = 0; n < ofd.Template.length; n++) {
                var docBodyxml = xml.Template[n];
                let docBody = new Template(this.commonData);
                docBody.ParseFromXml(docBodyxml);
                this.template.push(docBody);
            }
        } else if (xml.Template != null) {
            let docBody = new Template(this.commonData);
            docBody.ParseFromXml(xml.Template);
            this.template.push(docBody);
        }


    }
}