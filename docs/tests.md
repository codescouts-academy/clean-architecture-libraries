---
sidebar_position: 4
---

# Tests

## Utility

This library will enable you to conduct unit and integration tests much faster.

## Installation

You can install this store as follows:

```bash
npm i --save-dev @codescouts/test
```

## Dependencies

- [**jest-mock-extended**](https://github.com/marchaos/jest-mock-extended)
- [**MSW**](https://github.com/mswjs/msw)

## Unit tests

For unit tests, our library does not significantly alter the original behaviour of **jest-mock-extended** but simply exposes it as an additional tool.

### Start here

Let’s perform a unit test of our **use case**, continuing with the log example.

### The use case

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

### Unit test

```ts showLineNumbers
import { mock } from "@codescouts/test";
import { IEventDispatcher } from "@codescouts/events";

import { NewLogRegistered } from "@domain/events";

import { Log } from "@domain/model";

import { TestUseCase } from "./test-use-case";

jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));

describe("TestUseCase should", () => {
  test("dispatch event with message log", () => {
    //highlight-start
    const eventDispatcher = mock<IEventDispatcher>();
    //highlight-end

    const useCase = new TestUseCase(eventDispatcher);

    useCase.execute("Foo");

    expect(eventDispatcher.dispatch).toHaveBeenCalledWith(
      new NewLogRegistered(new Log("Foo"))
    );
  });
});
```

:::note ota
If you need to learn more about how [jest-mock-extended](https://github.com/marchaos/jest-mock-extended) works, consult its documentation. This library merely exposes its functionality.
:::

## Integration test

To conduct integration tests where we need to verify calls to external services, this library allows you to confirm communication with the external world through the **HTTP protocol** by enabling request mocking.

Let’s see how to use it.

```ts showLineNumbers
import { setupServer } from "@codescouts/test/integration";

describe("SetupServer should", () => {
  const server = setupServer();

  test("Intercept GET request", async () => {
    const responseMocked = {
      response: "GETTING Object",
    };

    server.mockGet("http://localhost:2000/test", 200, responseMocked);

    const response = await fetch("http://localhost:2000/test");
    const json = await response.json();

    expect(response.status).toEqual(200);
    expect(json).toEqual(responseMocked);
  });

  test("Intercept POST request", async () => {
    const responseMocked = {
      response: "POSTING Object",
    };

    server.mockPost("http://localhost:2000/test", 200, responseMocked);

    const response = await fetch("http://localhost:2000/test", {
      method: "POST",
      body: JSON.stringify({
        fake: "request",
      }),
    });

    const json = await response.json();

    expect(json).toEqual(responseMocked);
  });

  test("Intercept PUT request", async () => {
    const responseMocked = {
      response: "PUTTING Object",
    };

    server.mockPut("http://localhost:2000/test/1", 200, responseMocked);

    const response = await fetch("http://localhost:2000/test/1", {
      method: "PUT",
      body: JSON.stringify({
        fake: "request",
      }),
    });

    const json = await response.json();

    expect(json).toEqual(responseMocked);
  });

  test("Intercept PATCH request", async () => {
    const responseMocked = {
      response: "PATCHING Object",
    };

    server.mockPatch("http://localhost:2000/test/1", 200, responseMocked);

    const response = await fetch("http://localhost:2000/test/1", {
      method: "PATCH",
      body: JSON.stringify({
        fake: "request",
      }),
    });

    const json = await response.json();

    expect(json).toEqual(responseMocked);
  });

  test("Intercept DELETE request", async () => {
    const responseMocked = {
      response: "DELETING Object",
    };

    server.mockDelete("http://localhost:2000/test/1", 200, responseMocked);

    const response = await fetch("http://localhost:2000/test/1", {
      method: "DELETE",
    });

    const json = await response.json();

    expect(json).toEqual(responseMocked);
  });
});
```

:::note note
This library manages the lifecycle of tests with **jest**, defining **beforeEach**, **afterEach**, and **afterAll** by default.
:::
