const fs = require('fs');
const tempfile = require('tempfile');
const ClosureCompiler = require('google-closure-compiler').compiler;

module.exports = function closure(flags = {}) {
  return {
    name: 'closure-compiler',
    transformBundle(code) {
      const jsFilename = tempfile();
      const mapFilename = tempfile();
      fs.writeFileSync(jsFilename, code);
      flags = Object.assign({
        js: jsFilename,
        createSourceMap: mapFilename,
        processCommonJsModules: true,
      }, flags);
      const compiler = new ClosureCompiler(camelToUnderscore(flags));
      const compile = new Promise(resolve => compiler.run((...args) => resolve(args)));
      return compile.then(([exitCode, stdout, stderr]) => {
        if (exitCode != 0) {
          throw new Error(`closure compiler exited ${exitCode}: ${stderr}`);
        }
        return { code: stdout, map: JSON.parse(fs.readFileSync(mapFilename)) };
      });
    }
  };
}

const camelToUnderscore = camelOptions => {
  const reg = /([A-Z])/g;
  const ret = {};
  Object.keys(camelOptions).forEach(key => {
    const value = camelOptions[key];
    if (reg.test(key)) {
      key = key.replace(reg, char => '_' + char.toLowerCase())
    }
    ret[key] = value;
  });
  return ret;
}
