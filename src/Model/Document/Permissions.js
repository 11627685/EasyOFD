
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



export default class Permissions {
    constructor() {

        //是否允许编辑
        this.edit = true;
        //是否允许添加或修改标注
        this.annot = true;
        //是否允许导出
        this.export = true;
        //是否允许进行数字签名
        this.signature = true;
        //是否允许添加水印
        this.watermark = true;
        //是否允许截屏
        this.printScreen = true;
        //打印权限，，默认可以打印
        this.print = new Print();
        //是否允许打印
        this.printable =true;

        //打印份数，在printable为true时有效，当值为0时不允许打印。-1不限制
        this.copies=-1;

        //有限期，次文档运行范围的期限
        this.validPeriod = new ValidPeriod();


    }

    ParseFromXml(xml) {

    }
}