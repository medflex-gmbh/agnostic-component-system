import { initializeComponents, html } from "@agc-system/core";
import { h } from 'vue'


function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function createComponent<P>(
  renderFunction: (props: P) => ReturnType<typeof html>
): (props: P, context?: { slots?: Record<string, () => any> }) => ReturnType<typeof html> {
  return (props: P, context: any) => {
    let { children } = props as { children?: any }; 
    const { slots } = context || {};

    if (slots && slots.default) {
      children = [children, ...slots.default()]
        .flat()
        .filter((child) => child !== undefined && child !== null);
    }

    const transformedProps = Object.fromEntries(
      Object.entries(props as Record<string, any>).map(([key, value]) => [kebabToCamelCase(key), value])
    ) as P; 

    const mergedProps = { ...transformedProps };
    if (children && children.length > 0) {
      (mergedProps as any).children = children;
    }
    return renderFunction(mergedProps as P);
  };
}

initializeComponents(h, createComponent)
