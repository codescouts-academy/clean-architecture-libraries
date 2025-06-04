---
sidebar_position: 2
---

# Reactive Store

## Utility

This library allows us to update domain objects from our **Application Layer** by implementing interfaces of our Domain Services.

## Installation

You can install this store as follows:

```bash
npm i --save @codescouts/store
```

## Dependencies

- [**Zustand**](https://github.com/pmndrs/zustand)
- [**React**](https://reactjs.org/)

## Updating our UI from an application layer

We’ll start with the example provided by the template we’ve built 👇

```bash
npx create-react-app my-app --template @codescouts/clean-architecture-template
```

Using this example, we have a use case in the **Application Layer** that adds a log, and subsequently, we need to update the UI so the user can see the logs being added, right?

When we invoke the **execute** method of the use case, we’ll be able to utilise domain objects, but occasionally, we’ll also want to update the UI.

If we inject a **DomainService** using our library, we can not only access the objects stored within but also update the UI whenever they are modified.

### Our use case

```ts showLineNumbers
import { IEventDispatcher } from "@codescouts/events";

import { Log } from "@domain/model/Log";
import { LoggerService } from "@domain/services/LoggerService";

export class TestUseCase {
  constructor(private readonly loggerService: LoggerService) {}

  public execute(message: string) {
    const log = new Log(message);

    this.loggerService.update(log);
  }
}
```

### Our Domain Service

```ts showLineNumbers
import { Log } from "../model/Log";

export interface LoggerService {
  logs: Log[];
  save: (log: Log) => void;
}
```

### Our React Component

Let’s look at the following UI component that displays the logs.

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

:::note note
As you can see on line 27, we are using the instance of the Log class. Let’s look at its implementation:
:::

```ts showLineNumbers
export class Log {
  public readonly when: number;

  constructor(public readonly message: string) {
    this.when = new Date().getTime();
  }

  public format() {
    return `${this.message} - ${new Date(this.when).toDateString()}`;
  }
}
```

Referring back to the architecture outlined here [**Clean architecture**](./clean-architecture), we can see we use a **ViewModel** as a component to decouple the UI from its behaviour. It looks something like this 👇

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
  }, [testUseCase]);

  return { logs, test, input };
};
```

Now, how would we implement **useLogger** as an implementation of our **DomainService**? Let’s take a look 👇

### Domain Service Implementation

```ts showLineNumbers
import { create } from "@codescouts/store";

import { Log } from "@domain/model";
import { LoggerService } from "@domain/services";

export const useLogger = create<LoggerService>((set) => ({
  logs: [],
  save: (log: Log) => set((state) => ({ logs: [...state.logs, log] })),
}))
  .withPersist(Log)
  .build();
```

As shown here, this store takes the object you want to implement in its **Generic**, and when constructing it, it receives a setter. This setter allows you to update the object.

## Persisting the store

Our library supports saving and restoring domain objects even when the user refreshes the browser.

To do this, you must use the **withPersist** method and pass your object reference as an argument.

If you wish to save your objects in **localstorage** to restore them later, invoke the **withPersist** function and reference your class as an argument.

```ts showLineNumbers
export const useLogger = create<LoggerService>((set) => ({
  logs: [],
  save: (log: Log) => set((state) => ({ logs: [...state.logs, log] })),
}))
  //highlight-start
  .withPersist(Log)
  //highlight-end
  .build();
```

:::note note
Our store will reinstantiate the class and all its relationships, so you can fully utilise its behaviour again.
:::

### Restoring state

```ts showLineNumbers
class Foo {
  inner: Bar;

  public constructor() {
    this.inner = new Bar();
  }

  foo() {}
}
```

Our **store** can not only restore the instance of the **Foo** class but will also restore the instance of the **Bar** class.

Finally, you need to execute the build method to create the state according to your configuration.

This store is also available for Svelte, maintaining the same API.

```bash
npm i --save @codescouts/svelte-store
```

## Instantiating the use case with Dependency Injection

You can find the documentation here: [**How to inject dependencies?**](./dependency-injection)

Once you configure the dependency injector, it will look like this:

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
  }, [testUseCase]);

  return { logs, test, input };
};
```
