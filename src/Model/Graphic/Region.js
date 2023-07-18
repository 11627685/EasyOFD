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



import Area from "./Area.js"



export default class Region {
    constructor() {
        this.areas = [];//Area

    }


    ParseFromXml(xml) {

        if (xml.Area != null && Array.isArray(xml.Area)) {
            for (var n = 0; n < xml.Area.length; n++) {
                var docBodyxml = xml.Area[n];
                let docBody = new Area();
                docBody.ParseFromXml(docBodyxml);
                this.areas.push(docBody);
            }
        } else if (xml.Area != null) {
            let docBody = new Area();
            docBody.ParseFromXml(xml.Area);
            this.areas.push(docBody);
        }

    }

}
