---
title: Comment Count
description: Show a live Disqus comment count inline or as a link to the thread, and pair it with a full comment section on the same page.
sidebar:
  order: 2
---

`<DisqusCount />` renders the number of comments for a page. It works on its own — for example in a post list — or alongside a full `<DisqusComments />` thread.

## Inline count

By default the count renders as a `<span>`, perfect for inline text:

```vue
<template>
  <p>
    Join the discussion —
    <DisqusCount identifier="/blog/my-first-post" /> comments so far.
  </p>
</template>
```

## Count as a link to the thread

Render it as an anchor with `tag="a"` and pass `url`; it links to the thread anchor on that page:

```vue
<template>
  <DisqusCount
    tag="a"
    identifier="/blog/my-first-post"
    url="https://example.com/blog/my-first-post"
  />
</template>
```

## Counts in a post list

A common pattern is a list of posts each showing its own count. Give every item a unique `identifier`:

```vue
<script setup lang="ts">
const posts = [
  { id: '/blog/first', title: 'First post', url: 'https://example.com/blog/first' },
  { id: '/blog/second', title: 'Second post', url: 'https://example.com/blog/second' },
]
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <a :href="post.url">{{ post.title }}</a>
      —
      <DisqusCount tag="a" :identifier="post.id" :url="post.url" />
    </li>
  </ul>
</template>
```

## Count plus thread on one page

The count and the thread are independent components — pair them on a post page, both keyed to the same `identifier`:

```vue
<template>
  <article>
    <header>
      <h1>My First Post</h1>
      <small><DisqusCount identifier="/blog/my-first-post" /> comments</small>
    </header>

    <p>…post content…</p>

    <DisqusComments
      identifier="/blog/my-first-post"
      url="https://example.com/blog/my-first-post"
    />
  </article>
</template>
```

:::tip
The count text comes from Disqus's count script. Configure how it reads (e.g. "0 Comments" vs "Leave a comment") in your Disqus admin under *Settings → Community → Comment Count Link*.
:::

## Next steps

- [SPA Blog](/vue3-disqus/examples/spa-blog/) — keep counts and threads correct across route changes.
- [SSO](/vue3-disqus/examples/sso/) — sign your own users into Disqus.
