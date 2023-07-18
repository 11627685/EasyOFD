
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


export default class TextCode {
    constructor() {

        /*第一个文字的字型原点在对象坐标系下的X坐标
        当X不出现,则采用上一个TextCodc的X值，文字对象中的第一个
        TextCodc的X属性必选*/
        this.x = 0;

        /*第一个文字的字型原点在对象坐标系下的Y坐标
         当Y不出现,则采用上一个TextCodc的Y值，文字对象中的第一个
         TextCodc的Y属性必选*/
        this.y = 0.0;

        /*
         double型数值队列,队列中的每个值代表后一个文字与前一个文字之
         间在X方向的偏移值
         IDeltaX不出现时,表示文字的绘制点在X方向不做偏移*/

        this.deltaX = [];

        /*  double型数值队列,队列中的每个值代表后一个文字与前一个文字之
        间在Y方向的偏移值
        DeltaY不出现时,表示文字的绘制点在Y方向不做偏移*/
        this.deltaY = [];


        this.textValue = '';

    }

    Draw(ctx, text) {
        let ctm = text.cTM;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        if (ctm != null && ctm.a != 0 && ctm.b != 0 && ctm.c != 0 && ctm.d != 0) {

            let angleInRadians = Math.atan2(ctm.b, ctm.a);

            //旋转的处理
            let x = text.MM2PXX(0);
            let y = text.MM2PXY(0);

            for (var n = 0; n < this.textValue.length; n++) {
                var onechar = this.textValue[n];

                ctx.translate(x, y);
                ctx.rotate(angleInRadians);
                ctx.fillText(onechar, text.MM2PX(this.x), text.MM2PX(this.y));


                if (this.deltaX.length > 0 && this.deltaX.length > n) {
                    x = x + text.MM2PX(this.deltaX[n]);
                    if (this.deltaY.length > 0) {
                        y = y + text.MM2PX(this.deltaY[n]);
                    }

                } else if (this.deltaY.length > 0 && this.deltaY.length > n) {
                    y = y + text.MM2PXCTM(this.deltaY[n]);
                }
            }
        } else {
            let x = text.MM2PXXCTM(this.x, this.y);
            let y = text.MM2PXYCTM(this.x, this.y);

            for (var n = 0; n < this.textValue.length; n++) {
                var onechar = this.textValue[n];
                ctx.fillText(onechar, x, y);
                if (this.deltaX.length > 0 && this.deltaX.length > n) {
                    x = x + text.MM2PXCTM(this.deltaX[n]);
                    if (this.deltaY.length > 0) {
                        y = y + text.MM2PXCTM(this.deltaY[n]);
                    }

                } else if (this.deltaY.length > 0 && this.deltaY.length > n) {
                    y = y + text.MM2PXCTM(this.deltaY[n]);
                }
            }
        }
        ctx.restore();

    }


    ParseFromXml(xml) {


        if (xml._X != null)
            this.x = parseFloat(xml._X.toString());

        if (xml._Y != null)
            this.y = parseFloat(xml._Y.toString());


        if (xml.__text != null)
            this.textValue = xml.__text.toString();



        if (xml._DeltaX != null) {
            let aArray = xml._DeltaX.split(' ');
            for (var n = 0; n < aArray.length; n++) {
                let pos = aArray[n];
                if (pos == 'G' || pos == 'g') {
                    let number = aArray[++n];
                    let value = parseFloat(aArray[++n]);
                    for (var addn = 0; addn < number; addn++) {
                        this.deltaX.push(value);
                    }
                } else {
                    this.deltaX.push(parseFloat(aArray[n]));
                }



            }
        }
        if (xml._DeltaY != null) {
            let aArray = xml._DeltaY.split(' ');
            for (var n = 0; n < aArray.length; n++) {
                let pos = aArray[n];
                if (pos == 'G' || pos == 'g') {
                    let number = aArray[++n];
                    let value = parseFloat(aArray[++n]);
                    for (var addn = 0; addn < number; addn++) {
                        this.deltaY.push(value);
                    }
                } else {
                    this.deltaY.push(parseFloat(aArray[n]));
                }


            }
        }




    }
}
