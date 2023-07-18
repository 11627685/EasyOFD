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




export default class OutlineElem {
    constructor() {
        //大纲节点标题
        this.title = "";
        //该节点下所有叶节点的数目参考值，应根据该节点下实际出现的子节点数为准
        this.count = 0;
        //在有子节点存在时有效，如果位true，标识该大纲在初始状态下展开子节点，false不展开
        this.expanded = true;

        //当此大纲节点被激活时将执行的动作序列
        this.actions = [];

        //该节点的子大纲节点
        this.outlineElem = [];
    }

    ParseFromXml(xml) {

    }

}

