<p align="center">
  <a href="https://www.codescouts.academy/" target="_blank">
    <img alt="CodeScouts" src="https://www.codescouts.academy/images/logo-all-yellow.png" />
  </a>
</p>

<h1 align="center">
 📄 Documentation for implementing CodeScouts libraries for Frontend 🚀
</h1>

<p align="center">
  Documentation 📄
  <br />
  <br />
  <a href="https://github.com/codescouts-academy/clean-architecture-libraries/stargazers">Stars are welcome 😊</a>
  <a href="https://github.com/codescouts-academy/clean-architecture-libraries/issues">Report an issue 🐛</a>
</p>

## 🚀 Libraries

### 🧑‍🚀 Reactive store

For React ⚛️

```sh
npm i --save @codescouts/store
```

For Svelte 🔝

```sh
npm i --save @codescouts/svelte-store
```

### ⚡ Domain Events (Agnostic)

```sh
npm i --save @codescouts/event
```

### 🤘 UI package (Resources, Permissions, Events) for React ⚛️

```sh
npm i --save @codescouts/ui
```

### 💉 Dependency injection for React ⚛️

```sh
npm i --save @codescouts/di
```

### 🧪 Test library (Unit and Integration)

```sh
npm i --save-dev @codescouts/test
```

## 📃 Starter kit template

If you are using create-react-app 👇

```sh
npx create-react-app my-app --template @codescouts/clean-architecture-template
```

If you want to use Vite 👇

```sh
npx degit codescouts-academy/react-clean-architecture my-app
```

## 👩‍💻 Project explanation

### 📁 Recommended folder structure

```

    public/
    ├── favicon.png --> CodeScouts's logo
    ├── index.html --> Main html file
    │
    src/
    ├── application/ Our use cases
    │   ├── get-initial-value-use-case.ts --> Here we model the use cases
    │   ├── increment-use-case.ts
    │   └── decrement-use-case.ts
    ├── domain/ Our Business logic
    │   ├── events --> Here we model the domain events
    │   ├── model --> Here we model our business logic
    │   ├── repository --> Here exists the domain repositories (only abstractions)
    │   └── services --> Here exists the domain services (only abstractions)
    │
    ├── infrastructure/ Our external services implementations
    │   ├── repository --> Here we model the domain events
    │   │   └── CounterService.ts --> Implementation for domain abstractions
    │   └── services
    │       └── CounterService.ts --> Implementation for domain abstractions
    │
    ├── ui/ React things
    │   ├── components/ --> Stateless components
    │   └── pages/
    │       └── home/
    │           ├── Home.tsx --> Page component (View)
    │           └── useHomeViewModel.ts --> Home UI business logic (ViewModel)
    │
    ├── app.tsx
    └── index.tsx
```

## 🤔 Contributing

If you find any errors, think there is room for improvement or simply want to contribute, you are welcome.
Just fork and send us your PR 🙏.
