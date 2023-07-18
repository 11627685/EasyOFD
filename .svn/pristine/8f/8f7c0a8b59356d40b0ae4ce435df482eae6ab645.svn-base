


export default class CGTransform {
    constructor() {
        /*TextCode 中字符编码的起始位置，从 0 开始*/
        this.CodePosition = 0;
        /*变换关系中字符的数量，该数值应大于或等于 1，否则属于错误描述，默认为 1*/
        this.CodeCount = 1;
        /*
         变换关系中字型索引的个数，该数值应大于或等于 1，否则属于错误描述，默认为 1*/

        this.GlyphCount = 1;
        /*  变换关系中字型索引列表*/
        this.Glyphs = [];
    }


    ParseFromXml(xml) {


        if (xml._CodePosition != null)
            this.CodePosition = parseInt(xml._CodePosition.toString());

        if (xml._CodeCount != null)
            this.CodeCount = parseInt(xml._CodeCount.toString());

        if (xml._GlyphCount != null)
            this.GlyphCount = parseInt(xml._GlyphCount.toString());


        if (xml.Glyphs != null) {
            let aArray = xml.Glyphs.toString().split(' ');
            for (var n = 0; n < aArray.length; n++) {
                this.Glyphs.push(parseFloat(aArray[n]));
            }
        }



    }
}
