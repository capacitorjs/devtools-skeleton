'use strict';

import {EventEmitter} from 'events';
import {PanelHelpers} from 'capacitor-devtools-helpers';

const emitter = new EventEmitter();
const portName = 'github.com/capacitorjs/devtools-skeleton:panel';
const content = 'content/lib/content.js';
const injected = '/injected/lib/injected.js';

PanelHelpers.initializePanel(portName, emitter, content, injected).then(function () {
  // start
});
