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



 
import PageBlock from "./PageBlock.js"

export default class Layer extends PageBlock {
    constructor(commonData) {
        
        super(commonData);
       
        //层类型描述 ，默认为 Body
        //Body 正文层
        //Foreground 前景层 
        //Background 背景层
        // 正文层、前景层、背景层形成了多层内容，这些层按照出现的先后顺序依次进行渲染，
        // 每一层的默认颜色采用全透明。层的渲染顺序如图所示。
        // this.type = 'Body'; 在Attributes类里面
    }

    Draw(ctx) {

        super.Draw(ctx) ;
    }

    ParseFromXml(xml) {

        super.ParseFromXml(xml);
    }
}