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


 


export default class Border {
    constructor() {

        //边框线宽，如果为0则表示边框不进行绘制，默认0.353MM
        this.lineWidth = 0.353;

        //边框水平角半径
        this.HorizonalCornerRadius = 0.0;


        //边框垂直角半径
        this.VerticalCornerRadius = '';


        /*边框虚线重复样式开始的位置,边框的起始点位置为左上角，绕行方向为顺时针
        默认值为0*/
        this.dashOffset = 0;

        /*
        边框虚线重复样式,边框的起始点位置为左上角,绕行方向为顺时针
        */
        this.dashPattern = [];



        // 边框颜色，默认黑色
        this.borderColor = new Color();



    }


    ParseFromXml(xml) {

    }

}
