import { defineConfig } from 'unloader'
import Oxc from './src/unloader'

export default defineConfig({
  plugins: [
    Oxc({
      transform: {
        jsx: {
          runtime: 'classic',
          pragma: 'h',
        },
      },
    }),
  ],
})
