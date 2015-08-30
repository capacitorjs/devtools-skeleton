'use strict';

import {EventEmitter} from 'events';
import {InjectedHelpers} from 'capacitor-devtools-helpers';

const emitter = new EventEmitter();
InjectedHelpers.proxyEvents(emitter);

window.__injected = {emitter};
