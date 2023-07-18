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




export default class ReadFromZip {

  constructor() {

    this.x2js = new X2JS({ //xml数据处理插件
      stripWhitespaces: false,
      skipEmptyTextNodesForObj: false
    });
    this.zip = new JSZip();//压缩的插件


  }

  SetBlob(blob) {
    this.blob = blob;
  }

  readImage(zip, fileName) {

    if (fileName.endsWith('.jb2')) {

      return new Promise((resolve, reject) => {

        let oneImagep = zip.file(fileName).async("blob");
        oneImagep.then((imageblob) => {
          var reader = new FileReader();
          reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            // 创建一个Uint8Array来存储文件内容
            var uintArray = new Uint8Array(arrayBuffer);
            var jbig2 = new Jbig2Image();
            var data = jbig2.parse(uintArray);


            var canvas = document.createElement('canvas');
            canvas.width = jbig2.width;
            canvas.height = jbig2.height;
            var ctx = canvas.getContext('2d');

            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data1 = imageData.data;
            for (var i = 0, d = 0; i < data1.length; i += 4, d++) {
              let sdata = data[d]
              if (sdata == 255) {
                // 修改像素的颜色或透明度等
                data1[i] = 255; // 红色通道（0-255）
                data1[i + 1] = 255;   // 绿色通道（0-255）
                data1[i + 2] = 255;   // 蓝色通道（0-255）
              } else {  // 修改像素的颜色或透明度等
                data1[i] = 0; // 红色通道（0-255）
                data1[i + 1] = 0;   // 绿色通道（0-255）
                data1[i + 2] = 0;   // 蓝色通道（0-255）
              }
              data1[i + 3] = 255; // Alpha 通道（0-255）
            }
            ctx.putImageData(imageData, 0, 0);

            const dataURL = canvas.toDataURL("image/png");

            // 创建Image对象
            var img = new Image();

            // 监听图像加载完成事件
            img.onload = function () {
              // 图像加载完成后，将Promise状态置为已完成
              resolve(img);
            };

            // 监听图像加载错误事件
            img.onerror = function (ee) {
              // 图像加载错误时，将Promise状态置为已拒绝
              reject(new Error("Failed to load image"));
            };

            // 为Image对象设置src为blob URL
            img.src =dataURL;

          }
          reader.readAsArrayBuffer(imageblob);
        });


      });




    } else

      return new Promise((resolve, reject) => {
        let oneImagep = zip.file(fileName).async("blob");
        oneImagep.then((imageblob) => {
          // 创建一个新的图像元素
          var img = new Image();

          if (fileName.includes(".bmp"))
            img.alt = "BMP Image"
          // 监听图像加载完成事件
          img.onload = function () {
            // 图像加载完成后，将Promise状态置为已完成
            resolve(img);
          };

          // 监听图像加载错误事件
          img.onerror = function () {
            // 图像加载错误时，将Promise状态置为已拒绝
            reject(new Error("Failed to load image"));
          };
          // 将Blob对象赋值给图像的src属性
          img.src = URL.createObjectURL(imageblob);

        });
      });
  }

  readBlobAsByteArray(zip, fileName) {
    // 创建一个新的 FileReader 对象
    var reader = new FileReader();

    return new Promise(function (resolve, reject) {

      let onedatep = zip.file(fileName).async("blob");

      onedatep.then((blob) => {
        reader.onloadend = function (event) {
          if (event.target.readyState === FileReader.DONE) {
            // 将获取的字节数据作为 Uint8Array 返回
            var arrayBuffer = event.target.result;
            var uint8Array = new Uint8Array(arrayBuffer);
            resolve(uint8Array);
          }
        };

        reader.onerror = function (event) {
          reject(new Error('读取 Blob 错误'));
        };

        // 将 Blob 对象传递给 FileReader 以进行读取
        reader.readAsArrayBuffer(blob);

      });
    });
  }

  readFile() {
    let retXMLObject = { docs: [] };

    return new Promise((resolve, reject) => {
      try {

        let callthis = this;

        this.zip.loadAsync(this.blob).then((zip) => {

          let allPromise = [];
          let ofdPromise = zip.file("OFD.xml").async("string");

          allPromise.push(ofdPromise);

          ofdPromise.then((data) => {
            retXMLObject.ofd = callthis.x2js.xml2js(data);
          });

          let doc0 = new Map();
          retXMLObject.docs.push(doc0);

          // 匹配文件名为 *.xml 的文件
          const fileRegex = /^Doc_0\/.*\.xml$/;

          // 匹配文件名为 *.jpg、*.jpeg、*.png、*.gif 的文件
          const imagefileRegex = /^Doc_0\/Res\/.*\.(jpg|jpeg|png|gif|bmp|jb2)$/i;



          // 遍历 Doc_0 目录下的所有文件
          zip.folder("Doc_0").forEach((relativePath, file) => {

            if (fileRegex.test(file.name)) {
              // 读取符合条件的文件
              // console.log(relativePath);
              let onePromise = zip.file(file.name).async("string");
              allPromise.push(onePromise);
              onePromise.then((data) => {
                doc0.set(relativePath, callthis.x2js.xml2js(data));
              });
            }

            if (imagefileRegex.test(file.name)) {
              // 将文件转换为可用于 Img 标签的 URL，并将其添加到 imageContainer 中
              let oneImagep = this.readImage(zip, file.name);
              allPromise.push(oneImagep);
              oneImagep.then((image) => {
                doc0.set(relativePath, image);
              })
            }

            if (relativePath.startsWith('Signs/') && (relativePath.endsWith('.esl') | relativePath.endsWith('.dat'))) {
              let onedatep = this.readBlobAsByteArray(zip, file.name);
              allPromise.push(onedatep);
              onedatep.then((data) => {
                doc0.set(relativePath, data);
              })
            }

          });

          Promise.all(allPromise).then(() => {
            resolve(retXMLObject);
          });

        });



      } catch (e) {
        reject("读取文件错误！--" + e);
      }
    });
  }

}
