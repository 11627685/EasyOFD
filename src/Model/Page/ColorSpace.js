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





export default class ColorSpace {
    constructor() {

        //颜色空间类型，
        //GRAY "#FF" "255"
        //RGB， 三个通道，红 绿 蓝 "#11 #22 #33"  "17 34 51"
        //CNYK  四个通道 青 黄 品红 黑 "#11 #22 #33 #44" '17 34 51 68'
        this.type = "";
        
         
        //每个颜色通道所使用的位数 1，2，4，8，16
        this.bitPerComponetn =8;
       

        //指向包内颜色配置文件
        this.profile='Butt';   

         

        //调色板
        this.palette=[];   

       
 
    }


    ParseFromXml(xml) {

    }
}