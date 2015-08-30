'use strict';

import {BackgroundHelpers} from 'capacitor-devtools-helpers';

const panelPortName = 'github.com/capacitorjs/devtools-skeleton:panel';
const contentPortName = 'github.com/capacitorjs/devtools-skeleton:content';
BackgroundHelpers.initializeBackground(panelPortName, contentPortName);
