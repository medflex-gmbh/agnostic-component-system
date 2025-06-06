interface RenderType {
    component: any;
    children?: any;
    [key: string]: any;
}
declare const renderModule: ({ component, children, ...props }: RenderType) => any;

export { renderModule };
