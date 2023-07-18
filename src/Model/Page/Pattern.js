 
  
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