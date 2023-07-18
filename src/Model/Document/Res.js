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


import DrawParams from "../Page/DrawParam.js"
import Font from "../Text/Font.js"
import MultiMedia from "./MultiMedia.js"


export default class Res {
    constructor(docs) {
        this.docs = docs;
        //定义此资源文件的通用数据存储路径。意义在于明确资源文件存储的位置
        this.baseLoc = "";
        //包含了一组颜色空间的描述
        this.colorSpaces = [];
        //包含了一组绘制参数的描述
        this.drawParams = [];


        //包含了一组文档所用字型的描述
        this.fonts = [];

        //包含了一组文档所用多媒体对象描述
        this.multiMedias = []; //MultiMedias

        //包含了一组矢量图像（被复合图元对象所引用）的描述
        this.compositeGraphicUnits = [];
    }

    GetDrawParamByID(ID) {
        for (var n = 0; n < this.drawParams.length; n++) {
            var drawParam = this.drawParams[n];
            if (drawParam.id == ID) {
                return drawParam;
            }
        }
        return null;
    }

    GetFontByID(ID) {
        for (var n = 0; n < this.fonts.length; n++) {
            var font = this.fonts[n];
            if (font.id == ID) {
                return font;
            }
        }
        return null;
    }

    GetMultiMediasByID(ID) {
        for (var n = 0; n < this.multiMedias.length; n++) {
            var m = this.multiMedias[n];
            if (m.id == ID) {
                return m;
            }
        }
        return null;
    }


    ParseFromXml(xml) {

        if (xml.toString() != null) {
            let docres = this.docs.get(xml.toString()).Res;

            if (docres._BaseLoc != null)
                this.baseLoc = docres._BaseLoc.toString();
            //绘制参数
            if (docres.DrawParams != null) {
                if (docres.DrawParams.DrawParam != null && Array.isArray(docres.DrawParams.DrawParam)) {
                    for (var n = 0; n < docres.DrawParams.DrawParam.length; n++) {
                        var texml = docres.DrawParams.DrawParam[n];
                        let docBody = new DrawParams();
                        docBody.ParseFromXml(texml);
                        this.drawParams.push(docBody);
                    }
                }
                else if (docres.DrawParams != null) {
                    let docBody = new DrawParams();
                    docBody.ParseFromXml(docres.DrawParams);
                    this.drawParams.push(docBody);
                }
            }
            //文档所用字型的描述
            if (docres.Fonts != null) {
                if (docres.Fonts.Font != null && Array.isArray(docres.Fonts.Font)) {
                    for (var n = 0; n < docres.Fonts.Font.length; n++) {
                        var texml = docres.Fonts.Font[n];
                        let docBody = new Font();
                        docBody.ParseFromXml(texml);
                        this.fonts.push(docBody);
                    }
                }
                else if (docres.Fonts != null) {
                    let docBody = new Font();
                    docBody.ParseFromXml(docres.Fonts.Font);
                    this.fonts.push(docBody);
                }
            }

            //多媒体对象描述
            if (docres.MultiMedias != null) {
                if (docres.MultiMedias.MultiMedia != null && Array.isArray(docres.MultiMedias.MultiMedia)) {
                    for (var n = 0; n < docres.MultiMedias.MultiMedia.length; n++) {
                        var texml = docres.MultiMedias.MultiMedia[n];
                        let docBody = new MultiMedia(this.docs);
                        docBody.ParseFromXml(texml);
                        this.multiMedias.push(docBody);
                    }
                }
                else if (docres.MultiMedias != null) {
                    let docBody = new MultiMedia(this.docs);
                    docBody.ParseFromXml(docres.MultiMedias.MultiMedia);
                    this.multiMedias.push(docBody);
                }
            }

        }


    }

    ParseFromXmlOFD(xml) {

        if (xml.toString() != null) {
          
            if (xml._BaseLoc != null)
                this.baseLoc = xml._BaseLoc.toString();
            //绘制参数
            if (xml.DrawParams != null) {
                if (xml.DrawParams.DrawParam != null && Array.isArray(xml.DrawParams.DrawParam)) {
                    for (var n = 0; n < xml.DrawParams.DrawParam.length; n++) {
                        var texml = xml.DrawParams.DrawParam[n];
                        let docBody = new DrawParams();
                        docBody.ParseFromXml(texml);
                        this.drawParams.push(docBody);
                    }
                }
                else if (xml.DrawParams != null) {
                    let docBody = new DrawParams();
                    docBody.ParseFromXml(xml.DrawParams);
                    this.drawParams.push(docBody);
                }
            }
            //文档所用字型的描述
            if (xml.Fonts != null) {
                if (xml.Fonts.Font != null && Array.isArray(xml.Fonts.Font)) {
                    for (var n = 0; n < xml.Fonts.Font.length; n++) {
                        var texml = xml.Fonts.Font[n];
                        let docBody = new Font();
                        docBody.ParseFromXml(texml);
                        this.fonts.push(docBody);
                    }
                }
                else if (xml.Fonts != null) {
                    let docBody = new Font();
                    docBody.ParseFromXml(xml.Fonts.Font);
                    this.fonts.push(docBody);
                }
            }

            //多媒体对象描述
            if (xml.MultiMedias != null) {
                if (xml.MultiMedias.MultiMedia != null && Array.isArray(xml.MultiMedias.MultiMedia)) {
                    for (var n = 0; n < xml.MultiMedias.MultiMedia.length; n++) {
                        var texml = xml.MultiMedias.MultiMedia[n];
                        let docBody = new MultiMedia(this.docs);
                        docBody.ParseFromXml(texml);
                        this.multiMedias.push(docBody);
                    }
                }
                else if (xml.MultiMedias != null) {
                    let docBody = new MultiMedia(this.docs);
                    docBody.ParseFromXml(xml.MultiMedias.MultiMedia);
                    this.multiMedias.push(docBody);
                }
            }

        }


    }

}

