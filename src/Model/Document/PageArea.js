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


//单位MM 毫米

export default class PageArea {
    constructor() {
        //页面物理区域，左上角的坐标为页面空间坐标系的原点
        this.physicalBox = null;//{ x: 0, y: 0, w: 0, h: 0 };
        //显示区域，页面内容实际显示或打印输出的区域，位于页面物理区域内，包括页眉，页脚，版心等内容
        this.applicationlBox = null;//{ x: 0, y: 0, w: 0, h: 0 };
        //版心区域，文件的正文区域，位于显示区域内，左上角的坐标决定了其在显示区域的位置
        this.contentBox = null;//{ x: 0, y: 0, w: 0, h: 0 };
        //出血区域，超出设备性能限制的额外出血区域，位于页面物理区域外，
        this.bleedBox = null;//{ x: 0, y: 0, w: 0, h: 0 };
    }

    ParseFromXml(xml) {
        if (xml.PhysicalBox != null) {
            this.physicalBox = { x: 0, y: 0, w: 0, h: 0 };
            this.physicalBox = this.Parse(xml.PhysicalBox.toString());
        }

        if (xml.applicationlBox != null) {
            this.applicationlBox = { x: 0, y: 0, w: 0, h: 0 };
            this.applicationlBox = this.Parse(xml.ApplicationlBox.toString());
        }

        if (xml.ContentBox != null) {
            this.contentBox = { x: 0, y: 0, w: 0, h: 0 };
            this.contentBox = this.Parse(xml.ContentBox.toString());
        }

        if (xml.BleedBox != null) {
            this.bleedBox = { x: 0, y: 0, w: 0, h: 0 };
            this.bleedBox = this.Parse(xml.BleedBox.toString());
        }


    }
    Parse(xml) {
        try {
            let aArray = xml.split(' ');
            return { x: parseFloat(aArray[0]), y: parseFloat(aArray[1]), w: parseFloat(aArray[2]), h: parseFloat(aArray[3]) };

        } catch (e) {

            return null;
        }
    }
}