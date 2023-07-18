

import Color from "../Page/Color.js"


export default class DrawParams {
    constructor() {

        this.id = '';
        //基础绘制参数，引用资源文件中的绘制参数的标识
        //指明当前绘制参数的基础绘制参数
        this.relative = "";

        //线宽，非负浮点数，制定了路径绘制时线的宽度。
        //由于某些设备不能输出一个像素宽度的线，因此强制规定当线宽大于0时，无论多小都最少
        //要绘制两个像素的宽度
        //当线宽为0时，绘制一个像素宽度.
        //由于线宽0的定义与设备无关，所以不推荐使用线宽0.
        //默认值0.353MM
        this.lineWidth = 0.353;

        //线端点样式，Butt Round Square
        this.cap = 'Butt';

        //线条虚线样式的位置，默认0，当DashPattern不出现时，该参数无效
        this.dashOffset = 0;

        //线条虚线的重复样式，数组中共含两个值，第一个值代表虚线线段的长度，第二个值代表虚线的间隔长度，默认空
        this.dashPattern = [];

        //线条链接样式，Miter,Round,Bevel
        this.join = 'Miter';

        //join为Miter时小角度结合点长度的阶段值，默认值位3.528
        this.miterLimit = 3.528;

        //填充颜色，默认透明色
        this.fillColor = new Color();

        //勾边颜色，默认黑色
        this.strokeColor = new Color();


    }
    SetCtx(ctx) {
        ctx.miterLimit = this.MM2PX(this.miterLimit); 
        ctx.lineWidth = this.MM2PX(this.lineWidth);
        ctx.strokeStyle=this.strokeColor.GetCtxDrawColor();
        ctx.fillStyle=this.fillColor.GetCtxDrawColor();
        ctx.lineCap=this.cap.toLowerCase();

    }

    ParseFromXml(xml) {

        if (xml._ID != null)
            this.id = xml._ID.toString();

        if (xml._Relative != null)
            this.relative = xml._Relative.toString();

        if (xml._LineWidth != null)
            this.lineWidth = parseFloat(xml._LineWidth.toString());

        if (xml._Cap != null)
            this.cap = xml._Cap.toString();


        if (xml._DashOffset != null)
            this.dashOffset = parseFloat(xml._DashOffset.toString());

        //线条虚线的重复样式，数组中共含两个值，第一个值代表虚线线段的长度，第二个值代表虚线的间隔长度，默认空   
        if (xml.DashPattern != null) {
            let aArray = xml.DashPattern.split(' ');
            for (var n = 0; n < aArray.length; n++) {
                this.dashPattern.push(parseInt(aArray[n]));
            }
        }
        //线条链接样式，Miter,Round,Bevel
        if (xml._Join != null)
            this.join = xml._Join.toString();

        //join为Miter时小角度结合点长度的阶段值，默认值位3.528
        if (xml._MiterLimit != null)
            this.miterLimit = parseFloat(xml._MiterLimit.toString());

        //填充颜色，默认透明色
        if (xml.FillColor != null)
            this.fillColor.ParseFromXml(xml.FillColor);

        //勾边颜色，默认黑色
        if (xml.StrokeColor != null)
            this.strokeColor.ParseFromXml(xml.StrokeColor);

    }

    /**
 * 所以1英寸=25.4毫米
 * @param {12.7 毫米 = 0.127 厘米 = 0.5 英寸 
           12.7 毫米 = 0.5 英寸×96 像素/英寸 = 48 像素} x 
 */
    MM2PX(x) {
        return parseFloat(parseFloat(x) / 25.4 * 96);
    }

}