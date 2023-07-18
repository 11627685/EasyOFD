


export default class MM2PX {

  static #instance;//静态私有变量
  
  constructor() {
    if (!MM2PX.#instance) {
      MM2PX.#instance = this
    }
    return MM2PX.#instance
  }

  static Instance() {
    if (!this.#instance) this.#instance = new MM2PX();
    return this.#instance;
  }


  /**
       * 所以1英寸=25.4毫米
       * @param {12.7 毫米 = 0.127 厘米 = 0.5 英寸 
                 12.7 毫米 = 0.5 英寸×96 像素/英寸 = 48 像素} x 
       */
  ToPX(v) {
    return parseFloat(parseFloat(v) / 25.4 * 96);
  }

  CTM()
  {
    //平移
    
    //缩放

    //旋转

    //切边


  }


}
