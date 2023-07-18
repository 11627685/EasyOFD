

 
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser'; 

export default {
    input:'./src/EasyOFD.js',//入口文件
    output:{
      file:'./dist/EasyOFD.js',//打包后的存放文件
      format:'iife'//输出格式 
      
    },
    plugins:[
      babel({
        exclude: 'node_modules/**', // 忽略node_modules中的代码
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
      terser({
        compress: { drop_console: true },
        format: {
          comments: false, // 删除注释
        },
        mangle: true, // 开启代码混淆
      }), // 添加terser插件

       
    ]
  }