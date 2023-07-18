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
