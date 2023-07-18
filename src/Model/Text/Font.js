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



export default class Font {
    constructor() {
        //字形名
        this.fontname = '';
        //字形族名，用于匹配代替字形
        this.familyName = '';
        //字形使用的字符分类，用于匹配替代字形
        //可取值symbol,big5,unicode
        this.charset = 'unicode';
        /* 斜体字形*/
        this.italic = false;
        /*
        是否是粗体字形
        */
        this.bold = false;
        //是否是衬线字型
        this.serif = false;
        //等宽字形
        this.fixedWidth = false;
        //指向内嵌字型文件，嵌入字型文件应使用OpenType格式
        this.fontFile = '';
    }


    ParseFromXml(xml) {
        if (xml._ID != null)
            this.id = xml._ID.toString();
        if (xml._FontName != null)
            this.fontname = xml._FontName.toString();
        if (xml._FamilyName != null)
            this.familyName = xml._FamilyName.toString();
        if (xml._Charset != null)
            this.charset = xml._Charset.toString();
        if (xml._Italic != null)
            this.italic = true;
        if (xml._Bold != null)
            this.bold = true;
        if (xml._Serif != null)
            this.serif = true;
        if (xml._FixedWidth != null)
            this.fixedWidth = true;
        if (xml._FontFile != null)
            this.fontFile = xml._FontFile.toString();

    }

}
