
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