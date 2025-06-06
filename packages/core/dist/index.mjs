// src/utils/componentManager.ts
import htm from "htm";
var ComponentManager = /* @__PURE__ */ (() => {
  let instance = null;
  let createComponentFn = null;
  return {
    initialize(customH, customCreateComponentFn) {
      if (!instance && !createComponentFn) {
        instance = htm.bind(customH);
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
export {
  createComponent,
  html,
  initializeComponents
};
//# sourceMappingURL=index.mjs.map