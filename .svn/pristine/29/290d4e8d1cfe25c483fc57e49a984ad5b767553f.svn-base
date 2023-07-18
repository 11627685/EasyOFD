import Color from "../Page/Color.js"
import GraphicUnit from "../Page/GraphicUnit.js"
import TextCode from "./TextCode.js"
import CGTransform from "./CGTransform.js"


export default class Text extends GraphicUnit {
    constructor(commonData) {

        super();
        this.commonData = commonData;
        //引用资源文件中定义的字形标识
        this.font = '';
        //字号，单位为毫米
        this.size = 0.0;
        //是否勾边
        this.strocke = false;
        /* 是否填充*/
        this.fill = false;
        /*
        字型在水平方向的缩放比
        0.5表示实际显示的自宽为原来字宽的一半
        */
        this.hScale = 1.0;

        //阅读方向，指定了文字排列的方向 见11.3 page66
        this.readDirection = 0;

        //字符方向，指定了文字放置的方式 page66
        this.charDircection = false;

        //文字对象的粗细值，
        //100,200,300,400,500,600,700,800,900
        this.weight = 400;

        /* 斜体字形*/
        this.italic = false;

        this.fillColor = null;

        this.strockeColor = null;

        this.cgTransFrom = [];//new CGTransFrom();

        this.textCode = [];

    }

    Draw(ctx) {

        ctx.save();
        
        ctx.font = this.GetFont();
        if (this.fillColor != null)
            ctx.fillStyle = this.fillColor.GetCtxDrawColor();
        for (var n = 0; n < this.textCode.length; n++) {
            var textCode = this.textCode[n];
            textCode.Draw(ctx, this);
        }
       
        ctx.restore();
    }
    /** 
     *  font : font-style   font-variant    font-weight     font-size       line-height     font-family
               optional     optional        optional        mandatory       optional        mandatory
     */
    GetFont() {

        let fontStyle = "normal";
        let fontVariant = 'normal';
        let fontWeight = this.weight;
        let fontFamily = '宋体';
        if (this.font != null && this.font != '' && this.commonData.GetPublicRes() != null) {
            let res = this.commonData.GetPublicRes()[0];
            if (res != null) {
                let font = res.GetFontByID(this.font);
                if (font != null) {
                    if (font.familyName != '')
                        fontFamily = font.familyName;
                    if (font.fontname != '')
                        fontFamily = font.fontname;
                    /* 斜体字形*/
                    if (font.italic)
                        fontStyle = 'italic'
                    /*
                    是否是粗体字形
                    */
                    if (font.bold)
                        fontWeight = 'bold';
                    // //是否是衬线字型
                    // this.serif = false;
                    // //等宽字形
                    // this.fixedWidth = false;
                }
            }
        }
        if (this.italic)
            fontStyle = 'italic';
        else
            fontStyle = '';
        console.log(fontStyle + ' ' + fontVariant + ' ' + fontWeight + ' ' + parseInt(this.MM2PXCTM(this.size)) + 'px ' + fontFamily);
        return fontStyle + ' ' + fontVariant + ' ' + fontWeight + ' ' + parseInt(this.MM2PXCTM(this.size)) + 'px ' + fontFamily;
    }



    ParseFromXml(xml) {

        super.ParseFromXml(xml);
        if (xml._Font != null)
            this.font = xml._Font.toString();

        if (xml._Size != null)
            this.size = parseFloat(xml._Size.toString());


        if (xml._Strocke != null)
            this.strocke = true;

        if (xml._Fill != null)
            this.fill = true;


        if (xml._HScale != null)
            this.hScale = parseFloat(xml._HScale.toString());


        if (xml._ReadDirection != null)
            this.readDirection = parseInt(xml._ReadDirection.toString());

        if (xml._CharDircection != null)
            this.charDircection = parseInt(xml._CharDircection.toString());

        if (xml._Weight != null)
            this.weight = parseInt(xml._Weight.toString());

        if (xml._Italic != null)
            this.italic = true;


        if (xml.FillColor != null) {
            this.fillColor = new Color();
            this.fillColor.ParseFromXml(xml.FillColor);
        }



        //textCode
        if (xml.TextCode != null && Array.isArray(xml.TextCode)) {
            for (var n = 0; n < xml.TextCode.length; n++) {
                var docBodyxml = xml.TextCode[n];
                let docBody = new TextCode();
                docBody.ParseFromXml(docBodyxml);
                this.textCode.push(docBody);
            }
        } else if (xml.TextCode != null) {
            let docBody = new TextCode();
            docBody.ParseFromXml(xml.TextCode);
            this.textCode.push(docBody);
        }

        //cgTransFrom
        if (xml.CGTransform != null && Array.isArray(xml.CGTransform)) {
            for (var n = 0; n < xml.CGTransform.length; n++) {
                var docBodyxml = xml.CGTransform[n];
                let docBody = new CGTransform();
                docBody.ParseFromXml(docBodyxml);
                this.cgTransFrom.push(docBody);
            }
        } else if (xml.CGTransform != null) {
            let docBody = new CGTransform();
            docBody.ParseFromXml(xml.CGTransform);
            this.cgTransFrom.push(docBody);
        }


    }

}
