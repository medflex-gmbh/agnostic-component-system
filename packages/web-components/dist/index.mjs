// src/index.ts
import { initializeComponents } from "@agc-system/core";
import { h as h2 } from "preact";

// src/utils/register.js
import { h, cloneElement, render, hydrate } from "preact";
function register(Component, tagName, propNames, options) {
  console.log("register options: ", options);
  function PreactElement() {
    const inst = (
      /** @type {PreactCustomElement} */
      Reflect.construct(HTMLElement, [], PreactElement)
    );
    inst._vdomComponent = Component;
    inst._root = options && options.shadow ? inst.attachShadow({ mode: options.mode || "open" }) : inst;
    console.log("register", options.styles);
    console.log("register shadow", inst._root instanceof ShadowRoot);
    if (options.styles && inst._root instanceof ShadowRoot) {
      inst._root.adoptedStyleSheets = [options.styles];
    }
    return inst;
  }
  PreactElement.prototype = Object.create(HTMLElement.prototype);
  PreactElement.prototype.constructor = PreactElement;
  PreactElement.prototype.connectedCallback = connectedCallback;
  PreactElement.prototype.attributeChangedCallback = attributeChangedCallback;
  PreactElement.prototype.disconnectedCallback = disconnectedCallback;
  propNames = propNames || Component.observedAttributes || Object.keys(Component.propTypes || {});
  PreactElement.observedAttributes = propNames;
  propNames.forEach((name) => {
    Object.defineProperty(PreactElement.prototype, name, {
      get() {
        return this._vdom.props[name];
      },
      set(v) {
        if (this._vdom) {
          this.attributeChangedCallback(name, null, v);
        } else {
          if (!this._props) this._props = {};
          this._props[name] = v;
          this.connectedCallback();
        }
        const type = typeof v;
        if (v == null || type === "string" || type === "boolean" || type === "number") {
          this.setAttribute(name, v);
        }
      }
    });
  });
  return customElements.define(
    tagName || Component.tagName || Component.displayName || Component.name,
    PreactElement
  );
}
function ContextProvider(props) {
  this.getChildContext = () => props.context;
  const { context, children, ...rest } = props;
  return cloneElement(children, rest);
}
function connectedCallback() {
  const event = new CustomEvent("_preact", {
    detail: {},
    bubbles: true,
    cancelable: true
  });
  this.dispatchEvent(event);
  const context = event.detail.context;
  this._vdom = h(
    ContextProvider,
    { ...this._props, context },
    toVdom(this, this._vdomComponent)
  );
  (this.hasAttribute("hydrate") ? hydrate : render)(this._vdom, this._root);
}
function toCamelCase(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : "");
}
function attributeChangedCallback(name, oldValue, newValue) {
  if (!this._vdom) return;
  newValue = newValue == null ? void 0 : newValue;
  const props = {};
  props[name] = newValue;
  props[toCamelCase(name)] = newValue;
  this._vdom = cloneElement(this._vdom, props);
  render(this._vdom, this._root);
}
function disconnectedCallback() {
  render(this._vdom = null, this._root);
}
function Slot(props, context) {
  const ref = (r) => {
    if (!r) {
      this.ref.removeEventListener("_preact", this._listener);
    } else {
      this.ref = r;
      if (!this._listener) {
        this._listener = (event) => {
          event.stopPropagation();
          event.detail.context = context;
        };
        r.addEventListener("_preact", this._listener);
      }
    }
  };
  return h("slot", { ...props, ref });
}
function toVdom(element, nodeName) {
  if (element.nodeType === 3) return element.data;
  if (element.nodeType !== 1) return null;
  let children = [], props = {}, i = 0, a = element.attributes, cn = element.childNodes;
  for (i = a.length; i--; ) {
    if (a[i].name !== "slot") {
      props[a[i].name] = a[i].value;
      props[toCamelCase(a[i].name)] = a[i].value;
    }
  }
  for (i = cn.length; i--; ) {
    const vnode = toVdom(cn[i], null);
    const name = cn[i].slot;
    if (name) {
      props[name] = h(Slot, { name }, vnode);
    } else {
      children[i] = vnode;
    }
  }
  const wrappedChildren = nodeName ? h(Slot, null, children) : children;
  return h(nodeName || element.nodeName.toLowerCase(), props, wrappedChildren);
}

// src/index.ts
function extractKeysFromFunctionArgs(functionString) {
  const regex = /\(\{\s*([^}]*)\s*\}\)/;
  const match = functionString.match(regex);
  if (match) {
    const destructuredContent = match[1];
    const keys = destructuredContent.split(",").map((key) => key.trim().split("=")[0].trim()).filter((key) => key && !key.startsWith("...") && key !== "children");
    return keys;
  }
  return [];
}
function createComponent(renderFunction, sheet) {
  return (props) => {
    if (typeof window !== "undefined" && typeof customElements !== "undefined") {
      const observedAttributes = extractKeysFromFunctionArgs(renderFunction.toString());
      console.log(renderFunction);
      const { type } = renderFunction({});
      const tagName = "agc-" + type;
      if (!customElements.get(tagName)) {
        register(renderFunction, tagName, observedAttributes, { shadow: true, styles: sheet });
      }
    }
    return renderFunction(props);
  };
}
initializeComponents(h2, createComponent);
//# sourceMappingURL=index.mjs.map