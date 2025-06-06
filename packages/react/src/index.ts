import { initializeComponents, html } from "@agc-system/core";
import React from "react";

function createComponent<P>(
  renderFunction: (props: P) => ReturnType<typeof html>
): (props: P) => ReturnType<typeof html> {
  return (props: P) => {
    return renderFunction(props);
  };
}

initializeComponents(React.createElement, createComponent)