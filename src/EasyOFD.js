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



import Doc from "./Model/Doc.js"
import View from "./View/View.js"

export default class EasyOFD {

    constructor(id, parent, x = 0, y = 0, width = 300, height = 150) {
        this.id = id;
        this.x = x; //开始X坐标像素，相对值
        this.y = y; //开始y坐标像素，相对值
        this.width = width; //宽度像素
        this.height = height; //高度像素
        this.parent = parent;
        this.zoomSize = 1;
        


        this.WrapperCanvas(id, width, height);
        this.doc = new Doc();
        this.view = new View(this);
        this.SelectFile.bind(this);
        this.OpenFile.bind(this);
        this.doc.$on('DocumentChange', this.DocumentChange.bind(this));
        this.canvasSelectFile.addEventListener('change', this.SelectFile.bind(this));
        // this.Draw();
    }
    WrapperCanvas() {

        this.rootdiv = document.createElement('div');
        this.rootdiv.tabindex = "0";
        this.rootdiv.id = this.id;
        this.parent.appendChild(this.rootdiv);
        this.wrapperToolsBar();
        this.wrapperCanvas();

    }
    wrapperCanvas() {
        this.canvasdiv = document.createElement('div');
        this.canvasdiv.setAttribute("style", "display: flex;justify-content: center ;padding: 10px 0 10px 0;background-color: gray;max-height:1000px;overflow:auto");
        this.rootdiv.appendChild(this.canvasdiv);
        this.canvas = document.createElement('canvas');
        this.canvasdiv.appendChild(this.canvas);

        this.canvas.id = this.id + '-ofd-canvas';
        this.ctx = this.canvas.getContext('2d');

        let dpr = window.devicePixelRatio;
        let bsr = this.ctx['webkitBackingStorePixelRatio'] ||
            this.ctx['mozBackingStorePixelRatio'] ||
            this.ctx['msBackingStorePixelRatio'] ||
            this.ctx['oBackingStorePixelRatio'] ||
            this.ctx['backingStorePixelRatio'] || 1;
        this.ratio = dpr / bsr;


        this.canvas.width = (parseInt(this.width) * this.zoomSize || document.documentElement.clientWidth) * this.ratio;
        this.canvas.height = (parseInt(this.height) * this.zoomSize || document.documentElement.clientHeight) * this.ratio;
        this.canvas.style.width = (parseInt(this.width) * this.zoomSize || document.documentElement.clientWidth) + 'px';
        this.canvas.style.height = (parseInt(this.height) * this.zoomSize || document.documentElement.clientHeight) + 'px';
        this.canvas.style.backgroundColor = 'white';

        this.ctx.scale(this.ratio * this.zoomSize, this.ratio * this.zoomSize);

        this.WrapperPPI(this.id);
        this.WrapperSelectFile(this.id, this.canvasdiv);
    }

    wrapperToolsBar() {
        this.toolBar = document.createElement('div');
        this.toolBar.setAttribute("style", "align-items: center;display: flex;justify-content: center ;padding: 10px 0 10px 0;");
        this.rootdiv.appendChild(this.toolBar);

        //打开本地文件
        this.selectButton = document.createElement('div');
        this.selectButton.id = this.id + 'selectButton';
        this.selectButton.innerText = '打开';
        this.selectButton.className = 'OfdButton OpenFile';
        this.selectButton.addEventListener('click', this.OpenFile.bind(this));
        this.toolBar.appendChild(this.selectButton);

        //第一页
        this.firstPage = document.createElement('div');
        this.firstPage.id = this.id + 'firstPage';
        this.firstPage.innerText = '|<';
        this.firstPage.className = 'OfdButton firstPage';
        this.firstPage.addEventListener('click', this.FirstPage.bind(this));
        this.toolBar.appendChild(this.firstPage);


        //上一页

        this.prePage = document.createElement('div');
        this.prePage.id = this.id + 'prePage';
        this.prePage.innerText = '<';
        this.prePage.className = 'OfdButton prePage';
        this.prePage.addEventListener('click', this.PrePage.bind(this));
        this.toolBar.appendChild(this.prePage);


        //当前页数
        this.nowPage = document.createElement('div');
        this.nowPage.id = this.id + 'nowPage';
        this.nowPage.innerText = '1/1';
        this.nowPage.className = 'OfdButton nowPage';
        this.toolBar.appendChild(this.nowPage);

        //下一页

        this.nextPage = document.createElement('div');
        this.nextPage.id = this.id + 'nextPage';
        this.nextPage.innerText = '>';
        this.nextPage.className = 'OfdButton nextPage';
        this.nextPage.addEventListener('click', this.NextPage.bind(this));
        this.toolBar.appendChild(this.nextPage);


        //最后一页

        this.lastPage = document.createElement('div');
        this.lastPage.id = this.id + 'lastPage';
        this.lastPage.innerText = '>|';
        this.lastPage.className = 'OfdButton lastPage';
        this.lastPage.addEventListener('click', this.LastPage.bind(this));
        this.toolBar.appendChild(this.lastPage);


        //缩小

        this.zoomIn = document.createElement('div');
        this.zoomIn.id = this.id + 'zoomIn';
        this.zoomIn.innerText = '缩小';
        this.zoomIn.className = 'OfdButton zoomIn';
        this.zoomIn.addEventListener('click', this.ZoomIn.bind(this));
        this.toolBar.appendChild(this.zoomIn);

        this.zoomValue = document.createElement('div');
        this.zoomValue.id = this.id + 'zoomValue';
        this.zoomValue.innerText = '100%';
        this.zoomValue.className = 'OfdButton zoomValue';
        this.toolBar.appendChild(this.zoomValue);



        //放大

        this.zoomOut = document.createElement('div');
        this.zoomOut.id = this.id + 'zoomOut';
        this.zoomOut.innerText = '放大';
        this.zoomOut.className = 'OfdButton zoomOut';
        this.zoomOut.addEventListener('click', this.ZoomOut.bind(this));
        this.toolBar.appendChild(this.zoomOut);


    }

    FirstPage() {
        if (this.view.pageNow == 1) return;
        this.view.pageNow = 1;
        this.DocumentChange();

    }
    PrePage() {
        if (this.view.pageNow > 1) {
            this.view.pageNow = this.view.pageNow - 1;
            this.DocumentChange();
        }

    }
    NextPage() {
        if (this.view.pageNow < this.view.AllPageNo) {
            this.view.pageNow = this.view.pageNow + 1;
            this.DocumentChange();
        }
    }
    LastPage() {
        if (this.view.pageNow == this.view.AllPageNo) return;
        this.view.pageNow = this.view.AllPageNo;
        this.DocumentChange();

    }

    ZoomIn() {
        this.zoomSize=this.zoomSize-0.1;
        this.zoomValue.innerText = parseInt ( (this.zoomSize*100)) +"%";
        
        this.scaleCanvas(this.zoomSize);
    }


    ZoomOut() {
        this.zoomSize=this.zoomSize+0.1;
        this.zoomValue.innerText = parseInt ( (this.zoomSize*100))+"%";
        this.scaleCanvas(this.zoomSize);
    }




    // 缩放 Canvas
    scaleCanvas(zoom) {
        this.zoomSize = zoom;
        this.ctx.save(); // 保存当前状态
        this.SetPhyViewZoom();
        this.Draw();
        this.ctx.restore(); // 恢复之前保存的状态
    }


    OpenFile() {
        console.log('OpenFile');
        this.canvasSelectFile.click();
    }



    SetPhyViewZoom() {
        var element = document.getElementById(this.id);
        if (element) {
            element.remove();

        }
        let box = this.view.GetPagePhysicalBox();
        this.width = this.ToPX(box.w);
        this.height = this.ToPX(box.h);
        this.WrapperCanvas();
        if (element) {

            this.canvasSelectFile.addEventListener('change', this.SelectFile.bind(this));
        }

    }
    DocumentChange(doc) {
        console.log('Draw DocumentChange');
        this.SetPhyViewZoom();
        this.Draw()
    }
    Draw() //参数画图设备，此处为canvas
    {

        this.view.Draw(this.ctx);
        this.nowPage.innerText = this.view.pageNow + '/' + this.view.AllPageNo;
        this.zoomValue.innerText = parseInt ( (this.zoomSize*100)) +"%";
        console.log('Draw');
    }

    WrapperPPI(id) {
        let divPPI = document.createElement('div');
        divPPI.id = id + '-ppi';
        divPPI.style = "width:1in;visible:hidden;padding:0px";
        this.canvasdiv.appendChild(divPPI);
        this.ppi = document.getElementById(id + '-ppi').offsetWidth;
        this.canvas.ppi = this.ppi;
    }

    WrapperSelectFile(id, canvasdiv) {
        this.canvasSelectFile = document.createElement('input');
        canvasdiv.appendChild(this.canvasSelectFile);
        this.canvasSelectFile.id = id + '-ofd-selectfile';
        this.canvasSelectFile.type = 'file';
        this.canvasSelectFile.accept = '.ofd';
        this.canvasSelectFile.style = 'display:none';
    }

    SelectFile(event) {
        try {
            let file = event.target.files[0]
            this.filename = file.name;
            console.log(this.filename);
            this.doc.read(file);
        } catch (e) {
            console.log(e);
        }
    }
    loadFromBlob(blob) {
        try {
            this.doc.read(blob);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 所以1英寸=25.4毫米
     * @param {12.7 毫米 = 0.127 厘米 = 0.5 英寸 
               12.7 毫米 = 0.5 英寸×96 像素/英寸 = 48 像素} x 
     */
    ToPX(v) {
        return parseFloat(parseFloat(v) / 25.4 * 96);
    }

}


// 导出函数到全局作用域
window.EasyOFD = EasyOFD;
