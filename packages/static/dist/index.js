"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../../node_modules/vhtml/dist/vhtml.js
var require_vhtml = __commonJS({
  "../../../node_modules/vhtml/dist/vhtml.js"(exports2, module2) {
    "use strict";
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.vhtml = factory();
    })(exports2, function() {
      "use strict";
      var emptyTags = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
      var esc = function esc2(str) {
        return String(str).replace(/[&<>"']/g, function(s) {
          return "&" + map[s] + ";";
        });
      };
      var map = { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "apos" };
      var setInnerHTMLAttr = "dangerouslySetInnerHTML";
      var DOMAttributeNames = {
        className: "class",
        htmlFor: "for"
      };
      var sanitized = {};
      function h(name, attrs) {
        var stack = [], s = "";
        attrs = attrs || {};
        for (var i = arguments.length; i-- > 2; ) {
          stack.push(arguments[i]);
        }
        if (typeof name === "function") {
          attrs.children = stack.reverse();
          return name(attrs);
        }
        if (name) {
          s += "<" + name;
          if (attrs) for (var _i in attrs) {
            if (attrs[_i] !== false && attrs[_i] != null && _i !== setInnerHTMLAttr) {
              s += " " + (DOMAttributeNames[_i] ? DOMAttributeNames[_i] : esc(_i)) + '="' + esc(attrs[_i]) + '"';
            }
          }
          s += ">";
        }
        if (emptyTags.indexOf(name) === -1) {
          if (attrs[setInnerHTMLAttr]) {
            s += attrs[setInnerHTMLAttr].__html;
          } else while (stack.length) {
            var child = stack.pop();
            if (child) {
              if (child.pop) {
                for (var _i2 = child.length; _i2--; ) {
                  stack.push(child[_i2]);
                }
              } else {
                s += sanitized[child] === true ? child : esc(child);
              }
            }
          }
          s += name ? "</" + name + ">" : "";
        }
        sanitized[s] = true;
        return s;
      }
      return h;
    });
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  renderModule: () => renderModule
});
module.exports = __toCommonJS(index_exports);
var import_core = require("@agc-system/core");
var import_vhtml = __toESM(require_vhtml());
function createComponent(renderFunction) {
  return (props) => {
    return renderFunction(props);
  };
}
(0, import_core.initializeComponents)(import_vhtml.default, createComponent);
var renderModule = ({ component, children = "", ...props }) => {
  return import_core.html`<${component} ...${props}>${children}<//>`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderModule
});
//# sourceMappingURL=index.js.map