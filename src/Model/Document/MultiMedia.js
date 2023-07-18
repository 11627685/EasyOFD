




export default class MultiMedia {
    constructor(docs) {
        this.docs = docs;
        this.id = "";
        //多媒体类型，支持位图图像，视频，音频三种多媒体
        this.type = "";
        //资源的格式，支持BMP、JPEG、PNG、TIFF及AVS等格式，其中TIFF格式不支持多页
        this.format = '';
        //指向OFD包内的多媒体文件的位置
        this.mediaFile = '';

        this.image = null;

    }


    ParseFromXml(xml) {
        this.id = xml._ID.toString();

        if (xml._Type != null)
            this.type = xml._Type.toString();

        if (xml._Format != null)
            this.format = xml._Format;
        if (xml.MediaFile != null) {
            this.mediaFile = xml.MediaFile.toString();
            if (this.mediaFile.indexOf('Res/') == 0) {
                this.image = this.docs.get(this.mediaFile);
            } else {
                this.image = this.docs.get('Res/' + this.mediaFile);
            }
        }

    }

}