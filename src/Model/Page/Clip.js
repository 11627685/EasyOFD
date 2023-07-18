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






export default class Clip {
    constructor() {
        //剪裁区域，用一个图形对象或文字对象来描述剪裁剪区的一个组成部分，最终裁剪区是这些区域的并集
        this.area = [];
    }


    ParXML() {

    }

}


class Area {
    constructor() {

        
        //引用资源文件中的绘制参数的标识，线宽、结合点和端点样式
        this.drawParaM   = '';
        
        //针对对象坐标系，对Area下包含的path和text进行进一步的变换
        this.cTM=[];

        //用于裁剪的图形
        this.path=new Path();
        //用于裁剪的文本
        this.text=new Text();
  

    }


    ParseFromXml(xml) {

    }

}