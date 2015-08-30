/*eslint-env node*/
'use strict';

var common = require('gulp-capacitorjs-common');
common.config.src.out = 'background.js';
common.config.src.main = 'src/background.js';
common.registerCommon();
