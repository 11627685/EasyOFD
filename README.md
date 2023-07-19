# EasyOFD
 an ofd file web shower  
  
 一个在web端展示ofd文件的控件，该控件基于CANVAS绘制。  
 该控件使用了以下外部程序  
 1）jszip：解决解压文件。  
 2）x2js: 解决XML文件到JS转换  
 3）easyjbig2: 解决ofd内部使用jb2文件存储的图像转换，若你的项目中没有这类文件，可以不加载。  
 该控件着重页面展示，主要完成了图元的文本、图片和路径的解释和输出，展示了电子印章，并未对其他音频、视频、动画、签名、签封等内容进行处理。

# 一、背景
OFD（Open Fixed-layout Document）是一种开放式固定布局文档格式，用于存储和交换电子文档。  
它是中国国家标准局发布的国家标准，旨在提供一种标准化的固定布局文档格式，适用于电子出版、办公自动化和文档交换等领域。

OFD文件具有以下特点：  

固定布局：OFD文件采用固定布局，可以准确地呈现文档的排版、样式、字体和图形等内容。  
这使得OFD文件在保持文档原始格式和外观方面非常有优势，适用于需要保留版式的电子文档，例如报纸、杂志、书籍等。

多媒体支持：OFD文件支持多媒体元素的嵌入，包括图像、音频、视频和动画等。这使得OFD文件可以呈现更丰富的内容形式，提供更好的用户体验。

数据安全：OFD文件支持数据加密和数字签名，可以确保文档内容的安全性和完整性。这对于需要保密或验证文档来源的场景非常重要。

可扩展性：OFD文件采用基于XML的文件结构，具有良好的可扩展性。这意味着可以将其他元数据信息和自定义属性添加到文档中，以满足特定需求。

OFD文件的应用广泛，包括电子出版、电子文档管理、电子归档等领域。它为电子文档的可靠交换和跨平台显示提供了一种统一的解决方案，同时保留了文档的固定布局和视觉效果。
 
# 二、执行标准

## 2.1 板式文档
  执行国家版式文档格式标准——《GB/T 33190-2016 电子文件存储与交换格式 版式文档》  Electronic files storage and exchange formats—Fixed layout documents
  标准链接：https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=3AF6682D939116B6F5EED53D01A9DB5D

## 2.2 电子印章、电子签章
执行国家版式文档格式标准——《GB/T 38540-2020 信息安全技术 安全电子签章密码技术规范》 Information security technology—Technical specification secure electronic seal signature cryptography
标准链接：https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=EBF1360C272E40E7A8B9B32ED0724AB1

# 三、使用方法  
## 3.1 HTML使用

## 3.2 VUE使用
