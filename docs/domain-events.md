---
sidebar_position: 3
---

# Domain events

## Utility

To use domain events in this architecture, you must install our package that will allow you to **dispatch** the events occurring in the application.
Using domain events is an excellent strategy to decouple actions that must be executed in response to a specific event in our application.

### Installation

```bash
npm i --save @codescouts/events
```

## Dependencies

- None

Now, you should inject it as a dependency in your use cases to be able to **dispatch** whenever you want.

### Dispatch example

```ts showLineNumbers
import { IEventDispatcher } from "@codescouts/events";

import { Log } from "@domain/model/Log";
import { NewLogRegistered } from "@domain/events/NewLogRegistered";

export class TestUseCase {
  constructor(private readonly dispatcher: IEventDispatcher) {}

  public execute(message: string) {
    const log = new Log(message);

    this.dispatcher.dispatch(new NewLogRegistered(log));
  }
}
```

The implementation of this **interface** depends on the application you use.
Specifically, if you use **React**, you can use our UI package, which has an implementation using Hooks that will allow you to use them.

### Event example

```ts showLineNumbers
import { DomainEvent } from "@codescouts/events";
import { Log } from "../model/Log";

export class NewLogRegistered extends DomainEvent {
  constructor(public readonly log: Log) {
    super();
  }
}
```

### Handler example

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

### React Implementation

First, you must install our UI package which has the necessary implementation so you can instantiate your use case with the **IEventDispatcher**

```bash
npm i --save @codescouts/ui
```

You can manually instantiate your use case like this, although you can also use dependency injection if you prefer [**Dependency injection**](./dependency-injection)

```ts showLineNumbers
export const Foo = () => {
  const dispatcher = useEventDispatcher();
  const useCase = new TestUseCase(dispatcher);

  useCase.execute("Test");

  return <>Hi</>;
};
```

We’re not done yet, because in your React application you will need to execute the **useEvents** hook like this 👇 so your app registers the **Handlers** for the **DomainEvents** you have.

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

All you need to do is instantiate your **Handler** inside the **useEvents**

It goes without saying, but logically this is where you will register all your handlers, and we even recommend you create a function to register all handlers, and then reference it here.

:::note note
If you need to pass an implementation of a hook to the handler, you must first execute the hook **outside** of useEvents and pass its reference
:::

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
