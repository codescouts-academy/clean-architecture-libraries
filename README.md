<p align="center">
  <a href="https://www.codescouts.academy/" target="_blank">
    <img alt="CodeScouts" src="https://www.codescouts.academy/images/logo-all-yellow.png" />
  </a>
</p>

<h1 align="center">
 📄 Documentación para implementar las librerías de CodeScouts para el Frontend 🚀
</h1>

<p align="center">
  Documentación 📄
  <br />
  <br />
  <a href="https://github.com/codescouts-academy/clean-architecture-libraries/stargazers">Stars are welcome 😊</a>
  <a href="https://github.com/codescouts-academy/clean-architecture-libraries/issues">Report an error 🐛</a>
</p>

## 🚀 Libraries

### 🧑‍🚀 Reactive store

For react ⚛️

```sh
npm i --save @codescouts/store
```

For svelte 🔝

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

```sh
npx create-react-app my-app --template @codescouts/clean-architecture-template
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

Si encuentras algún error, crees que hay cosas por mejorar o simplemente quieres contribuir, eres bienvenido/a.
Solo realiza un fork y envíanos tu PR 🙏.
