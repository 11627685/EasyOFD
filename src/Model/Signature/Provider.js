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





export default class Provider {
    constructor() {

        /*创建签名时所用的签章组件的提供者名称*/
        this.providerName = '';
        /* 
        创建签名时所用的签章组件的制造商
        */
        this.company = '';

        /*创建签名时所用的签章组件的版本*/
        this.version = '';

    }


    ParseFromXml(xml) {


        if (xml._ProviderName != null)
            this.providerName = xml._ProviderName.toString();

        if (xml._Company != null)
            this.company = xml._Company.toString();

        if (xml._Version != null)
            this.version = xml._Version.toString();



    }
}


