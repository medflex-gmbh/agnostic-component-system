import htm from "htm";

export type CreateComponentFnType = <P>(
  renderFunction: (props: P) => ReturnType<typeof html>,
  sheet?: any
) => (props: P) => ReturnType<typeof html>;

const ComponentManager = (() => {
  let instance: ((strings: TemplateStringsArray, ...values: any[]) => any) | null = null;
  let createComponentFn: CreateComponentFnType | null = null;

  return {
    initialize(customH: any, customCreateComponentFn: CreateComponentFnType) {
      if (!instance && !createComponentFn) {
        instance = htm.bind(customH); // Bind `htm` to the provided `h` function
        createComponentFn = customCreateComponentFn
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

export const html = (...args: Parameters<ReturnType<typeof ComponentManager.getHtml>>) => {
  const instance = ComponentManager.getHtml();
  return instance(...args);
};

export const createComponent = <P, R>(
  renderFunction: (props: P) => ReturnType<typeof html>,
  sheet?: any
): (props: P) => ReturnType<typeof html> => {
  const createComponentFn = ComponentManager.getCreateComponent();
  return createComponentFn(renderFunction, sheet);
};

export const initializeComponents = ComponentManager.initialize;
