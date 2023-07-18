
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