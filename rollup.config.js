import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import {terser} from "rollup-plugin-terser";
import {eslint} from "rollup-plugin-eslint";
import babel from "rollup-plugin-babel";
import pkg from './package.json';
import dts from "rollup-plugin-dts"

export default [
    {
        input: 'src/index.ts', // 打包入口
        output: { // 打包出口
            file: pkg.browser, // 最终打包出来的文件路径和文件名
            format: 'umd', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
            name: 'index',  // umd必填，否则报错
        },
        plugins: [ // 打包插件
            resolve(), // 查找和打包node_modules中的第三方模块
            commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
            typescript(), // 解析TypeScript
            eslint({   // 代码检测
                throwOnError: true,
                throwOnWarning: true,
                include: ['src/**'],
                exclude: ['node_modules/**']
            }),
            babel({  // 将ES6新特性转换为ES5
                exclude: 'node_modules/**', // 防止打包node_modules下的文件
                runtimeHelpers: true, // 使plugin-transform-runtime生效
            }),
            terser()  // 压缩JS代码
        ]
    },
    {
        // 生成 .d.ts 类型声明文件
        input: 'src/index.ts',
        output: { // 打包出口
            file: 'dist/index.d.ts', // 最终打包出来的文件路径和文件名
            format: "es"
        },
        plugins: [dts()],
    }
];