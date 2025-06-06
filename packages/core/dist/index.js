"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createComponent: () => createComponent,
  html: () => html,
  initializeComponents: () => initializeComponents
});
module.exports = __toCommonJS(index_exports);

// src/utils/componentManager.ts
var import_htm = __toESM(require("htm"));
var ComponentManager = /* @__PURE__ */ (() => {
  let instance = null;
  let createComponentFn = null;
  return {
    initialize(customH, customCreateComponentFn) {
      if (!instance && !createComponentFn) {
        instance = import_htm.default.bind(customH);
        createComponentFn = customCreateComponentFn;
      } else {
        console.warn("HtmlSingleton is already initialized. Returning the existing instance.");
      }
      return instance;
    },
    getHtml() {
      if (!instance) {
        throw new Error("h function is not set. Please initialize it first.");
      }
      return instance;
    },
    getCreateComponent() {
      if (!createComponentFn) {
        throw new Error("createComponent function is not set. Please initialize it first.");
      }
      return createComponentFn;
    }
  };
})();
var html = (...args) => {
  const instance = ComponentManager.getHtml();
  return instance(...args);
};
var createComponent = (renderFunction, sheet) => {
  const createComponentFn = ComponentManager.getCreateComponent();
  return createComponentFn(renderFunction, sheet);
};
var initializeComponents = ComponentManager.initialize;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createComponent,
  html,
  initializeComponents
});
//# sourceMappingURL=index.js.map