import { initializeComponents, html } from "@agc-system/core";
import { h } from "preact";
import register from "./utils/register";


function extractKeysFromFunctionArgs(functionString: string): string[] {
  const regex = /\(\{\s*([^}]*)\s*\}\)/;

  const match = functionString.match(regex);

  if (match) {
    const destructuredContent = match[1]; 

    const keys = destructuredContent
      .split(",") 
      .map((key) => key.trim().split("=")[0].trim()) 
      .filter((key) => key && !key.startsWith("...") && key !== "children"); 

    return keys;
  }

  return [];
}



function createComponent<P>(
  renderFunction: (props: P) => ReturnType<typeof html>,
  sheet?: any
): (props: P) => ReturnType<typeof html> {
  return (props: P) => {


  if (typeof window !== "undefined" && typeof customElements !== "undefined") {

    const observedAttributes = extractKeysFromFunctionArgs(renderFunction.toString())
    console.log(renderFunction)
    const {type }= renderFunction({} as P)
    const tagName = "agc-" + type


      if (!customElements.get(tagName)) {
    register(renderFunction, tagName, observedAttributes, { shadow: true, styles: sheet });
      }
  }

  return renderFunction(props)

  };
}


initializeComponents(h, createComponent)
