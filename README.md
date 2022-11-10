# Web5 Injector

Library that can be used by any Web5 wallet to inject the global web5 object.

This library is built to provide an example and proof-of-concept for having a generic library that enable support for multiple web5 providers.

The library is meant to be included in extension wallets and be injected. If there are multiple wallets installed on user device, only a single instance will be created.

Wallets need to register themselves as available providers that user can choose from.

Wallets need to provide UI to perform default wallet selection.

The web5-injector can be adopted by anyone other than Blockcore and use a more generic package name on npmjs if adopted.

## Setup

Install:

```sh
npm install @blockcore/web5-injector
```

**Warning:** This package is native [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and does not provide a CommonJS export. If your project uses CommonJS, you'll have to [convert to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) or use the [dynamic `import()`](https://v8.dev/features/dynamic-import) function.

## Usage

```ts
import { Injector } from "@blockcore/web5-injector";

// MyWalletProvider is the wallets internal provider that implements the Web5RequestProvider interface.
const provider = new MyWalletProvider();
Injector.register(provider);

globalThis.web5.currentProvider = provider;

globalThis.web5.currentProvider.request({
	method: "signMessage",
	params: [{ message: "Hello World!" }],
});
```

## Development

### Build

Simply run `npm run build` to build the library. Also run `npm run lint` to verify the code syntax.

### Testing

The library is using `ava` for tests. Please refer to the documentation on how to write tests:

[https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md](https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md)
