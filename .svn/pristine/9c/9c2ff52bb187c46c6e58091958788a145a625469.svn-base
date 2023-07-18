
import Border from "./Border.js"
import GraphicUnit from "../Page/GraphicUnit.js"

export default class Image extends GraphicUnit {

    constructor(commonData) {

        super();
        this.commonData = commonData;

        //引用资源文件中定义的多媒体的标识
        this.resourceID = '';

        //可替换图像，引用资源文件中定义的多媒体的标识，用于某些情况如高分辨率输出时进行
        //图像替换
        this.substitution = '';


        //图像蒙版,引用资源文件中定义的多媒体的标识，用作蒙版的图像
        //应是与RcsoucclD指向的图像相同大小的二值图
        this.imageMask = '';



        //图像边框设置
        this.borer = new Border();


    }

    Draw(ctx) {

        let x = this.MM2PXX(0);
        let y = this.MM2PXY(0);
        let width = this.MM2PX(this.boundary.w);
        let height = this.MM2PX(this.boundary.h);
        let image1 = this.commonData.GetMultiMediasByID(this.resourceID);
        if (image1 != null&&image1.image != null)
            ctx.drawImage(image1.image, x, y, width, height);
        else
            console.log('image is null');

    }



    ParseFromXml(xml) {

        super.ParseFromXml(xml);
        if (xml._Substitution != null)
            this.substitution = xml._Substitution.toString();

        if (xml._Size != null)
            this.size = parseFloat(xml._Size.toString());

        if (xml._ResourceID != null)
            this.resourceID = parseFloat(xml._ResourceID.toString());

        if (xml._ImageMask != null)
            this.imageMask = parseFloat(xml._ImageMask.toString());

        if (xml.Border != null)
            this.borer.ParseFromXml(xml.Border);

    }

}
