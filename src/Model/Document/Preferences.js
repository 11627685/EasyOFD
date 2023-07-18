


export default class Perferences {
    constructor() {
        //窗口模式，可取值如下：
        /*
        None --常规模式，默认值
        FuallScreen--打开后全文展示
        UseOutLines--同时呈现文档大纲
        UseThumbs--同时呈现缩略图
        UseCustomTages--同时呈现语义结构
        UseLayers--同时呈现图层
        UseAttactchs--同时呈现附件
        UseBookmarks--同时呈现书签
        */
        this.pageMode = "None";
        //页面布局模式，可取值如下:
        /*
               OnePage --单页模式
               OneColumn--但列模式，默认
               TwoPageL--对开模式
               TwoColumnL--对开连续模式
               TwoPageR--对开靠右模式
         */
        this.PageLayout = "OneColumn";
        //是否隐藏工具栏
        this.HideToolbar = false;
        //是否隐藏菜单栏
        this.HideMenubar = false;
        //是否隐藏主窗口之外的其他窗体组件
        this.HideWindowsUI = false;
        //自动缩放模式，可取值如下：
        /*
        Default--默认缩放
        FitHeight--适合高度
        FitWidth--适合宽度
        FitRect--适合区域
        */
        this.ZoomMode = "Default";
        //文档的缩放率
        this.Zoom = 1.0;//Bookmark
        
    }

    ParseFromXml(xml) {

    }

}



