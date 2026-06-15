---
title: SPA Blog
description: Wire Disqus into a Vue Router blog so the thread reloads correctly on every client-side navigation, with a manual reset escape hatch.
sidebar:
  order: 3
---

In a single-page app, navigating between posts never reloads the page — so a naive Disqus embed would keep showing the first post's comments. Vue 3 Disqus handles this for you: when the `url` or `language` prop changes, it resets and reloads the thread automatically. Bind those props to your route and it just works.

## Bind the thread to the route

```vue
<!-- pages/PostPage.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// A stable, unique identifier per post — the route path works well.
const identifier = computed(() => route.path)
const url = computed(() => `https://example.com${route.path}`)
</script>

<template>
  <article>
    <h1>{{ route.meta.title }}</h1>
    <!-- post content -->

    <DisqusComments :identifier="identifier" :url="url" />
  </article>
</template>
```

When the user navigates to another post, `identifier` and `url` change, and the thread reloads with the new post's comments — no full page reload, no stale thread.

:::caution
The `identifier` is what Disqus uses to pick *which* thread to show. If two routes ever produce the same `identifier`, they'll share comments. Derive it from something guaranteed unique per post (a slug or the full path), not from a title that could repeat.
:::

## React to load events

You can show your own loading state until Disqus is ready:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const identifier = computed(() => route.path)
const loading = ref(true)
</script>

<template>
  <p v-if="loading">Loading comments…</p>
  <DisqusComments
    :identifier="identifier"
    @ready="loading = false"
    @pre-reset="loading = true"
  />
</template>
```

## Force a reload manually

If you ever need to reload the thread outside of a route change — say after the user logs in — call the component's exposed `reset()` method via a `ref`:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DisqusComments } from 'vue3-disqus'

const thread = ref<InstanceType<typeof DisqusComments> | null>(null)

function onLogin() {
  // …sign the user in, then refresh the thread
  thread.value?.reset()
}
</script>

<template>
  <DisqusComments ref="thread" identifier="/blog/my-first-post" />
  <button @click="onLogin">Log in</button>
</template>
```

## Next steps

- [SSO](/vue3-disqus/examples/sso/) — pass signed user data so your own logins carry into Disqus.
- [Configuration](/vue3-disqus/configuration/) — every prop and event in one place.
