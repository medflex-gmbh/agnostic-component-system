# Agnostic Component System

Agnostic Component System is a flexible and framework-independent solution for building reusable UI components. This project aims to provide a set of tools and guidelines for creating components that can be integrated into various frontend frameworks with minimal effort.

## Features

- **Framework Agnostic:** Use components across different frontend frameworks.
- **Reusable:** Build once, use close to everywhere.
- **Customizable:** Easily extend and modify components to fit your needs.
- **Well-documented:** Clear guidelines and examples.

## Packages

- [`@agc-system/core`](packages/core) – Core logic, component manager, and type definitions.
- [`@agc-system/react`](packages/react) – React integration.
- [`@agc-system/vue`](packages/vue) – Vue integration.
- [`@agc-system/static`](packages/static) – Static HTML rendering (SSR, emails, etc).
- [`@agc-system/web-components`](packages/web-components) – Preact-powered Web Components.

## Getting Started

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/agnostic-component-system.git
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

```js
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



Vue Example:
````vue

<script setup>
import '@agc-plugins/vue'
</script>

<template>
  <Button text='Click Me!' :handleClick={() => console.log("clicked")}/>
</template>
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.
