---
title: Configuration
description: The complete Vue 3 Disqus reference — plugin options, all props, events, exposed methods, and slots for the DisqusComments and DisqusCount components.
sidebar:
  order: 4
---

This is the full reference for the plugin, both components, and the events they emit. For the everyday workflow and recipes, see [Usage](/vue3-disqus/usage/).

## Plugin options

Passed as the second argument to `app.use(Vue3Disqus, options)`.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `shortname` | `string` | _(none)_ | Your Disqus site shortname, used as the default for every component. A component's own `shortname` prop overrides it. |

```ts
app.use(Vue3Disqus, { shortname: 'your-forum-shortname' })
```

## `<DisqusComments />`

Renders a Disqus comment thread.

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `identifier` | `string` | **yes** | — | Stable, unique ID Disqus uses to tie a thread to a page. Keep it consistent for a page across URL changes. |
| `shortname` | `string` | no | _(plugin value)_ | Disqus shortname. Overrides the one given to the plugin. Required via either source, or the component throws. |
| `url` | `string` | no | _(current page)_ | Canonical URL Disqus links back to. Changing it reloads the thread (useful for SPA navigation). |
| `class` | `string` | no | — | Class forwarded to the thread element. |
| `language` | `string` | no | `'en'` | Disqus interface language. Changing it reloads the thread in the new language. |
| `lazy` | `boolean` | no | `true` | Load the embed only when the thread scrolls into view. Set `false` to load on mount. |
| `lazyConfig` | `object` | no | `{ root: null, rootMargin: '300px', threshold: 0.5 }` | Options passed to the `IntersectionObserver` used for lazy loading. |
| `pageConfig` | `object` | no | — | Disqus page config. Keys are validated against the supported set (see below). |
| `ssoConfig` | `object` | no | — | Disqus Single Sign-On config. Keys are validated against the supported set (see below). |

#### `pageConfig` keys

Validated against: `api_key`, `author_s3`, `category_id`, `identifier`, `integration`, `language`, `remote_auth_s3`, `slug`, `title`, `url`. Passing an unsupported key triggers a Vue prop-validation warning in development.

#### `ssoConfig` keys

Validated against: `name`, `button`, `icon`, `url`, `logout`, `profile_url`, `width`, `height`. See [Disqus SSO docs](https://help.disqus.com/en/articles/1717083-single-sign-on) for what each does.

### Events

Every Disqus callback is emitted as a kebab-case Vue event, with the Disqus payload as the argument.

| Event | Disqus callback | Fires when |
| --- | --- | --- |
| `@pre-data` | `preData` | Before Disqus requests thread data. |
| `@pre-init` | `preInit` | Before the thread initializes. |
| `@init` | `onInit` | When the thread initializes. |
| `@ready` | `onReady` | When the thread has finished loading and is interactive. |
| `@after-render` | `afterRender` | After the thread renders. |
| `@pre-reset` | `preReset` | Before the thread resets/reloads. |
| `@identify` | `onIdentify` | When a user is identified. |
| `@before-comment` | `beforeComment` | Before a comment renders. |
| `@new-comment` | `onNewComment` | When a new comment is posted. |
| `@paginate` | `onPaginate` | When the thread paginates (loads more comments). |

### Exposed methods

Available via a template `ref` to the component.

| Method | Description |
| --- | --- |
| `reset()` | Forces the thread to reload with the current props. Called automatically when `url` or `language` changes. |

### Slots

`<DisqusComments />` renders the Disqus-managed `#disqus_thread` element and exposes no slots — the thread content is injected by Disqus's own embed script.

## `<DisqusCount />`

Renders a live comment count for a page.

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `identifier` | `string` | **yes** | — | The thread identifier whose count to display. Match the thread's `identifier`. |
| `shortname` | `string` | no | _(plugin value)_ | Disqus shortname. Overrides the one given to the plugin. |
| `url` | `string` | no | — | Canonical page URL. Used as the link target when `tag="a"`, and as `data-disqus-url` when `tag="span"`. |
| `tag` | `string` | no | `'span'` | Element to render. Use `'a'` to render a link to the thread (`{url}#disqus_thread`). |

### Slots

`<DisqusCount />` renders the count text supplied by Disqus's count script into the chosen `tag`, and exposes no slots.

:::caution
The comment count is rendered by Disqus's `count.js`, which scans the page once on load. Counts for elements added later (for example in an infinite-scroll list) are refreshed automatically when the component's `url` changes, but ad-hoc DOM insertion outside the component won't be picked up.
:::

## Errors

| Message | Cause |
| --- | --- |
| `Disqus shortname is required` | No shortname was provided — neither via the plugin nor the component's `shortname` prop. Provide one in either place. |
