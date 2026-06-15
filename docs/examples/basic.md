---
title: Basic
description: A minimal end-to-end setup — register the plugin with your shortname and render a comment thread with a single identifier.
sidebar:
  order: 1
---

The smallest complete setup: register the plugin with your Disqus shortname, then render a thread with an `identifier`.

## 1. Register the plugin

```ts
// main.ts
import { createApp } from 'vue'
import Vue3Disqus from 'vue3-disqus'
import App from './App.vue'

createApp(App)
  .use(Vue3Disqus, { shortname: 'your-forum-shortname' })
  .mount('#app')
```

## 2. Render a thread

`identifier` is the only required prop. Passing an explicit `url` is recommended so Disqus has a canonical link for the thread:

```vue
<!-- App.vue -->
<template>
  <article>
    <h1>My First Post</h1>
    <p>…post content…</p>

    <DisqusComments
      identifier="/blog/my-first-post"
      url="https://example.com/blog/my-first-post"
    />
  </article>
</template>
```

By default the thread is lazy — Disqus loads only when the comment section scrolls into view.

:::tip
`<DisqusComments />` is registered globally by the plugin, so you don't need to import it in each file. To skip the plugin, import it directly and pass `shortname` as a prop instead.
:::

## Next steps

- [Comment Count](/vue3-disqus/examples/comment-count/) — show a live count and link it to the thread.
- [SPA Blog](/vue3-disqus/examples/spa-blog/) — keep the thread in sync with client-side routing.
