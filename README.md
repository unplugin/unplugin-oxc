# unplugin-oxc

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

[Oxc](https://oxc.rs/) integration for unplugin.

## Features

- 🚀 **Blazing Fast**: Transform, resolve, and minify files with Oxc, built in Rust.
- 🦾 **Powerful**: Supports TypeScript and React JSX transformation, identifier replacement, syntax lowering, and more.
- 📦 **Zero Config**: No configuration needed for TypeScript support.
- 🎨 **Customizable**: Fine-tune transform, resolve, and minify options.
- 😈 **Drop-in Replacement**: Easily replace [rollup-plugin-esbuild](https://github.com/egoist/rollup-plugin-esbuild) and [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve).

## Installation

```bash
npm i -D unplugin-oxc
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Oxc from 'unplugin-oxc/vite'

export default defineConfig({
  plugins: [Oxc()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Oxc from 'unplugin-oxc/rollup'

export default {
  plugins: [Oxc()],
}
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.js
import Oxc from 'unplugin-oxc/rolldown'

export default {
  plugins: [Oxc()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild'
import Oxc from 'unplugin-oxc/esbuild'

build({
  plugins: [Oxc()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import Oxc from 'unplugin-oxc/webpack'

export default {
  /* ... */
  plugins: [Oxc()],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
import Oxc from 'unplugin-oxc/rspack'

export default {
  /* ... */
  plugins: [Oxc()],
}
```

<br></details>

<details>
<summary>unloader</summary><br>

```ts
// unloader.config.ts
import Oxc from 'unplugin-oxc/unloader'

export default defineConfig({
  plugins: [Oxc()],
})
```

<br></details>

## Usage

```ts
interface Options {
  /**
   * @default [/\.[cm]?[jt]sx?$/],
   */
  include?: FilterPattern
  /**
   * @default [/node_modules/],
   */
  exclude?: FilterPattern
  enforce?: 'pre' | 'post' | undefined
  /**
   * Transform options passed to `oxc-transform`
   */
  transform?: Omit<TransformOptions, 'sourcemap'> | false
  /**
   * Resolve options passed to `oxc-resolver`
   */
  resolve?: NapiResolveOptions | false
  /**
   * The plugin will skip resolving node_modules by default.
   * Set this to `true` to resolve node_modules.
   * @default false
   */
  resolveNodeModules?: boolean
  /**
   * Minify options passed to `oxc-minify`
   */
  minify?: Omit<MinifyOptions, 'sourcemap'> | false
  sourcemap?: boolean
}
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2025-PRESENT [三咲智子](https://github.com/sxzz)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unplugin-oxc.svg
[npm-version-href]: https://npmjs.com/package/unplugin-oxc
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-oxc
[npm-downloads-href]: https://www.npmcharts.com/compare/unplugin-oxc?interval=30
[unit-test-src]: https://github.com/unplugin/unplugin-oxc/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/unplugin/unplugin-oxc/actions/workflows/unit-test.yml
