
import {DEFAULT_EXTENSIONS} from '@babel/core';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

const pkg = require('./package.json');

export default {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    json(),
    babel({
      extensions: [
        ...DEFAULT_EXTENSIONS,
        'ts'
      ],
      babelHelpers: 'bundled'
    }),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true
    }),
    typescript({
      tsconfig: './tsconfig.lib.json'
    }),
  ],
  external: Object.keys(pkg.devDependencies)
}