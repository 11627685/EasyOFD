
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



export default class StampAnnot {
    constructor() {


        /* 
         指向包内的文件，使用绝对路径
    
        */
        this.pageRef = '';

        this.id = ''

        this.boundary = null;

    }


    ParseFromXml(xml) {

        if (xml._PageRef != null)
            this.pageRef = xml._PageRef.toString();

        if (xml._ID != null)
            this.id = xml._ID.toString();

        if (xml._Boundary != null)
            this.boundary = this.Parse(xml._Boundary);


    }

    Parse(xml) {
        try {
            let aArray = xml.split(' ');
            return { x: parseFloat(aArray[0]), y: parseFloat(aArray[1]), w: parseFloat(aArray[2]), h: parseFloat(aArray[3]) };

        } catch (e) {

            return { x: 0, y: 0, w: 0, h: 0 };
        }
    }
}


