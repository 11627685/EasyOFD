

export default class GraphicUnit {

    constructor() {
        //外接矩形，采用当前空间坐标系，当图元绘制超出此矩形时进行裁剪
        this.boundary = { x: 0, y: 0, h: 0, w: 0 };
        //图元对象的名字
        this.name = '';
        //图元是否可
        this.visible = true;
        //底纹单元的变换矩阵，用于某些需要对底纹单元进行平移旋转变换的场合，默认为单位矩阵
        //底纹呈现时先做XStep、YStep排列，然后一起做CTM处理 
        //一个变化矩阵 
        this.cTM = null;// { a: 0, b: 0, c: 0, e: 0, f: 0, g: 0 };
        //引用资源文件中的绘制参数标识
        this.drawPrarm = "";
        //绘制路径时使用的线宽
        //如果图元对象有drawPrarm属性，则用此值覆盖drawPrarm中对应的值
        this.lineWidth = 0.353;
        //见8.2绘制参数
        //如果图元对象有drawPrarm属性，则用此值覆盖drawPrarm中对应的值
        this.cap = 'Butt';
        //见8.2绘制参数
        //如果图元对象有drawPrarm属性，则用此值覆盖drawPrarm中对应的值
        this.join = 'Miter';
        //join为Miter时，MiterSize的截断值
        //如果图元对象有drawPrarm属性，则用此值覆盖drawPrarm中对应的值
        this.miterLimit = 3.528;
        //见8.2绘制参数
        //如果图元对象有drawPrarm属性，则用此值覆盖drawPrarm中对应的值
        this.dashOffset = 0.0;
        //见8.2绘制参数
        //如果图元对象有drawPrarm属性，则用此值覆盖drawPrarm中对应的值
        this.dashPattern = [];
        //图元对象的动作序列
        //当存在多个Action对象时，所有动作依次执行
        this.actions = [];
        //图元对象的裁剪区域序列，采用对象空间坐标系
        //当存在多个clip对象时，最终裁剪区为所有clip区域的交集
        this.clips = [];

    }


    ParseFromXml(xml) {
        if (xml._Boundary != null)
            this.boundary = this.Parse(xml._Boundary);

        if (xml._Name != null)
            this.name = xml._Name.toString();

        if (xml._Visible != null)
            this.visible = true;

        if (xml._CTM != null)
            this.cTM = this.ParseCTM(xml._CTM);

        if (xml._DrawPrarm != null)
            this.drawPrarm = xml._DrawPrarm.toString();

        if (xml._LineWidth != null)
            this.lineWidth = parseFloat(xml._LineWidth.toString());

        if (xml._Cap != null)
            this.cap = xml._Cap.toString();

        if (xml._Join != null)
            this.join = xml._Join.toString();

        if (xml._MiterLimit != null)
            this.miterLimit = parseFloat(xml._MiterLimit.toString());
        if (xml._ID != null)
            this.id = xml._ID.toString();

        if (xml._DashOffset != null)
            this.dashOffset = parseFloat(xml._DashOffset.toString());

    }

    Parse(xml) {
        try {
            let aArray = xml.split(' ');
            return { x: parseFloat(aArray[0]), y: parseFloat(aArray[1]), w: parseFloat(aArray[2]), h: parseFloat(aArray[3]) };

        } catch (e) {

            return { x: 0, y: 0, w: 0, h: 0 };
        }
    }

    ParseCTM(xml) {
        try {
            let aArray = xml.split(' ');
            return {
                a: parseFloat(aArray[0]),
                b: parseFloat(aArray[1]),
                c: parseFloat(aArray[2]),
                d: parseFloat(aArray[3]),
                e: parseFloat(aArray[4]),
                f: parseFloat(aArray[5])
            };
        } catch (e) {

            return null;
        }
    }

    /**
     * 所以1英寸=25.4毫米
     * @param {12.7 毫米 = 0.127 厘米 = 0.5 英寸 
               12.7 毫米 = 0.5 英寸×96 像素/英寸 = 48 像素} x 
     */
    MM2PX(x) {
        return parseFloat(parseFloat(x) / 25.4 * 96);
    }

    MM2PXCTM(x) {
        if (this.cTM != null) {
            //a b c d e f 
            if (this.cTM != null && this.cTM.a != 0 && this.cTM.b != 0 && this.cTM.c != 0 && this.cTM.d != 0) //旋转不计算
                return parseFloat(parseFloat(x) / 25.4 * 96);

            else if (this.cTM.b == 0 && this.cTM.c == 0)//缩放矩阵
                return parseFloat(((parseFloat(x) * this.cTM.a)) / 25.4 * 96);
        }
        else
            return this.MM2PX(x);
    }

    MM2PXX(x) {
        return parseFloat((parseFloat(x) + this.boundary.x) / 25.4 * 96);
    }
    MM2PXY(y) {
        return parseFloat((parseFloat(y) + this.boundary.y) / 25.4 * 96);
    }


    MM2PXXCTM(x, y) {
        if (this.cTM != null) {
            if (this.cTM != null && this.cTM.a != 0 && this.cTM.b != 0 && this.cTM.c != 0 && this.cTM.d != 0) //旋转不计算
                return this.MM2PXX(x);
            else
                return parseFloat(((this.GetCTMX(x, y)) + this.boundary.x) / 25.4 * 96);
        }
        else
            return this.MM2PXX(x);
    }


    MM2PXYCTM(x, y) {

        if (this.cTM != null) {
            return parseFloat(((this.GetCTMY(x, y)) + this.boundary.y) / 25.4 * 96);
        }
        else
            return this.MM2PXY(y);


    }



    GetCTMY(x, y) {
        let ret = this.GetCTMXY(x, y);
        if (ret != null)
            return ret.y;
        else
            return 0;
    }


    GetCTMX(x, y) {
        let ret = this.GetCTMXY(x, y);
        if (ret != null)
            return ret.x;
        else
            return 0;
    }



    // | a  b  0 |
    // | c  d  0 |
    // | e  f  0 |
    // | x' |                  | a*x + b*y + 0 |
    // | y' |  =  | x y 1|  *  | c*x + d*y + 0 |
    // | 1  |                  | e*x + f*y + 0 |

    GetCTMXY(x, y) {
        if (this.cTM != null) {
            let rePoint = { x: x, y: y };
            rePoint.x = this.cTM.a * x + this.cTM.b * y + this.cTM.e;
            rePoint.y = this.cTM.c * x + this.cTM.d * y + this.cTM.f;
            return rePoint;
        } else
            null
    }

}