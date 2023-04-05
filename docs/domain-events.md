---
sidebar_position: 3
---

# Domain events

## Utilidad

Para poder utilizar eventos de dominio en esta arquitectura debes instalar nuestro paquete que permitirá hacer **dispatch** de los eventos que vayan ocurriendo en la aplicación.
El uso de eventos de dominio es una excelente estrategia para desacoplar acciones que deben ejecutarse ante un determinado evento en nuestra aplicación.

### Instalación

```bash
npm i --save @codescouts/events
```

## Dependencias

-   No tiene

Ahora lo que deberás hacer es inyectarlo como dependencia en tus casos de uso para poder hacer el **dispatch** cuando lo deseeas

### Ejemplo de dispatch

```ts showLineNumbers
import { IEventDispatcher } from "@codescouts/events";

import { Log } from "@domain/model/Log";
import { NewLogRegistered } from "@domain/events/NewLogRegistered";

export class TestUseCase {
    constructor(private readonly dispatcher: IEventDispatcher) {

    }

    public execute(message: string) {
        const log = new Log(message);

        this.dispatcher.dispatch(new NewLogRegistered(log));
    }
}
```

La dependencia de esta **interface** dependerá de la aplicación que utilices.
Pero si hablamos concretamente de **React** podrás utilizar nuestro paquete de UI, que tiene una implementación utilizando Hooks que te permitirá usarlos.

### Ejemplo del evento

```ts showLineNumbers
import { DomainEvent } from "@codescouts/events";
import { Log } from "../model/Log";

export class NewLogRegistered extends DomainEvent {
  constructor(public readonly log: Log) {
    super();
  }
}
```

### Ejemplo del handler

```ts showLineNumbers
import { Handler } from "@codescouts/events";
import { NewLogRegistered } from "./NewLogRegistered";

export class NewLogRegisteredHandler extends Handler<NewLogRegistered> {
  public constructor() {
    super(NewLogRegistered);
  }

  protected handle(event: NewLogRegistered): void | Promise<any> {
    const message = `New log registered ${event.log.format()}`;

    setTimeout(() => {
      alert(message);
    }, 1000);
  }
}

```

### Implementación en React

Primero debes instalar nuestro paquete de UI que tiene la implementación necesaria para que puedas instanciar tu caso de uso con el **IEventDispatcher**

```bash
npm i --save @codescouts/ui
```

Puedes instanciar a mano tu caso de uso de esta manera, aunque también puedes utilizar inyección de dependencias si así lo deseas [**Dependency injection**](./dependency-injection)

```ts showLineNumbers
export const Foo = ()=> {
    const dispatcher = useEventDispatcher();
    const useCase = new TestUseCase(dispatcher);

    useCase.execute("Test");

    return <>Hi</>
}
```

Aún no terminamos, ya que en tu aplicación React tendrás que ejecutar el hook de **useEvents** así 👇 para que tu aplicación registre los **Handlers** del los **DomainEvents** que tienes.

```ts showLineNumbers
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEvents, DependencyInjectionContainer } from "@codescouts/ui";

import { NewLogRegisteredHandler } from "@domain/events";

import { Header } from "@ui/components";
import { Home } from "@ui/pages";

const App = () => {
// highlight-start
  useEvents(() => {
    new NewLogRegisteredHandler();
  });
// highlight-end

  return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
};

export default App;
```

Lo único que tienes que hacer es instanciar el tu **Handler** dentro del **useEvents**

No hace falta aclarar, pero lógicamente aquí es donde registrarás todos tus handlers, incluso te recomendamos que puedas generarte una función que registre todos los handlers, y aquí referenciarla.

NOTA: Si necesitas pasarle al handler la implementación de un hook, primer debes ejecutar el hook **fuera** del useEvents y pasarle la referencia

```ts showLineNumbers
export const Foo = ()=> {
    useEvents(()=> {
        new YourHandler(useBar()) ❌
    })


// highlight-start
    const bar = useBar();

    useEvents(()=> {
        new YourHandler(bar) ✅
    })
// highlight-end
}
```
