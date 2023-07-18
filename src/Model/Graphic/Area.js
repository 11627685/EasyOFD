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






export default class Area {
    constructor() {
 
        //图形的开始点坐标
        this.start ={x:0,y:0};

        //从当前点移动到新的当前点
        this.move =[];        //{x:0,y:0};

        //从当前点链接一条到指定点的线段，并将当前点移动到指定点
        this.line =[];  //{x:0,y:0};

        //从当前点连接一条到point2的二次贝塞尔曲线，并将当前点移动到point2，此贝塞尔曲线使用point1作为控制点
        this.quadraticBezier =[];  //{x:0,y:0,x1:0,y1:0};

        //从当前点连接一条到point3的三次贝塞尔曲线，并将当前点移动到point3，使用
        //point2，point3作为控制点
        this.cubicBezier =[]; ////{x:0,y:0,x1:0,y1:0,x2:0,y2:0};
        //从当前点连接一条到EndPoint点的圆弧，并将当前点移动到EndPoint点
        this.arc =[];

        //自动闭合到当前分路径的起始点，并以该点为当前点
        this.close =[];

       
    }


    ParseFromXml(xml) {


        

    }

}
