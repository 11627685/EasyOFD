
/**
 *  |   8   7   |   6   |   5   4   3   2   1   |   8   |   7   6   5   4   3   2   1   |
 *  |tag class  |  P/C  |   tag number          |                                       |
 *  |           |       |                       | 1-more|   7bits of tag type           |
 *  一、 tag class 有以下几种，它的值是用来区分 ASN.1 类型
 *          类型            值          说明
 *      universal           0       表示原始的数据类型
 *      application	        1	    只适用于一个特定的应用程序类型
 *      context-specific	3	    根据上下文定义的类型
 *      private	            4	    私人规范中定义的类型
 *  二、p/c 表示数据内容是基本的数据类型还是复合的数据类型
 *          类型	        数值	            说明
 *      Primitive (P)	    0	        数据内容仅由一个数据元素组成
 *      Constructed (C)	    1	        数据内容由多个数据元素组成
 *  san、tag number 数据的标识，是固定的
 * 
 *          数据类型	        编码类型	    Tag number(十进制)	    Tag number(十六进制)
            Decimal	        Hexadecimal
    End-of-Content (EOC)	Primitive	        0	                        0
    BOOLEAN	                Primitive	        1                      	    1
    INTEGER	                Primitive	        2                       	2
    BIT STRING	            Both	            3	                        3
    OCTET STRING	        Both	            4	                        4
    NULL	                Primitive	        5	                        5
    OBJECT IDENTIFIER	    Primitive	        6	                        6
    Object Descriptor	    Both	            7	                        7
    EXTERNAL	            Constructed	        8	                        8
    REAL (float)	        Primitive	        9	                        9
    ENUMERATED	            Primitive	        10	                        A
    EMBEDDED PDV	        Constructed	        11	                        B
    UTF8String	            Both	            12	                        C
    RELATIVE-OID	        Primitive	        13	                        D
    TIME	                Primitive	        14	                        E
Reserved		15	F
SEQUENCE and SEQUENCE OF	Constructed	16	10
SET and SET OF	Constructed	17	11
NumericString	Both	18	12
PrintableString	Both	19	13
T61String	Both	20	14
VideotexString	Both	21	15
IA5String	Both	22	16
UTCTime	Both	23	17
GeneralizedTime	Both	24	18
GraphicString	Both	25	19
VisibleString	Both	26	1A
GeneralString	Both	27	1B
UniversalString	Both	28	1C
CHARACTER STRING	Constructed	29	1D
BMPString	Both	30	1E
DATE	Primitive	31	1F
TIME-OF-DAY	Primitive	32	20
DATE-TIME	Primitive	33	21
DURATION	Primitive	34	22
OID-IRI	Primitive	35	23
RELATIVE-OID-IRI	Primitive	36	24
 * 
 */




export default class OctetsType {

    constructor() {

        

    }


}