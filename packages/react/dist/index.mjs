// src/index.ts
import { initializeComponents } from "@agc-system/core";
import React from "react";
function createComponent(renderFunction) {
  return (props) => {
    return renderFunction(props);
  };
}
initializeComponents(React.createElement, createComponent);
//# sourceMappingURL=index.mjs.map