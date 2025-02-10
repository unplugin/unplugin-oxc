# unplugin-oxc [![npm](https://img.shields.io/npm/v/unplugin-oxc.svg)](https://npmjs.com/package/unplugin-oxc)

[![Unit Test](https://github.com/unplugin/unplugin-oxc/actions/workflows/unit-test.yml/badge.svg)](https://github.com/unplugin/unplugin-oxc/actions/workflows/unit-test.yml)

Oxc integration for unplugin.

## Installation

```bash
npm i -D unplugin-oxc
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginOxc from 'unplugin-oxc/vite'

export default defineConfig({
  plugins: [UnpluginOxc()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginOxc from 'unplugin-oxc/rollup'

export default {
  plugins: [UnpluginOxc()],
}
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.js
import UnpluginOxc from 'unplugin-oxc/rolldown'

export default {
  plugins: [UnpluginOxc()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild'
import UnpluginOxc from 'unplugin-oxc/esbuild'

build({
  plugins: [UnpluginOxc()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import UnpluginOxc from 'unplugin-oxc/webpack'

export default {
  /* ... */
  plugins: [UnpluginOxc()],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
import UnpluginOxc from 'unplugin-oxc/rspack'

export default {
  /* ... */
  plugins: [UnpluginOxc()],
}
```

<br></details>

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2025-PRESENT [三咲智子](https://github.com/sxzz)
