// src/index.ts
import { initializeComponents, html } from "@agc-plugins/core";
import { h } from "vue";
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
initializeComponents(h, createComponent);
//# sourceMappingURL=index.mjs.map