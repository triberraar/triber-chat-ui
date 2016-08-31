'use strict';

/*eslint-disable*/
var glob = require('glob');
var UglifyJS = require('uglify-js');
var fs = require('fs');


console.log('begining concat');
/*eslint-enable*/

var inputGlobs = ['src/js/triber-chat/**/!(*_spec).js', 'src/js/common/!(*_spec).js'];
var toMinifyFiles = [];

// glob files
inputGlobs.forEach(function(element) {
    toMinifyFiles = toMinifyFiles.concat(glob.sync(element, {}));
});

// minify files
var result = UglifyJS.minify(toMinifyFiles, {outSourceMap: 'triber-chat.min.js.map', mangle: false, compress: false});

// save result
if(!fs.existsSync('dst')) {
    fs.mkdirSync('dst');
}
fs.writeFile('dst/triber-chat.min.js', result.code);
fs.writeFile('dst/triber-chat.min.js.map', result.map.replace(/src/g, '../src'));

/*eslint-disable*/
console.log('done concat');
/*eslint-enable*/