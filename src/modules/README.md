## Modules

A custom user module system. Place a `.ts` file with the following template, it will be installed automatically. If there's an exported 'useModule' method, it would be executed in App.vue's setup block.

```ts
import { UserModule } from '@/types'

export const install: UserModule = ({ app, router, isClient }) => {
  // do something
}

export const useModule: () => void; = () => {
  // do something
}
```
