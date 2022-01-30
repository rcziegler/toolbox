// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../inputHandler/src/types.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyCode = void 0;
/** */

var KeyCode;

(function (KeyCode) {
  KeyCode["KeyArrowDown"] = "ArrowDown";
  KeyCode["KeyArrowLeft"] = "ArrowLeft";
  KeyCode["KeyArrowRight"] = "ArrowRight";
  KeyCode["KeyArrorUp"] = "ArrowUp";
  KeyCode["KeyA"] = "KeyA";
  KeyCode["KeyD"] = "KeyD";
  KeyCode["KeyS"] = "KeyS";
  KeyCode["KeyW"] = "KeyW";
})(KeyCode = exports.KeyCode || (exports.KeyCode = {}));
},{}],"../inputHandler/src/inputHandler.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var types_1 = require("./types");
/** */


var scale = 1;
/** */

var userInputs = [];
/** */

var userInputsDebug = false;
/** */

var debug = function debug() {
  console.log(userInputs);
};
/** */


var addInput = function addInput(event) {
  if (!userInputs.includes(event.code)) {
    userInputs.push(event.code);
  }

  userInputsDebug ? debug() : null;
};
/** */


var deleteInput = function deleteInput(event) {
  if (userInputs.includes(event.code)) {
    userInputs.splice(userInputs.indexOf(event.code), 1);
  }

  userInputsDebug ? debug() : null;
};
/** */


document.addEventListener('keypress', function (event) {});
/** */

document.addEventListener('keydown', function (event) {
  addInput(event);
});
/** */

document.addEventListener('keyup', function (event) {
  deleteInput(event);
});
/** */

document.addEventListener('wheel', function (event) {
  //event.preventDefault();
  var deltaY = event.deltaY;

  if (deltaY > 0) {
    // Zoom in
    scale += 0.01;
  } else {
    // Zoom out
    scale -= 0.01;
  }

  console.log("> zoom level " + scale);
});
/** */

var inputHandler = {
  /** */
  enableDebug: function enableDebug() {
    userInputsDebug = true;
  },

  /** */
  getUserInputs: function getUserInputs() {
    return userInputs;
  },

  /** */
  KeyCode: types_1.KeyCode,

  /** */
  getScale: function getScale() {
    return scale;
  }
};
exports.default = inputHandler;
},{"./types":"../inputHandler/src/types.ts"}],"src/hexogonWorld.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var inputHandler_1 = __importDefault(require("../../inputHandler/src/inputHandler"));

var VIEWBOX_HEIGHT = 100;
var VIEWBOX_WIDTH = 100;
var WORLD_HEIGHT = 400;
var WORLD_WIDTH = 800;
var count = 0;
var speed = 4;
var xPos = 10;
var yPos = 10;
/** */

var hexogonWorld = {
  /** */
  render: function render(world) {
    console.log('> draw world');
    /** */

    var userInput = inputHandler_1.default.getUserInputs();
    var zoomScale = inputHandler_1.default.getScale(); /// Handle user pressing "up"

    if (userInput.includes(inputHandler_1.default.KeyCode.KeyArrorUp) || userInput.includes(inputHandler_1.default.KeyCode.KeyW)) {
      console.log('up');
      yPos -= speed;
    } // Handle user pressing "down"


    if (userInput.includes(inputHandler_1.default.KeyCode.KeyArrowDown) || userInput.includes(inputHandler_1.default.KeyCode.KeyS)) {
      console.log('down');
      yPos += speed;
    } // Handle user pressing "left"


    if (userInput.includes(inputHandler_1.default.KeyCode.KeyArrowLeft) || userInput.includes(inputHandler_1.default.KeyCode.KeyA)) {
      console.log('left');
      xPos -= speed;
    } // Handle user pressing "right"


    if (userInput.includes(inputHandler_1.default.KeyCode.KeyArrowRight) || userInput.includes(inputHandler_1.default.KeyCode.KeyD)) {
      console.log('right');
      xPos += speed;
    }

    var x = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    x.setAttribute("height", WORLD_HEIGHT.toString());
    x.setAttribute("style", "border: 1px solid black");
    console.log("> zoomScale ".concat(scale));
    var currHeight = WORLD_HEIGHT * inputHandler_1.default.zoomScale;
    var currWidth = WORLD_WIDTH * inputHandler_1.default.zoomScale;
    x.setAttribute("viewBox", "0 0 ".concat(currHeight.toString(), " ").concat(currWidth.toString()));
    x.setAttribute("width", WORLD_WIDTH.toString());
    circle.setAttributeNS(null, 'cx', xPos.toString());
    circle.setAttributeNS(null, 'cy', yPos.toString());
    circle.setAttributeNS(null, 'r', "5");
    circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;'); //world.innerHTML = (count++).toString();

    world.innerHTML = "";
    x.appendChild(circle);
    world.appendChild(x);
  }
};
exports.default = hexogonWorld;
},{"../../inputHandler/src/inputHandler":"../inputHandler/src/inputHandler.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** */

var hexogonWorld_1 = __importDefault(require("./src/hexogonWorld")); //inputHandler.enableDebug();


var FPS = 30;
var MS_PER_SECOND = 1000;
var INTERVAL = MS_PER_SECOND / FPS;
var world = document.getElementById('divWorld');
var now;
var then = Date.now();
var delta;
/** */

var render = function render() {
  window.requestAnimationFrame(render);
  /** */

  now = Date.now();
  delta = now - then;

  if (delta > INTERVAL) {
    then = now - delta % INTERVAL;
    hexogonWorld_1.default.render(world);
  }
};

render();
},{"./src/hexogonWorld":"src/hexogonWorld.ts"}],"../../.nvm/versions/node/v14.17.5/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37179" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v14.17.5/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/hexogonWorld.77de5100.js.map