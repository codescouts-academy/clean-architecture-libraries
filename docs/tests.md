---
sidebar_position: 4
---

# Tests

## Utilidad

Esta librería te permitirá hacer tests unitarios y de integración mucho más rápido

## Instalación

Este store puedes instalarlo de la siguiente forma:

```bash
npm i --save-dev @codescouts/test
```

## Dependencias

-   [**jest-mock-extended**](https://github.com/marchaos/jest-mock-extended)
-   [**MSW**](https://github.com/mswjs/msw)

## Unit tests

En caso de los unit tests, nuestra librería no modifica mucho el comportamiento original de **jest-mock-extended** simplemente la expone como una herramienta más.

### Comienza por aquí

Vamos a hacer un test unitario de nuestro **caso de uso** continuando con el ejemplo del log.

### El caso de uso

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

### Unit test

```ts showLineNumbers
import { mock } from "@codescouts/test";
import { IEventDispatcher } from "@codescouts/events";

import { NewLogRegistered } from "@domain/events";

import { Log } from "@domain/model";

import { TestUseCase } from "./test-use-case";

jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-01-01'));

describe("TestUseCase should", () => {
    test("dispatch event with message log", () => {
        //highlight-start
        const eventDispatcher = mock<IEventDispatcher>();
        //highlight-end

        const useCase = new TestUseCase(eventDispatcher);

        useCase.execute("Foo");

        expect(eventDispatcher.dispatch).toHaveBeenCalledWith(new NewLogRegistered(new Log("Foo")));
    })
})
```

:::note ota
Si necesitas saber más como funciona [jest-mock-extended](https://github.com/marchaos/jest-mock-extended), consulta su documentación. En esta librería solo exponemos su funcionalidad.
:::

## Integration test

Para realizar tests de integración donde necesitemos verificar el llamado a servicios externos, podemos utilizar esta librería, nos permitirá verificar que nos comunicamos con el mundo exterior a traves del **protocolo http** permitiéndonos moquear nuestras peticiones.

Veamos como la usaríamos 

```ts showLineNumbers
import { setupServer } from "@codescouts/test/integration";

describe("SetupServer should", () => {
    const server = setupServer();

    test("Intercept get request", async () => {
        const responseMocked = {
            response: "GETTING Object"
        };

        server.mockGet("http://localhost:2000/test", 200, responseMocked);

        const response = await fetch("http://localhost:2000/test");
        const json = await response.json();

        expect(response.status).toEqual(200)
        expect(json).toEqual(responseMocked)
    })

    test("Intercept post request", async () => {
        const responseMocked = {
            response: "POSTING Object"
        };

        server.mockPost("http://localhost:2000/test", 200, responseMocked);

        const response = await fetch("http://localhost:2000/test", {
            method: "POST",
            body: JSON.stringify({
                "fake": "request"
            })
        });

        const json = await response.json();

        expect(json).toEqual(responseMocked)
    })


    test("Intercept put request", async () => {
        const responseMocked = {
            response: "PUTTING Object"
        };

        server.mockPut("http://localhost:2000/test/1", 200, responseMocked);

        const response = await fetch("http://localhost:2000/test/1", {
            method: "PUT",
            body: JSON.stringify({
                "fake": "request"
            })
        });

        const json = await response.json();

        expect(json).toEqual(responseMocked)
    })

    test("Intercept patch request", async () => {
        const responseMocked = {
            response: "PATCHING Object"
        };

        server.mockPatch("http://localhost:2000/test/1", 200, responseMocked);

        const response = await fetch("http://localhost:2000/test/1", {
            method: "PATCH",
            body: JSON.stringify({
                "fake": "request"
            })
        });

        const json = await response.json();

        expect(json).toEqual(responseMocked)
    })

    test("Intercept Delete request", async () => {
        const responseMocked = {
            response: "DELETING Object"
        };

        server.mockDelete("http://localhost:2000/test/1", 200, responseMocked);

        const response = await fetch("http://localhost:2000/test/1", {
            method: "DELETE"
        });

        const json = await response.json();

        expect(json).toEqual(responseMocked)
    })
})
```

:::note nota
Esta librería controla el ciclo de vida de los tests con **jest**, definiendo por defecto el **beforeEach**, **afterEach**, y **afterAll**
:::
