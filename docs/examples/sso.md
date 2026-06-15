---
title: SSO
description: Pass Disqus Single Sign-On config and page config through DisqusComments so your own authenticated users post as themselves.
sidebar:
  order: 4
---

Disqus Single Sign-On (SSO) lets users comment with **your** site's identity instead of a separate Disqus login. You generate a signed payload on your server and hand it to Disqus through the `ssoConfig` prop. Vue 3 Disqus passes it straight through and validates the keys.

:::caution
SSO is a paid Disqus feature and requires a server-side step: the `remote_auth_s3` payload **must** be generated and HMAC-signed on your backend with your secret key. Never put your Disqus secret key in client code.
:::

## Pass the SSO config

`ssoConfig` configures the SSO login button; `pageConfig` carries the signed auth payload and your public API key. Both are validated against the keys Disqus supports.

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const pageConfig = ref<Record<string, string>>({})

const ssoConfig = {
  name: 'Example Inc',
  button: 'https://example.com/disqus-login.png',
  icon: 'https://example.com/favicon.ico',
  url: 'https://example.com/login?returnUrl={returnUrl}',
  logout: 'https://example.com/logout',
  width: '800',
  height: '600',
}

onMounted(async () => {
  // Your backend returns the HMAC-signed payload + your public API key.
  const { remoteAuthS3, apiKey } = await fetch('/api/disqus-sso').then((r) => r.json())
  pageConfig.value = {
    remote_auth_s3: remoteAuthS3,
    api_key: apiKey,
  }
})
</script>

<template>
  <DisqusComments
    identifier="/blog/my-first-post"
    url="https://example.com/blog/my-first-post"
    :page-config="pageConfig"
    :sso-config="ssoConfig"
  />
</template>
```

When `pageConfig` resolves, the thread reloads with the authenticated payload, and signed-in users comment as themselves.

## Supported keys

Passing an unsupported key triggers a Vue prop-validation warning in development, so you'll catch typos early.

- **`pageConfig`** — `api_key`, `author_s3`, `category_id`, `identifier`, `integration`, `language`, `remote_auth_s3`, `slug`, `title`, `url`.
- **`ssoConfig`** — `name`, `button`, `icon`, `url`, `logout`, `profile_url`, `width`, `height`.

See [Disqus's SSO guide](https://help.disqus.com/en/articles/1717083-single-sign-on) for how to build and sign the `remote_auth_s3` payload.

## Next steps

- [Configuration](/vue3-disqus/configuration/) — the full `pageConfig` / `ssoConfig` key reference.
- [SPA Blog](/vue3-disqus/examples/spa-blog/) — combine SSO with client-side routing.
