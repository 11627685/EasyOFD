

import Area from "./Area.js"



export default class Region {
    constructor() {
        this.areas = [];//Area

    }


    ParseFromXml(xml) {

        if (xml.Area != null && Array.isArray(xml.Area)) {
            for (var n = 0; n < xml.Area.length; n++) {
                var docBodyxml = xml.Area[n];
                let docBody = new Area();
                docBody.ParseFromXml(docBodyxml);
                this.areas.push(docBody);
            }
        } else if (xml.Area != null) {
            let docBody = new Area();
            docBody.ParseFromXml(xml.Area);
            this.areas.push(docBody);
        }

    }

}
