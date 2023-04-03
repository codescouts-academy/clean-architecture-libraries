---
sidebar_position: 3
---

# Dependency injection

Esta arquitectura tiene su propio contenedor de inyección de dependencias, para ello debes instalar el paquete 👇

### Instalación

```bash
npm i --save @codescouts/ui
```

Este paquete depende de un paquete llamado [**ts-injecty**](https://github.com/damianpumar/ts-injecty) creado por **Damián Pumar** a partir de un fork de **rsdi**

### Implementación en React

Tendrás que envolver tus componentes con el **HOC** **DependencyInjectionContainer** y de esta manera el contenedor estará a tu disposición cuando lo necesitas utilizando el hook **useResolve**

```ts
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEvents, DependencyInjectionContainer } from "@codescouts/ui";

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

Tu función **buildDependencies** puede ser algo así

```ts
import { register } from "ts-injecty";
import { useEventDispatcher } from "@codescouts/ui";

import { TestUseCase } from "./application/test-use-case";
import { useLogger } from "./infrastructure/services/LoggerService";

export const buildDependencies = (builder: typeof register) => {
    return [
        builder(useLogger.name).withDynamicValue(() => useLogger()).build(),
        builder(useEventDispatcher.name).withDynamicValue(() => useEventDispatcher()).build(),
        builder(TestUseCase).withDependency(useLogger.name).and(useEventDispatcher.name).build(),
    ];
}
```

y Ahora cuando necesites resolver por ejemplo el caso de uso **TestUseCase** debes hacerlo así

```ts
import { useResolve } from "@codescouts/ui";

import { TestUseCase } from "@application/test-use-case";

export const Foo = ()=> {
  const testUseCase = useResolve(TestUseCase);
}
```
