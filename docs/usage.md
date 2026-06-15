---
title: Usage
description: Render Disqus threads and comment counts, react to Disqus callbacks as Vue events, control lazy loading, and reset threads on SPA navigation.
sidebar:
  order: 3
---

Vue 3 Disqus gives you two components. `<DisqusComments />` renders a full comment thread; `<DisqusCount />` renders a live comment count for a page. This page covers the everyday workflow — see [Configuration](/vue3-disqus/configuration/) for the exhaustive prop, event, and slot reference.

## Rendering a thread

The only required prop is `identifier`. It's the stable key Disqus uses to associate a thread with a page, so keep it consistent for a given page across deployments and URL changes:

```vue
<template>
  <DisqusComments identifier="/blog/my-first-post" />
</template>
```

It's good practice to also pass an explicit `url` — the canonical URL Disqus links back to:

```vue
<template>
  <DisqusComments
    identifier="/blog/my-first-post"
    url="https://example.com/blog/my-first-post"
  />
</template>
```

## Comment counts

`<DisqusCount />` renders the number of comments for a page. By default it renders a `<span>`, which is ideal inline:

```vue
<template>
  <p>
    This post has <DisqusCount identifier="/blog/my-first-post" /> comments.
  </p>
</template>
```

To make the count a link that jumps to the thread, render it as an anchor with `tag="a"` and provide the `url`:

```vue
<template>
  <DisqusCount
    tag="a"
    identifier="/blog/my-first-post"
    url="https://example.com/blog/my-first-post"
  />
</template>
```

:::tip
The count text is supplied by Disqus's count script. For it to read well, configure the count text in your Disqus admin under *Settings → Community → Comment Count Link*.
:::

## Lazy loading

By default `<DisqusComments />` is **lazy**: the Disqus embed script only loads once the thread scrolls into view, using an `IntersectionObserver`. This keeps Disqus off your critical render path.

To load the thread immediately on mount instead, turn lazy off:

```vue
<template>
  <DisqusComments identifier="/blog/my-first-post" :lazy="false" />
</template>
```

You can also tune the observer thresholds via `lazyConfig` (it's passed straight to the `IntersectionObserver` constructor):

```vue
<template>
  <DisqusComments
    identifier="/blog/my-first-post"
    :lazy-config="{ root: null, rootMargin: '600px', threshold: 0 }"
  />
</template>
```

## Reacting to events

Every Disqus callback is emitted as a kebab-case Vue event. Listen to them like any other event:

```vue
<script setup lang="ts">
function onReady() {
  console.log('Disqus thread is ready')
}

function onNewComment(comment: unknown) {
  console.log('A new comment was posted', comment)
}
</script>

<template>
  <DisqusComments
    identifier="/blog/my-first-post"
    @ready="onReady"
    @new-comment="onNewComment"
  />
</template>
```

See the [events reference](/vue3-disqus/configuration/#events) for the full list.

## SPA navigation

In a single-page app the component handles route changes for you: when the `url` or `language` prop changes, the thread automatically resets and reloads with the new values. Bind those props to your route and you're done:

```vue
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const identifier = computed(() => route.path)
const url = computed(() => `https://example.com${route.path}`)
</script>

<template>
  <DisqusComments :identifier="identifier" :url="url" />
</template>
```

:::caution
Disqus ties a thread to its `identifier`. Changing `url` reloads the thread, but the `identifier` is what determines *which* thread is shown — make sure each page has its own stable, unique `identifier`, or different pages will share the same comments.
:::

## Manual reset

If you need to force a reload yourself — for example after some external state change — grab a `ref` to the component and call its `reset()` method:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DisqusComments } from 'vue3-disqus'

const thread = ref<InstanceType<typeof DisqusComments> | null>(null)

function reload() {
  thread.value?.reset()
}
</script>

<template>
  <DisqusComments ref="thread" identifier="/blog/my-first-post" />
  <button @click="reload">Reload comments</button>
</template>
```

## Next steps

- [Configuration](/vue3-disqus/configuration/) — every prop, event, and slot.
- [Examples](/vue3-disqus/examples/basic/) — copy-pasteable setups for common scenarios.
