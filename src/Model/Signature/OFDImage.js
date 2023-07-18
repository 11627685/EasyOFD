import Res from "../Document/Res.js";
import Page from "../Document/Page.js";
import CommonData from "../Document/CommonData.js";



export default class OFDImage {

    constructor(singedInfo) {

        this.singedInfo = singedInfo;



    }


    Draw(ctx, pageNow) {
       
        try {

            let oneImagep = this.readImage();
            let commonData = new CommonData(null);

            oneImagep.then((thisObje) => {
                ctx.save();
                commonData.pubres.push(thisObje.res)
                let intiPost = thisObje.singedInfo.stampAnnot[0].boundary;


                let pageBlock = thisObje.page.content[0].layers[0];

                for (var n = 0; n < pageBlock.pathObject.length; n++) {
                    var pathObject = pageBlock.pathObject[n];
                    pathObject.boundary.x = pathObject.boundary.x + intiPost.x;
                    pathObject.boundary.y = pathObject.boundary.y + intiPost.y;

                    pathObject.Draw(ctx);
                }

                for (var n = 0; n < pageBlock.textObject.length; n++) {
                    var textObject = pageBlock.textObject[n];
                    textObject.boundary.x = textObject.boundary.x + intiPost.x;
                    textObject.boundary.y = textObject.boundary.y + intiPost.y;
                    textObject.commonData=commonData;
                    textObject.Draw(ctx);
                }
                ctx.restore();

            });

        } catch (e) {
            throw new Error('ofd 绘制签章内容出错');
        }


       


    }

    readImage() {
        let thisObje = this;
        return new Promise((resolve, reject) => {

            let imaValue = this.singedInfo.signature.signature.signature.toSign.eseal.eSealInof.picture.data.value;
            // 将Uint8Array转换为Blob对象
            const blob = new Blob([imaValue]);

            let zip = new JSZip();//压缩的插件
            let x2js = new X2JS({ //xml数据处理插件
                stripWhitespaces: false,
                skipEmptyTextNodesForObj: false
            });

            let oneImagep = zip.loadAsync(blob);
            oneImagep.then((zip) => {
                var fileNames = Object.keys(zip.files);
                let allPromise = [];

                fileNames.forEach(function (fileName) {

                    let onePromise = null;
                    if (fileName.includes('Res')) {
                        onePromise = zip.file(fileName).async("string");
                        allPromise.push(onePromise);
                    }

                    else if (fileName.includes('Page')) {
                        onePromise = zip.file(fileName).async("string");
                        allPromise.push(onePromise);
                    }

                    if (onePromise != null)
                        onePromise.then((data) => {
                            if (fileName.includes('Res')) {
                                let res = x2js.xml2js(data);
                                thisObje.res = new Res();
                                thisObje.res.ParseFromXmlOFD(res.Res);
                            } else if (fileName.includes('Page')) {
                                let page = x2js.xml2js(data);
                                thisObje.page = new Page();
                                thisObje.page.ParseFromXml(page.Page);
                            }
                        });



                });

                Promise.all(allPromise).then(() => {
                    resolve(thisObje);
                });

            });

        });

    }

}








