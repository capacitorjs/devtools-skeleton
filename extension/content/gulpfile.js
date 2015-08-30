/*eslint-env node*/
'use strict';

var common = require('gulp-capacitorjs-common');
common.config.src.out = 'content.js';
common.config.src.main = 'src/content.js';
common.registerCommon();
