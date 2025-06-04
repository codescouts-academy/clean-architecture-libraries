---
sidebar_position: 4
---

# Dependency injection

## Utility

This library allows you to set up a dependency injection container.

### Installation

```bash
npm i --save @codescouts/di
```

## Dependencies

- [**ts-injecty**](https://github.com/damianpumar/ts-injecty)
- [**React**](https://github.com/facebook/react)

If you want to implement this library without React, you can use 👇

```bash
npm i ts-injecty --save
```

### React Implementation

You will need to wrap your components with the **HOC** **DependencyInjectionContainer**, and in this way, the container will be available whenever you need it by using the **useResolve** hook.

```ts showLineNumbers
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEvents } from "@codescouts/ui";
import { DependencyInjectionContainer } from "@codescouts/di";

import { NewLogRegisteredHandler } from "@domain/events";

import { Header } from "@ui/components";
import { Home } from "@ui/pages";

import { buildDependencies } from "./di";

const App = () => {
  useEvents(() => {
    new NewLogRegisteredHandler();
  });

  return (
    // highlight-start
    <DependencyInjectionContainer builder={buildDependencies}>
      // highlight-end
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DependencyInjectionContainer>
  );
};

export default App;
```

Your **buildDependencies** function can look like this:

```ts showLineNumbers
import { register } from "ts-injecty";
import { useEventDispatcher } from "@codescouts/ui";

import { TestUseCase } from "./application/test-use-case";
import { useLogger } from "./infrastructure/services/LoggerService";

export const buildDependencies = (builder: typeof register) => {
  return [
    builder(useLogger.name)
      .withDynamicValue(() => useLogger())
      .build(),
    builder(useEventDispatcher.name)
      .withDynamicValue(() => useEventDispatcher())
      .build(),
    builder(TestUseCase)
      .withDependency(useLogger.name)
      .and(useEventDispatcher.name)
      .build(),
  ];
};
```

And now, whenever you need to resolve, for example, the **TestUseCase**, you do it like this:

```ts showLineNumbers
import { useResolve } from "@codescouts/ui";

import { TestUseCase } from "@application/test-use-case";

export const Foo = () => {
  const testUseCase = useResolve(TestUseCase);
};
```
