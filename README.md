# Agnostic Component System

Agnostic Component System is a flexible and framework-independent solution for building reusable UI components. This project aims to provide a set of tools and guidelines for creating components that can be integrated into various frontend frameworks with minimal effort.

## Packages

- [`@agc-system/core`](packages/core) – Core logic, component manager, and type definitions.
- [`@agc-system/react`](packages/react) – React integration.
- [`@agc-system/vue`](packages/vue) – Vue integration.
- [`@agc-system/static`](packages/static) – Static HTML rendering (SSR, emails, etc).
- [`@agc-system/web-components`](packages/web-components) – Preact-powered Web Components.

## Getting Started

1. Clone the repository:
  ```bash
  git clone https://github.com/medflex-gmbh/agnostic-component-system
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Start developing your components.

## Usage


## How to Build and Import a Component

### 1. Create a Component

Create a new file in your component catalog, for example `MyComponent.tsx` (or `.js`, `.ts`, etc.):

```ts
import {html, createComponent} from '@agc-system/core'

interface ButtonProps {
  text?: string,
  children?: any,
  handleClick?: any,
  [key: string]: any,
}

const Button = createComponent(({text = "Submit", handleClick, children, ...props}: ButtonProps) => { 
  return html`
  <button 
    className="px-4 py-2 font-bold rounded ${variantClass}"
    onClick="${click}" 
    ...${props}
  >
    ${children}
    ${text}
  </button>
  `;
})

export default Button;
```

### 2. Import and Use the Component
Now you can initialize the adapter and use your component in any supported environment.

React Example:

```jsx
import React from 'react';
import '@agc-system/react'
import Button from 'components/Button';

function App() {
  return <Button text='Click Me!' handleClick={() => console.log("clicked")}/>;
}
```
---
Vue Example:
```vue
<script setup>
import '@agc-plugins/vue'
</script>

<template>
  <Button text='Click Me!' :handleClick={() => console.log("clicked")}/>
</template>
```
---
Static HTML Example:
```ts
import express, { Request, Response } from 'express';
import { html } from '@agc-system/core'
import '@agc-system/static'
import components from 'components';

const { Button } = components;

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  res.send(html`<${Button} text="Click Me!" />`)
  // or
  res.send(Button({ text: "Click Me!" }))
});
```
---
### 3. Use the system as Express View Engine
Template Engine for Express:
You can use your components as a templating engine in Express by registering a custom engine with app.engine('agc.ts', async (filePath, options, callback) => { ... }). This allows you to render components directly as server-side templates, enabling dynamic HTML generation with your agnostic components. 

```ts
app.engine('agc.ts', async (filePath, options, callback) => { 
  const component = await import(filePath)
  callback(null, component.default(options))
})

```
This setup lets you use your component files as Express views, combining the flexibility of your components with the power of server-side rendering.