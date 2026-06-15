---
title: Vue 3 Disqus
description: A Vue 3 component to drop Disqus comments into your app, with lazy loading, SPA-aware reloads, comment counts, SSO, and events for every Disqus callback.
sidebar:
  order: 1
---

Adding Disqus to a Vue app usually means hand-rolling the embed script, wiring up `disqus_config`, and remembering to reset the thread every time the route changes. Vue 3 Disqus does all of that for you.

It's a small, dependency-free component library that renders a Disqus comment thread (and comment counts) anywhere in your Vue 3 app. It lazy-loads the embed by default, reloads automatically on single-page-app navigation, and exposes every Disqus callback as a Vue event.

## Key features

- **Two components** — `<DisqusComments />` renders a thread, `<DisqusCount />` renders a live comment count.
- **Lazy loading** — the embed script loads only when the thread scrolls into view (via `IntersectionObserver`), so it never blocks your initial render. Opt out with `:lazy="false"`.
- **SPA-aware** — the thread resets automatically when the `url` or `language` prop changes, so it stays correct across client-side route changes.
- **Every callback as an event** — `onReady`, `onNewComment`, `onPaginate`, and the rest are emitted as kebab-case Vue events (`@ready`, `@new-comment`, `@paginate`, …).
- **Page & SSO config** — pass through Disqus's page identifiers and Single Sign-On config, validated against the keys Disqus actually supports.
- **Manual reset** — grab a `ref` and call `reset()` to force a reload whenever you need it.

## A 30-second taste

Install the package:

```bash
pnpm add vue3-disqus
```

Register the plugin with your forum shortname:

```ts
// main.ts
import { createApp } from 'vue'
import Vue3Disqus from 'vue3-disqus'
import App from './App.vue'

createApp(App)
  .use(Vue3Disqus, { shortname: 'your-forum-shortname' })
  .mount('#app')
```

Then drop the component into any template — `identifier` is the only required prop:

```vue
<template>
  <DisqusComments identifier="/blog/my-first-post" />
</template>
```

That's the whole thing. The thread loads when it scrolls into view and reloads itself when you navigate to another post.

## Compatibility

| | Supported |
| --- | --- |
| Vue 3 Disqus | 1.x |
| Vue | 3.3+ |

:::tip
You need a Disqus account and a registered site to get a **shortname** (find it in your Disqus admin under *Settings → General → Shortname*). Everything in these docs assumes you have one.
:::

## Where to next

- [Installation](/vue3-disqus/installation/) — install the package and register the plugin.
- [Usage](/vue3-disqus/usage/) — render threads and counts, handle events, and reset manually.
- [Configuration](/vue3-disqus/configuration/) — the full props, events, and slots reference.
