"use strict";

// src/index.ts
var import_core = require("@agc-plugins/core");
var import_vue = require("vue");
function kebabToCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}
function createComponent(renderFunction) {
  return (props, context) => {
    let { children } = props;
    const { slots } = context || {};
    if (slots && slots.default) {
      children = [children, ...slots.default()].flat().filter((child) => child !== void 0 && child !== null);
    }
    console.log("children: ", children);
    console.log("props: ", props);
    const transformedProps = Object.fromEntries(
      Object.entries(props).map(([key, value]) => [kebabToCamelCase(key), value])
    );
    const mergedProps = { ...transformedProps };
    if (children && children.length > 0) {
      mergedProps.children = children;
    }
    return renderFunction(mergedProps);
  };
}
(0, import_core.initializeComponents)(import_vue.h, createComponent);
//# sourceMappingURL=index.js.map