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



export default class TLV {

    constructor() {
        this.ocxNumber = 0;
        this.hexNumber = 0x0;
        this.offset = 0;
        this.lenth = 0;
        this.value=null;
    }

    Parse(data) {
        var tag = data[0];
        this.offset++;
        if (tag == this.ocxNumber) {
            var tagLenth = data[1];
            this.offset++;
            let valueBit = 0;
            //如果 “值” 字段包含少于 128 个字节，则 “长度 ”字段只需要一个字节。
            if (tagLenth < 128) {
                valueBit = tagLenth;
            } else { // “长度”字段的第 7 位为零 (0) ，其余位标识要发送的内容的字节数
                let lenthBit = tagLenth - 128;

                valueBit = this.BitToInt(data.slice(this.offset, this.offset + lenthBit));
                this.offset = this.offset + lenthBit;
            }
            this.lenth = valueBit;
        } else {
            throw new Error('非法的' + this.elementType + '对应');

        }

    }
    value()
    {
        return this.value;
    }

    BitToInt(array) {

        if (array.length == 1)
            return array[0];
        if (array.length == 2)
            return (array[0] << 8) | array[1];
        else if (array.length == 3)
            return (array[0] << 16) | (array[1] << 8) | array[2];
        else if (array.length == 4)
            return (array[0] << 32) | (array[1] << 16) | (array[2] << 8) | array[3];
        else if (array.length == 5)
            return (array[0] << 64) | (array[2] << 32) | (array[3] << 16) | (array[4] << 8) | array[5];
    }


}