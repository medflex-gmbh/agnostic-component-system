type CreateComponentFnType = <P>(renderFunction: (props: P) => ReturnType<typeof html>, sheet?: any) => (props: P) => ReturnType<typeof html>;
declare const ComponentManager: {
    initialize(customH: any, customCreateComponentFn: CreateComponentFnType): ((strings: TemplateStringsArray, ...values: any[]) => any) | null;
    getHtml(): (strings: TemplateStringsArray, ...values: any[]) => any;
    getCreateComponent(): CreateComponentFnType;
};
declare const html: (...args: Parameters<ReturnType<typeof ComponentManager.getHtml>>) => any;
declare const createComponent: <P, R>(renderFunction: (props: P) => ReturnType<typeof html>, sheet?: any) => (props: P) => ReturnType<typeof html>;
declare const initializeComponents: (customH: any, customCreateComponentFn: CreateComponentFnType) => ((strings: TemplateStringsArray, ...values: any[]) => any) | null;

export { type CreateComponentFnType, createComponent, html, initializeComponents };
