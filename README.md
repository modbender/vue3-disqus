# Vue 3 Disqus

Vue 3 component to integrate Disqus comments into your application, with support for SPAs.

## Features

- `<DisqusComments />` thread and `<DisqusCount />` comment-count components
- Events for all Disqus callbacks
- Lazy load (via `IntersectionObserver`)
- Page and SSO config with prop validation
- Automatically reloads the thread on SPA navigation and language change
- Manual `reset()` method (via `ref`)

## Installation

```bash
pnpm add vue3-disqus
```

Register the plugin with your Disqus shortname:

```ts
import { createApp } from 'vue'
import Vue3Disqus from 'vue3-disqus'
import App from './App.vue'

createApp(App)
  .use(Vue3Disqus, { shortname: 'your-forum-shortname' })
  .mount('#app')
```

Then render a thread (`identifier` is the only required prop):

```vue
<template>
  <DisqusComments identifier="/blog/my-first-post" />
</template>
```

## Documentation

Full documentation — installation, usage, the complete props/events reference, and examples — lives at **[modbender.in/vue3-disqus](https://modbender.in/vue3-disqus/)**.

## Contributing

- Check the open issues or open a new issue to start a discussion around your feature idea or the bug you found
- Fork the repository, make changes, and add your name and link to the authors section in CONTRIBUTING.md
- Send a pull request

## License

vue3-disqus is an open-source package licensed under the [MIT](https://github.com/modbender/vue3-disqus/blob/master/LICENSE) license.
