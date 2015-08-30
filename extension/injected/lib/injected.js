(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _events = __webpack_require__(1);
	
	var _capacitorDevtoolsHelpers = __webpack_require__(2);
	
	var emitter = new _events.EventEmitter();
	_capacitorDevtoolsHelpers.InjectedHelpers.proxyEvents(emitter);
	
	window.__injected = { emitter: emitter };

/***/ },
/* 1 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];
	
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define(factory);
		else {
			var a = factory();
			for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
		}
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
		
		var _panelHelpersJs = __webpack_require__(1);
		
		var _panelHelpersJs2 = _interopRequireDefault(_panelHelpersJs);
		
		var _injectedHelpersJs = __webpack_require__(2);
		
		var _injectedHelpersJs2 = _interopRequireDefault(_injectedHelpersJs);
		
		var _contentHelpersJs = __webpack_require__(4);
		
		var _contentHelpersJs2 = _interopRequireDefault(_contentHelpersJs);
		
		var _backgroundHelpersJs = __webpack_require__(5);
		
		var _backgroundHelpersJs2 = _interopRequireDefault(_backgroundHelpersJs);
		
		exports['default'] = {
		  PanelHelpers: _panelHelpersJs2['default'],
		  InjectedHelpers: _injectedHelpersJs2['default'],
		  ContentHelpers: _contentHelpersJs2['default'],
		  BackgroundHelpers: _backgroundHelpersJs2['default']
		};
		module.exports = exports['default'];
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
		
		exports['default'] = {
		  /**
		   * Connect to the bacground page,
		   * immediately initializing any scripts and listening for messages to forward
		   * @param emitter a node-sytle EventEmitter
		   */
		  connectToBackground: function connectToBackground(portName) {
		    return new Promise(function (resolve) {
		      // Create a connection to the background page
		      var port = chrome.runtime.connect({ name: portName });
		
		      var listener = function listener(message) {
		        if (message.name === 'background:connect') {
		          port.onMessage.removeListener(listener);
		          resolve(port);
		        }
		      };
		
		      // tunnel from injected to emitter
		      port.onMessage.addListener(listener);
		    });
		  },
		
		  /**
		   * Inject the given content script.
		   * Requires the cooperation of background-helpers
		   * @param port
		   * @param contentScript
		   * @returns {Promise}
		   */
		  injectContent: function injectContent(port, contentScript) {
		    return new Promise(function (resolve) {
		      var listener = function listener(message) {
		        if (message.name === 'content:registered') {
		          port.onMessage.removeListener(listener);
		          resolve();
		        }
		      };
		
		      port.onMessage.addListener(listener);
		
		      port.postMessage({
		        name: 'register-content',
		        contentTabId: chrome.devtools.inspectedWindow.tabId,
		        file: contentScript
		      });
		    });
		  },
		
		  /**
		   * Tunnel events from the background page to the message emitter
		   * and from the message emitter to the background page
		   * Requires the cooperation of background-helpers, content-helpers, and injected-helpers
		   * @param port a chrome.runtime.Port
		   * @param emitter a node-style EventEmitter
		   * @return () -> void A function that disposes of the listeners
		   */
		  proxyEvents: function proxyEvents(port, emitter) {
		    var backgroundListener = function backgroundListener(message) {
		      if (message.name === 'tunnel:panel') {
		        emitter.emit(message.event, message.payload);
		      }
		    };
		
		    var panelListener = function panelListener(event, payload) {
		      port.postMessage({
		        name: 'tunnel:injected',
		        event: event,
		        payload: payload
		      });
		    };
		
		    var toInjected = 'tunnel:injected';
		    emitter.on(toInjected, panelListener);
		    port.onMessage.addListener(backgroundListener);
		
		    return function () {
		      emitter.removeListener(toInjected, panelListener);
		      port.onMessage.removeListener(backgroundListener);
		    };
		  },
		
		  /**
		   * Inject the given script file into the inspected window
		   * @param scriptFile
		   */
		  injectScript: function injectScript(scriptFile) {
		    return new Promise(function (resolve, reject) {
		      // URL scheme "chrome-extension" is not supported by Chrome's fetch yet
		      var injectedXHR = new XMLHttpRequest();
		      injectedXHR.open('get', scriptFile, true);
		      injectedXHR.addEventListener('load', function (xhrResult) {
		        var injectedScript = xhrResult.target.response;
		        chrome.devtools.inspectedWindow.eval(injectedScript, function (result, isException) {
		          if (isException) {
		            reject(result);
		          } else {
		            resolve(result);
		          }
		        });
		      });
		      injectedXHR.send();
		    });
		  },
		
		  /**
		   * A convenience method to forward messages, inject a content page,
		   * and inject an inspected script
		   *
		   * Note that this does not provide the convenient ability to tear down listeners,
		   * as it assumes the event-listening will be running for the lifetime of the application
		   * @param portName
		   * @param emitter a node-sytle event emitter
		   * @param contentScript the location of the content script to inject
		   * @param inspectedScript the location of the script to inject into the inspected window
		   * @returns {Promise} resolves when all scripts are injected
		   */
		  initializePanel: function initializePanel(portName, emitter, contentScript, inspectedScript) {
		    var _this = this;
		
		    var background = this.connectToBackground(portName);
		    var content = background.then(function (port) {
		      _this.proxyEvents(port, emitter);
		      return _this.injectContent(port, contentScript).then(function () {
		        return port;
		      });
		    });
		    var injected = this.injectScript(inspectedScript);
		    return Promise.all([content, injected]).then(function (_ref) {
		      var _ref2 = _slicedToArray(_ref, 1);
		
		      var port = _ref2[0];
		
		      return port;
		    });
		  }
		};
		module.exports = exports['default'];
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
		
		var _tunnelUtilsJs = __webpack_require__(3);
		
		var _tunnelUtilsJs2 = _interopRequireDefault(_tunnelUtilsJs);
		
		exports['default'] = {
		  /**
		   * Tunnel events from the content script to the emitter
		   * and from the emitter to the content script
		   *
		   * @return a function that tears down the listeners
		   */
		  proxyEvents: function proxyEvents(emitter) {
		    // publish content script messages to the emitter
		    var contentToEmitter = _tunnelUtilsJs2['default'].tunnelEvents('tunnel:injected', function (message) {
		      emitter.emit(message.event, message.payload);
		    });
		
		    // publish emitter events to the content script
		    var emitterToContent = function emitterToContent(event, payload) {
		      window.postMessage({
		        name: 'tunnel:panel',
		        event: event,
		        payload: payload
		      }, '*');
		    };
		
		    window.addEventListener('message', contentToEmitter);
		    emitter.on('tunnel:panel', emitterToContent);
		
		    return function () {
		      window.removeEventListener('message', contentToEmitter);
		      emitter.removeListener('tunnel:panel', emitterToContent);
		    };
		  }
		};
		module.exports = exports['default'];
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		exports['default'] = {
		  /**
		   * Wraps the givent function, ensuring that it will only be called
		   * when the message has the given eventName and originates from the same window
		   */
		  tunnelEvents: function tunnelEvents(eventName, fn) {
		    return function (event) {
		      var message = event.data;
		      if (event.source !== window || typeof message !== 'object' || message == null || message.name !== eventName) {
		        return;
		      }
		      fn(message);
		    };
		  }
		};
		module.exports = exports['default'];
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
		
		var _tunnelUtilsJs = __webpack_require__(3);
		
		var _tunnelUtilsJs2 = _interopRequireDefault(_tunnelUtilsJs);
		
		exports['default'] = {
		  connectToBackground: function connectToBackground(portName) {
		    return new Promise(function (resolve) {
		      var port = chrome.runtime.connect({ name: portName });
		      var listener = function listener(message) {
		        if (message.name === 'background:connect') {
		          port.postMessage({ name: 'register' });
		          port.onMessage.removeListener(listener);
		          resolve(port);
		        }
		      };
		
		      port.onMessage.addListener(listener);
		    });
		  },
		
		  /**
		   * Tunnel events from the injected script to the panel, and vice-versa
		   * Tunneling happens by means of the background page
		   */
		  proxyEvents: function proxyEvents(port) {
		    // tunnel events from the injected script to the panel
		    var injectedToPanel = _tunnelUtilsJs2['default'].tunnelEvents('tunnel:panel', function (message) {
		      port.postMessage(message);
		    });
		
		    // tunnel events from the panel to the injected script
		    var panelToInjected = function panelToInjected(message) {
		      if (message.name === 'tunnel:injected') {
		        window.postMessage(message, '*');
		      }
		    };
		
		    window.addEventListener('message', injectedToPanel);
		    port.onMessage.addListener(panelToInjected);
		
		    return function () {
		      window.removeEventListener('message', injectedToPanel);
		      port.onMessage.removeListener(panelToInjected);
		    };
		  },
		
		  /**
		   * A convenience method to connect to the background page and proxy events.
		   * Does not provide a convenient way to unregister events,
		   * as it assumes the listeners will live for the length of the application
		   * @return the port
		   */
		  initializeContent: function initializeContent(portName) {
		    var _this = this;
		
		    return this.connectToBackground(portName).then(function (port) {
		      _this.proxyEvents(port);
		      return port;
		    });
		  }
		};
		module.exports = exports['default'];
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
		
		var tabIdFromPort = function tabIdFromPort(port) {
		  return port.sender.tab.id;
		};
		
		/**
		 * Helpers for working with the Devtools background page
		 * inspired by https://developer.chrome.com/extensions/devtools#solutions
		 */
		exports['default'] = {
		  /**
		   * Create a registry object that will maintain the status of a background page
		   */
		  newRegistry: function newRegistry() {
		    return {
		      panelConnections: {},
		      contentConnections: {},
		      panelToContent: {},
		      contentToPanel: {}
		    };
		  },
		
		  /**
		   * Return a new listener function that responds to messages from the panel
		   * the message that the listener is called with determines the outcome:
		   *
		   * tunnel:injected -- forward the message to the appropriate content script
		   * register-content -- tells the background page to inject the given content script
		   */
		  newPanelListener: function newPanelListener(registry) {
		    return function (message, sendingPort) {
		      var panelId = tabIdFromPort(sendingPort);
		
		      if (message.name === 'register-content') {
		        registry.panelToContent[panelId] = message.contentTabId;
		        registry.contentToPanel[message.contentTabId] = panelId;
		        chrome.tabs.executeScript(message.contentTabId, { file: message.file });
		      } else if (message.name === 'tunnel:injected') {
		        var contentPort = registry.contentConnections[registry.panelToContent[panelId]];
		        contentPort.postMessage(message);
		      }
		    };
		  },
		
		  /**
		   * Return a new listener function that responds to messages from the content page
		   * the message that the listener is called with determines the outcome:
		   *
		   * tunnel:panel -- forward the message to the appropriate panel
		   * register -- inform the panel that the content script has been registered
		   */
		  newContentListener: function newContentListener(registry) {
		    return function (message, sendingPort) {
		      var contentId = tabIdFromPort(sendingPort);
		      var panelPort = registry.panelConnections[registry.contentToPanel[contentId]];
		      if (message.name === 'register') {
		        panelPort.postMessage({ name: 'content:registered' });
		      } else if (message.name === 'tunnel:panel') {
		        panelPort.postMessage(message);
		      }
		    };
		  },
		
		  /**
		   * Register a connection from a port, caching its connection,
		   * attacting a listener, and preparing for event teardown
		   */
		  registerConnection: function registerConnection(port, connections, idCache, listener) {
		    var id = tabIdFromPort(port);
		    connections[id] = port;
		    port.onMessage.addListener(listener);
		
		    port.onDisconnect.addListener(function () {
		      port.onMessage.removeListener(listener);
		      delete connections[id];
		      delete idCache[id];
		    });
		
		    port.postMessage({ name: 'background:connect' });
		  },
		
		  /**
		   * Handle a port connections based on port name
		   * accepts an object of type {[portName]: function (port) -> void}
		   *
		   * When a port connects, the handler registered with that port's name will be
		   * called with the port.
		   */
		  handleConnections: function handleConnections(portMap) {
		    var listener = function listener(port) {
		      var handler = portMap[port.name];
		      if (handler) {
		        handler(port);
		      }
		    };
		
		    chrome.runtime.onConnect.addListener(listener);
		    return function () {
		      chrome.runtime.onConnect.removeListener(listener);
		    };
		  },
		
		  /**
		   * A convenience method to handle connections
		   * with the default handling of panel ports and content ports
		   * sending messages back and forth
		   *
		   * Does not return an easy way of tearing down,
		   * because it is meant to last for the lifetime of the background page.
		   *
		   * However, individual port connections will be properly torn down.
		   */
		  initializeBackground: function initializeBackground(panelPortName, contentPortName) {
		    var _handlers,
		        _this = this;
		
		    var registry = this.newRegistry();
		    var panelListener = this.newPanelListener(registry);
		    var contentListener = this.newContentListener(registry);
		    var handlers = (_handlers = {}, _defineProperty(_handlers, panelPortName, function (port) {
		      _this.registerConnection(port, registry.panelConnections, registry.panelToContent, panelListener);
		    }), _defineProperty(_handlers, contentPortName, function (port) {
		      _this.registerConnection(port, registry.contentConnections, registry.contentToPanel, contentListener);
		    }), _handlers);
		    this.handleConnections(handlers);
		    return registry;
		  }
		};
		module.exports = exports['default'];
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=devtools-helpers.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=injected.js.map