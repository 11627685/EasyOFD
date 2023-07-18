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



/*
  页面块，可以嵌套
*/

import Text from "../Text/Text.js"
import Path from "../Graphic/Path.js"
import Image from "../Image/Image.js"
import Attributes from "./Attributes.js"


export default class PageBlock extends Attributes {
  constructor(commonData) {
    super(commonData);


    //子页面块，可以嵌套
    this.pageBlock = {};

    //文字对象
    this.textObject = [];// new Text();
    //图形对象
    this.pathObject = [];// new Path();
    //图像对象 
    this.imageObject = [];// new Image();

    //复合对象，次PageBlock的复合对象
    this.CompostieObject = [];
  }

  Draw(ctx) {
    ctx.save();
    //ctx.globalCompositeOperation='color-burn';
    this.SetPublicDrawParam(ctx);
    //super.Draw(ctx);
   
    for (var n = 0; n < this.pathObject.length; n++) {
      var pathObject = this.pathObject[n];
      pathObject.Draw(ctx);
    }

    for (var n = 0; n < this.textObject.length; n++) {
      var textObject = this.textObject[n];
      textObject.Draw(ctx);
    }

    for (var n = 0; n < this.imageObject.length; n++) {
      var imageObject = this.imageObject[n];
      imageObject.Draw(ctx);
    }
    ctx.restore();

  }

  SetPublicDrawParam(ctx) {
    if (this.drawParam != null && this.drawParam != '' &&this.commonData.GetPublicRes()!=null) {
      let res = this.commonData.GetPublicRes()[0];
      if (res != null) {
        let drawParam = res.GetDrawParamByID(this.drawParam);
        if (drawParam != null) {
          if (drawParam.relative != "")
            this.GetParentParam(ctx, drawParam.relative);
          drawParam.SetCtx(ctx);
        }
      }
    }
  }
  GetParentParam(ctx, relative) {
    if (relative != "") {
      let res = this.commonData.GetPublicRes()[0];
      let drawParam = res.GetDrawParamByID(relative);
      if (drawParam != null) {
        if (drawParam.relative != "")
          this.GetParentParam(ctx, drawParam.relative);
        drawParam.SetCtx(ctx);
      }
    }
  }


  ParseFromXml(xml) {

    super.ParseFromXml(xml);
    //文字对象
    if (xml.TextObject != null && Array.isArray(xml.TextObject)) {
      for (var n = 0; n < xml.TextObject.length; n++) {
        var docBodyxml = xml.TextObject[n];
        let docBody = new Text(this.commonData);
        docBody.ParseFromXml(docBodyxml);
        this.textObject.push(docBody);
      }
    } else if (xml.TextObject != null) {
      let docBody = new Text(this.commonData);
      docBody.ParseFromXml(xml.TextObject);
      this.textObject.push(docBody);
    }

    //图形对象
    if (xml.PathObject != null && Array.isArray(xml.PathObject)) {
      for (var n = 0; n < xml.PathObject.length; n++) {
        var docBodyxml = xml.PathObject[n];
        let docBody = new Path(this.commonData);
        docBody.ParseFromXml(docBodyxml);
        this.pathObject.push(docBody);
      }
    } else if (xml.PathObject != null) {
      let docBody = new Path(this.commonData);
      docBody.ParseFromXml(xml.PathObject);
      this.pathObject.push(docBody);
    }

    //图像对象 
    if (xml.ImageObject != null && Array.isArray(xml.ImageObject)) {
      for (var n = 0; n < xml.ImageObject.length; n++) {
        var docBodyxml = xml.ImageObject[n];
        let docBody = new Image(this.commonData);
        docBody.ParseFromXml(docBodyxml);
        this.imageObject.push(docBody);
      }
    } else if (xml.ImageObject != null) {
      let docBody = new Image(this.commonData);
      docBody.ParseFromXml(xml.ImageObject);
      this.imageObject.push(docBody);
    }



  }
}