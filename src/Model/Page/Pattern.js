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


  
export default class Pattern {
    constructor() {

        //底纹单元的宽度
        this.width = 0.0;

        //底纹单元的高度
        this.height = 0.0;


        //X方向底纹单元间距，默认值为底纹单元的宽度，若设定值小于底纹单元的宽度时，应按默认值处理
        this.xStep =this.width;

        //Y方向底纹单元间距，默认值为底纹单元的高度，若设定值小于底纹单元的高度时，应按默认值处理
        this.yStep =this.height;

        //底纹单元的映像翻转方式
        // Noraml Column  Row  Row and Column
        this.reflectMethod = 'Noraml';


        //底纹单元起始绘制位置，
        // Page:相对于页面坐标系的原点
        // Object:相对于对象坐标系的原点
        this.relativeTo = 'Object';

        //底纹单元的变换矩阵，用于某些需要对底纹单元进行平移旋转变换的场合，默认为单位矩阵
        //底纹呈现时先做XStep、YStep排列，然后一起做CTM处理
        this.cTM = [];

        //底纹单元，用底纹填充目标区域时，所使用的单元对象
       // this.cellContent = new PageBlock();


        //引用资源文件中缩略图图像的标识
        this.thumbnail = '';



    }


    ParseFromXml(xml) {

    }

}