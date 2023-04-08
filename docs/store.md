---
sidebar_position: 2
---

# Store Reactivo

## Utilidad

Esta librería nos permitirá actualizar los objetos de dominio desde nuestra **Capa de aplicación** implementando interfaces de nuestros Domain services

## Instalación

Este store puedes instalarlo de la siguiente forma:

```bash
npm i --save @codescouts/store
```

## Dependencias

-   [**Zustand**](https://github.com/pmndrs/zustand)
-   [**React**](https://reactjs.org/)

## Actualizar nuestra UI desde una capa de aplicación

Partiremos del ejemplo que plantea el template que construimos 👇

```bash
npx create-react-app my-app --template @codescouts/clean-architecture-template
```

Partiendo de este ejemplo tenemos un caso de uso en la **Capa de aplicación** que agrega un log, y posteriormente necesitamos actualizar la UI para que el usuario vea los logs que se van agregando, ¿Cierto?.

Cuando invocamos el **execute** del caso de uso, podremos utilizar objetos de dominio, pero de vez en cuando, nos interesará actualizar tu UI.

Si inyectamos un **DomainService** utilizando nuestra librería, no solo podremos acceder a los objetos allí guardados, sino que cada vez que lo actualicemos, también lo hará la UI.

### Nuestro caso de uso

```ts showLineNumbers
import { IEventDispatcher } from "@codescouts/events";

import { Log } from "@domain/model/Log";
import { LoggerService } from "@domain/services/LoggerService";

export class TestUseCase {
    constructor(private readonly loggerService: LoggerService) {

    }

    public execute(message: string) {
        const log = new Log(message);

        this.loggerService.update(log);
    }
}
```

### Nuestro Domain Service

```ts showLineNumbers
import { Log } from "../model/Log";

export interface LoggerService {
    logs: Log[],
    save: (log: Log) => void;
}
```

### Nuestro Componente React

Veamos el siguiente componente de UI que mostrará los logs

```ts showLineNumbers
import styles from "./Logs.module.css";
import { useHomeViewModel } from "../useHomeViewModel";

export const Logs = () => {
  const { logs, test, input } = useHomeViewModel();

  return (
    <div className={styles.log}>
      <div className={styles.logContainer}>
        <input
          className={styles.text}
          type="text"
          ref={input}
          placeholder="Write log"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              test();
            }
          }}
        />
        <button className={styles.addLog} onClick={test}>
          Add Log
        </button>
      </div>
//highlight-start
      <ul>
        {logs.map((log) => (
          <li key={log.when}>{log.format()}</li>
        ))}
      </ul>
//highlight-end
    </div>
  );
};

```

:::note nota
Como puedes observar en la línea 27, estamos utilizando la instancia de la clase Log. Veamos su implementación:
:::

```ts showLineNumbers
export class Log {
    public readonly when: number;

    constructor(public readonly message: string) {
        this.when = new Date().getTime()
    }

    public format() {
        return `${this.message} - ${new Date(this.when).toDateString()}`;
    }
}
```

Si recordamos lo que plantea esta arquitectura aquí [**Clean architecture**](./clean-architecture), veremos que utilizamos un **ViewModel** como componente que desacopla la UI de su comportamiento. Y será algo así 👇

```ts showLineNumbers
import { useCallback, useRef } from "react";

import { TestUseCase } from "@application/test-use-case";
import { useLogger } from "@infrastructure/services";

export const useHomeViewModel = () => {
    const input = useRef<HTMLInputElement>(null);
    //highlight-start
    const loggerService = useLogger();
    const testUseCase = new TestUseCase(loggerService);
    //highlight-end

    const test = useCallback(() => {
        if (!input.current!.value) return;

        testUseCase.execute(input.current!.value);
    }, [testUseCase])

    return { logs, test, input }
}
```

Ahora, y como implementaríamos el **useLogger** como implementación de nuestro **DomainService**, veamoslo 👇

### Implementación de Domain Service

```ts showLineNumbers
import { create } from "@codescouts/store";

import { Log } from "@domain/model";
import { LoggerService } from "@domain/services";

export const useLogger = create<LoggerService>((set) => ({
    logs: [],
    save: (log: Log) => set((state) => ({ logs: [...state.logs, log] }))
})).withPersist(Log)
   .build();
```

Como vemos aquí, este store, recibe en su **Generic** el objeto que quieres implementar, y al construirlo recibe un setter, este mismo permitirá actualizar el objeto.

## Persistir el store

Nuestra librería soporta el guardado y la restauración de los objetos de dominio incluso cuando el usuario refresca el navegador.

Para ello, lo que tienes que hacer es utilizar el método **withPersist** y pasarle como argumento la referencia de tu objeto.

Si deseas guardar tus objetos en **localstorage** para restaurar los objetos, debes invocar la funcion withPersist, y como argumento referenciar tu clase.

```ts showLineNumbers
export const useLogger = create<LoggerService>((set) => ({
    logs: [],
    save: (log: Log) => set((state) => ({ logs: [...state.logs, log] }))
}))
//highlight-start
   .withPersist(Log)
//highlight-end
   .build();
```

:::note nota
Nuestro store se encargará de instanciar nuevamente la clase y todas sus relaciones, para que puedas disponer de todo su comportamiento nuevamente.
:::

### Restaurar el estado

```ts showLineNumbers
class Foo {
  inner: Bar;

  public constructor(){
    this.inner = new Bar()
  }

  foo() {

  }
}
```

Nuestro **store** es capaz de no solo restaurar la instancia de la clase **Foo** sino también restaurará la instancia de la clase **Bar**.

Al finalizar debes ejecutar el build, para que cree el estado según tu configuración.

Tambien tienes disponible este store para Svelte, mantiene tambien la misma api.

```bash
npm i --save @codescouts/svelte-store
```

## Instanciar el caso de uso con Inyección de Dependencias

Puedes ver la documentación aquí: [**¿Cómo inyectar las dependencias?**](./dependency-injection)

Una vez que configures el inyector de dependencias, será así

```ts showLineNumbers
import { useCallback, useRef } from "react";
import { useResolve } from "@codescouts/ui";

import { TestUseCase } from "@application/test-use-case";
import { useLogger } from "@infrastructure/services";

export const useHomeViewModel = () => {
    const input = useRef<HTMLInputElement>(null);
    const { logs } = useLogger();
    //highlight-start
    const testUseCase = useResolve(TestUseCase);
    //highlight-end

    const test = useCallback(() => {
        if (!input.current!.value) return;

        testUseCase.execute(input.current!.value);

        input.current!.value = "";
        input.current!.focus();
    }, [testUseCase])

    return { logs, test, input }
}
```
