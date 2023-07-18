


import OFD from "./OFD.js"
import ReadFromZip from "../Until/ReadFromZip.js"

export default class Doc {

	constructor() {
		//各种事件
		this.event = {};
		this.FinshDocRead = this.FinshDocRead.bind(this);
		this.zip = new JSZip();//压缩的插件
		
		this.readFromZip = new ReadFromZip();
	}

	read(blob) {
		this.blob = blob;
		 
		this.readFromZip.SetBlob(blob);
		this.readOfdXml();
	}
	readOfdXml() {
		try {
			let resPromise1 = this.readFromZip.readFile();
			this.ofd = new OFD();
			let callthis = this;
			resPromise1.then((data) => {
				callthis.ofd.ParseFromXml(data);
				callthis.FinshDocRead()
			});
		} catch (e) {
			console.error("读取文件错误！--" + e);
		}
	}

	FinshDocRead() {
		//console.log("0-FinshDocRead");
		this.$emit('DocumentChange', this);
	}

	/**
	 * 给控件绑定事件
	 * @param {name} 事件
	 * @param {fn} 调用的函数名称
	 */
	$on = (name, fn) => {
		if (!this.event[name]) {
			this.event[name] = [];
			this.event[name].push(fn);
		} else {
			let index = this.event[name].indexOf(fn);
			if (index == -1) {
				this.event[name].push(fn);
			}
		}

	}
	/**
	 * 触发事件
	 * @param {name} 事件名称
	 * @param {...args} 参数
	 */
	$emit = (name, ...args) => {
		if (this.event[name]) {
			try {
				this.event[name].map(func => {
					func(...args);
				});
			} catch (e) {
				console.log(e);
			}

		}
	}

	$off = (name, fn) => {
		if (this.event[name]) {
			if (fn) {
				let index = this.event[name].indexOf(fn);
				if (index > -1) {
					this.event[name].splice(index, 1);
				}
			} else {
				this.event[name].length = 0;
			}
		}
	}


}
