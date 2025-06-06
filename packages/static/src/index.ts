import { initializeComponents, html } from "@agc-system/core";
import vhtml from 'vhtml'


interface RenderType {
  component: any
  children?: any,
  [key: string]: any,
}

function createComponent<P>(
  renderFunction: (props: P) => ReturnType<typeof html>
): (props: P) => ReturnType<typeof html> {
  return (props: P) => {
    return renderFunction(props);
  };
}

initializeComponents(vhtml, createComponent)


export const renderModule = ({component, children = '', ...props}: RenderType) => {
  return html`<${component} ...${props}>${children}<//>`
}