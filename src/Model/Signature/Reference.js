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






export default class Reference {
  constructor() {


    /* 
     指向包内的文件，使用绝对路径

    */
    this.fileRef = '';


    /*
      对包内文件进行摘要计算,对所得的二进制摘要值进行basc64编码所得结果
    */
    this.checkValue = '';

  }


  ParseFromXml(xml) {


    if (xml._FileRef != null)
      this.fileRef = xml._FileRef.toString();;


    if (xml.CheckValue != null)
      this.checkValue = xml.CheckValue.toString();;


  }
}


