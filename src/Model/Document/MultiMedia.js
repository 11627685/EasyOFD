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