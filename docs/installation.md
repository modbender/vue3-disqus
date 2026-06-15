---
title: Installation
description: Install Vue 3 Disqus, register the plugin with your Disqus shortname, and render your first comment thread.
sidebar:
  order: 2
---

Getting Vue 3 Disqus running takes two steps: install the package, then register the plugin with your Disqus shortname.

## 1. Install the package

Add the package with your preferred package manager:

```bash
# pnpm
pnpm add vue3-disqus
```

```bash
# npm
npm install vue3-disqus
```

```bash
# yarn
yarn add vue3-disqus
```

## 2. Register the plugin

Install the plugin in your app entry. Passing your Disqus `shortname` here makes it available to every `<DisqusComments />` and `<DisqusCount />` in your app, so you don't have to repeat it on each component:

```ts
// main.ts
import { createApp } from 'vue'
import Vue3Disqus from 'vue3-disqus'
import App from './App.vue'

createApp(App)
  .use(Vue3Disqus, { shortname: 'your-forum-shortname' })
  .mount('#app')
```

Registering the plugin also globally registers both components, so `<DisqusComments />` and `<DisqusCount />` are available in any template with no per-file import.

:::tip
Your **shortname** is the unique identifier of your Disqus site, found in your Disqus admin under *Settings → General → Shortname*. It's the `your-forum` part of `your-forum.disqus.com`.
:::

## Per-component shortname (without the plugin)

If you'd rather not register the plugin — or you need to render threads for more than one forum — you can import the components directly and pass `shortname` as a prop instead:

```vue
<script setup lang="ts">
import { DisqusComments } from 'vue3-disqus'
</script>

<template>
  <DisqusComments shortname="your-forum-shortname" identifier="/blog/my-first-post" />
</template>
```

A `shortname` prop always wins over the one provided to the plugin.

:::caution
A shortname must be available one way or the other. If neither the plugin nor the `shortname` prop provides one, the component throws `Disqus shortname is required` at render time.
:::

## Render your first thread

`identifier` is the only required prop — it's the stable, unique ID Disqus uses to tie a thread to a page:

```vue
<template>
  <DisqusComments identifier="/blog/my-first-post" />
</template>
```

## Next steps

- [Usage](/vue3-disqus/usage/) — comment counts, events, lazy loading, and manual resets.
- [Configuration](/vue3-disqus/configuration/) — the full props, events, and slots reference.
