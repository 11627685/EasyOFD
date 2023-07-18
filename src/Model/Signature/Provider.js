




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


