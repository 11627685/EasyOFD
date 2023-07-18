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






export default class Arc {
    constructor() {

        //圆弧的结束点，下个路径的起始点，不能与当前的绘制起始点为同一个位置
        this.endPoint = { x: 0, y: 0 };

        /**
         *  形如[200 100]的数组，2个正浮点数值依次对应椭圆的长、短轴度，较大的一个为长轴
        [异常处理] 如果数组长度超过2,则只取前两个数值
        [异常处理] 如果数组长度为1,则认为这是一个圆,该数值为圆半径
        [异常处理] 如果数组前两个数值中有一个为0，或者数组为空，则园弧退化为一条
        从当前点到EndPoint的线段
        [异常处理] 如果数组数值为负值，则取其绝对值*/
        this.ellipseSize = [];

        /**
         * 表示按EllipscSizc绘制的椭圆在当前坐标系下旋转的角度，正值为顺时针，
         * 负值为逆时针
         * [异常处理] 如果角度大于360°则以360取模
         * 
         * */
        this.rotationAngle = 0.0;

        /**
        *是否是大圆弧
           true表示此线型对应的为度数大于180°的弧，
           false 表示对应度数小于180°的弧
        对于一个给定长、短轴的椭圆以及起始点和结束点，有一大一小两
       条圆弧，如果所描述线型恰好为180°的弧，则此属性的值不被参考，
       可由SweepDircction属性确定圆弧的形状
       **/

        this.largeAre = false;

        /**
         *  弧线方向是否为顺时针
          true 表示由圆弧起始点到结束点是顺时针旋转，
          false 表示由圆弧起始点到结束点是逆时针旋转
            对于经过坐标系上指定两点，给定旋转角度和长短轴长度的椭圆，
            满足条件的可能有2个,对应圆弧有4条,通过LargeArc属性可以
             排除2条,由此属性从余下的2条圆弧中确定一条
        **/

        this.sweepdirection = false;



    }


    ParseFromXml(xml) {

    }
}
