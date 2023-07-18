/**
 * The test files are originally take from https://github.com/camelaissani/rollup-plugin-closure-compiler-js,
 * and modified to adapt Mocha 3.
 *
 * Copyright (c) 2016 Camel Aissani
 * Copyright (c) 2017 Riku Ayanokoji
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const rollup = require('rollup').rollup;
const ClosureCompiler = require('google-closure-compiler').compiler;
const assert = require('assert');
const closure = require('../');

process.chdir(__dirname);

describe('rollup-plugin-closure-compiler', function () {
  // because closure-compiler takes time
  this.timeout(0);
  it('should compile', async () => {
    const bundle = await rollup({
      entry: 'fixtures/unminified.js',
      plugins: [closure()]
    });
    const {code, map} = await bundle.generate({format: 'cjs'});
    const compiler = new ClosureCompiler({
      js: 'fixtures/unminified.js',
    });
    const [exitCode, stdout, stderr] = await new Promise(resolve => compiler.run((...args) => resolve(args)));
    assert.equal(exitCode, 0, stderr);
    assert.equal(code, stdout);
    return true;
  });
  it('should compile via closure-compiler options', async () => {
    const bundle = await rollup({
      entry: 'fixtures/unminified.js',
      // camel-case style parameters will automatically be converted to underscore style
      plugins: [closure({compilationLevel: 'ADVANCED'})]
    });
    const {code, map} = await bundle.generate({format: 'cjs'});
    const compiler = new ClosureCompiler({
      js: 'fixtures/unminified.js',
      compilation_level: 'ADVANCED',
    });
    const [exitCode, stdout, stderr] = await new Promise(resolve => compiler.run((...args) => resolve(args)));
    assert.equal(exitCode, 0, stderr);
    assert.equal(code, stdout);
    return true;
  });
  it('should compile with sourcemaps', async () => {
    const bundle = await rollup({
      entry: 'fixtures/source-map.js',
      plugins: [closure()]
    });
    const {map} = await bundle.generate({format: 'cjs', sourceMap: true});
    assert.ok(map, 'has a source map');
    assert.equal(map.version, 3, 'source map has expected version');
    assert.ok(Array.isArray(map.sources), 'source map has sources array');
    assert.equal(map.sources.length, 2, 'source map has two sources');
    assert.ok(Array.isArray(map.names), 'source maps has names array');
    assert.ok(map.mappings, 'source map has mappings');
    return true;
  });
});
