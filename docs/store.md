---
sidebar_position: 2
---

# Store Reactivo

Este store puedes instalarlo de la siguiente forma:

```bash
npm i --save @codescouts/ui
```

Este paquete depende de [**Zustand**](https://github.com/pmndrs/zustand)

## Actualizar nuestra UI desde una capa de aplicación

Esta librería nos permitirá actualizar tus objetos de dominio que serán populados a la UI para mantener la reactividad en tu aplicación.

Si tienes un caso de uso en tu capa de aplicación, que agrega un log en la UI, y quieres mostrar el nuevo elemento en la UI una vez lo agregues.

Cuando invocas el **execute** de tu caso de uso, podrás utilizar tus objetos de dominio, pero de vez en cuando, deberás actualizar tu UI.
Si inyectas tu **DomainService** utilizando nuestra librería, no solo podrás acceder a tus objetos allí guardados, sino que cada vez que lo actualices, actualizarás también la UI.

### Veamos el caso de uso

```ts
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

### El Domain Service

```ts
import { Log } from "../model/Log";

export interface LoggerService {
    logs: Log[],
    save: (log: Log) => void;
}
```

### Veamos la implementación desde la UI

Veamos el siguiente componente de UI que mostrará los logs

```ts
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

Si recordamos lo que plantea esta arquitectura aquí [**Clean architecture**](./clean-architecture), veremos que utilizamos un **ViewModel** como componente que desacopla la UI de su comportamiento. Y será algo así 👇

```ts
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

### Implementación de nuestro Store Reactivo

```ts
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

#### Persistir el store

Si deseas guardar tus objetos en **localstorage** para restaurar los objetos, debes simplemente antes de ejecutar el build, debes enviar como parámetro la clase que quieres restaurar.

NOTA: Nuestro store se encargará de instanciar nuevamente la clase, para que puedas disponer de todo su comportamiento nuevamente.

Al finalizar debes ejecutar el build, para que cree el estado según tu configuración.

## Instanciar el caso de uso con Inyección de Dependencias

Puedes ver la documentación aquí: [**¿Cómo inyectar las dependencias?**](./dependency-injection)

Una vez que configures el inyector de dependencias, será así

```ts
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
