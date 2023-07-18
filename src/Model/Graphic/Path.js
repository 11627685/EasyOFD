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



import Color from "../Page/Color.js"
import GraphicUnit from "../Page/GraphicUnit.js"



export default class Path extends GraphicUnit {
    constructor() {
        super();
        //图形是否被勾选
        this.stocke = true;


        //图形是否被填充
        this.fill = false;

        //图形的填充规则，当fill属性存在出现，可选值为NonZero和Even-Odd page53 
        this.rule = 'NonZero';

        //填充颜色，默认为透明
        this.fillColor = new Color();

        //勾边颜色，默认黑色
        this.strokeColor = new Color();
        this.strokeColor.value = [0, 0, 0];

        //图形轮廓数据，由一系列紧缩的操作符和操作数构成
        this.abbreviatedData = "";


    }

    Draw(ctx) {
        // if (this.id == '55') {
        //     console.log('aaa');
        // }
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        let drawArray = this.abbreviatedData.split(' ');
        let moveIndex = 0;
        if (this.stocke) {
            ctx.strokeStyle = this.strokeColor.GetCtxDrawColor();
        }
        if (this.fill) {
            ctx.fillStyle = this.fillColor.GetCtxDrawColor();
        }

        ctx.lineWidth = parseInt(this.MM2PXCTM(this.lineWidth));
        ctx.beginPath();

        let mdx = 0;
        let mdy = 0;
        let ldx = 0;
        let ldy = 0;

        for (; ;) {
            if (moveIndex >= drawArray.length) break;
            let action = drawArray[moveIndex++];


            if (action == "M") {
                let x = drawArray[moveIndex++];
                let y = drawArray[moveIndex++];
                mdx = this.MM2PXXCTM(x, y);
                mdy = this.MM2PXYCTM(x, y);

                ctx.moveTo(mdx, mdy);

            } else if (action == "L") {
                let x = drawArray[moveIndex++];
                let y = drawArray[moveIndex++];
                ldx = this.MM2PXXCTM(x, y);
                ldy = this.MM2PXYCTM(x, y);
                ctx.lineTo(ldx, ldy);
                //ctx.stroke();


            } else if (action == "C") {
                ctx.closePath();
            } else if (action == "B") {

                // x1 y1 x2 y2 x3 y3
                //从当前点连接一条到点(x3, y3)的三次贝塞尔曲线，并将当前点
                // 移动到点(x3, y3)，此贝塞尔曲线使用点(x1, y1)和点(x2, y2)为其控制点
                let x1 = drawArray[moveIndex++];
                let y1 = drawArray[moveIndex++];

                let lx1 = this.MM2PXXCTM(x1,y1);
                let ly1 = this.MM2PXYCTM(x1,y1);

                let x2 =drawArray[moveIndex++];
                let y2 = drawArray[moveIndex++];

                let lx2 = this.MM2PXXCTM(x2,y2);
                let ly2 = this.MM2PXYCTM(x2,y2);

                let x3 =drawArray[moveIndex++];
                let y3 = drawArray[moveIndex++];

                let lx3= this.MM2PXXCTM(x3,y3);
                let ly3 = this.MM2PXYCTM(x3,y3);


                ctx.bezierCurveTo(lx1, ly1, lx2, ly2, lx3, ly3);
                //ctx.moveTo(x3, y3); // 设置起始点坐标
                // ctx.stroke();
            }
            else if (action == "") {
                moveIndex++;
            } else {
                console.log('还没有写的部分')
            }
        }


        //通过线条来绘制图形轮廓
        if (this.stocke) {
            ctx.stroke();
        }

        //通过填充路径的内容区域生成实心的图形。

        if (this.fill) {
            ctx.fill();
        }


        ctx.restore();
    }


    ParseFromXml(xml) {
        super.ParseFromXml(xml);

        // if (this.id == '55') {
        //     console.log('aaa');
        // }

        if (xml._Stroke != null && xml._Stroke == 'true')
            this.stocke = true;
        else if (xml._Stroke == 'false')
            this.stocke = false;

        if (xml._Fill != null)
            this.fill = true;


        if (xml._Rule != null)
            this.rule = xml._Rule.toString();

        if (xml.FillColor != null) {
            this.fillColor.ParseFromXml(xml.FillColor);
            this.fill = true;
        }else
        this.fill = false;


        if (xml.StrokeColor != null) {
            this.strokeColor.ParseFromXml(xml.StrokeColor);
            this.stocke = true;
        }
         


        if (xml.AbbreviatedData != null)
            this.abbreviatedData = xml.AbbreviatedData.toString();


    }

}

/* Page 53 页
  操作符        操作数              说明
    S           x y                 定义子绘制图形边线的开始坐标 x,y
    M           x y                 将当前点移动到指定点 x,y
    L           x y



*/