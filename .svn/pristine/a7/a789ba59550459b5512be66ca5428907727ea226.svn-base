
 

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


