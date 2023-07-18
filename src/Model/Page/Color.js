
import Pattern from "./Pattern.js"



export default class Color {
    constructor() {

        //颜色值，指定了当前颜色空间下各通道的取值，value的取值应符合"通道1 通道2 通道3 ..."格式。
        //此属性不出现时，应采用Index属性从颜色空间的调色板中的取值。当二者都不出现，该颜色各通道的值位0
        this.value = [];

        //调色板中颜色的编号，非负整数，将从当前颜色空间的调色板中取出相应的索引的预定义颜色
        this.index = 0;

        //引用资源文件中颜色空间的标识，默认值为文档设定的颜色
        //Gray  只包含一个通道来表明灰度值 例如："#FF"
        //RGB  包含三个通道，依次是红、绿、蓝。例如："#11 #22 #33"
        //CMYK 包含四个通道，依次是 Cyan(青)、Yellow(黄色)、Magenta(品红)、Black(黑色)。 例如："#11 #22 #33 #44"
        this.colorSpace = 'RGB';

        //颜色透明度，在0-255之间取值，默认255，表示完全不透明
        this.alpha = 255;

        //底纹填充
        this.pattern = new Pattern();

        // //轴向渐变，复杂颜色的一种
        // this.axialShd = new AxialShd();

        // //径向渐变，复杂颜色的一种
        // this.radiald = new Radiald();


        // //高洛德渐变，复杂颜色的一种
        // this.gouraudShd = new GouraudShd();

        // //格构高洛德渐变，复杂颜色的一种
        // this.laGouraudShd = new LaGouraudShd();

    }
    /**
     * 
     * @returns ctx.fillStyle = color;
                ctx.fillStyle = gradient;
             ctx.fillStyle = pattern;
     */
    GetCtxDrawColor() {
        // 这些 fillStyle 的值均为 '橙色'
        // ctx.fillStyle = "orange";
        // ctx.fillStyle = "#FFA500";
        // ctx.fillStyle = "rgb(255,165,0,1)"; 
        //有效的值范围是 0.0（完全透明）到 1.0（完全不透明），默认是 1.0。
        if (this.colorSpace == 'RGB') {
            return "rgba("+this.value[0]+","+ this.value[1]+","+this.value[2]+","+ this.alpha/255 +")";
        }else if( this.colorSpace == '5'||this.colorSpace == '4' )//old version
        {

            return "rgba("+this.value[0]+","+ this.value[1]+","+this.value[2]+","+ this.alpha/255 +")";
        }else if(this.colorSpace == 'Gray')
        {
            return  this.value;
        }else
        {
            return "rgba(255, 255, 255, 0.0)";
        }

    }


    ParseFromXml(xml) {

        this.value = [];
        
        if (xml._Index != null)
            this.index = parseInt(xml._Index);

        if (xml._ColorSpace != null)
            this.colorSpace = xml._ColorSpace;


        if (xml.Pattern != null)
            this.pattern.ParseFromXml(xml.Pattern);

        if (xml._Value != null) {
            let aArray = xml._Value.split(' ');
            for (var n = 0; n < aArray.length; n++) {
                this.value.push(parseInt(aArray[n]));
            }
        }



    }

}