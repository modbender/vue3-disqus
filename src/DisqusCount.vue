<template>
  <component class="disqus-comment-count" :is="tag" v-bind="disqusAttrs" />
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, watch } from 'vue';
import { DisqusInstance } from './types';
import * as CONSTANTS from './constants';
import { draf } from './utils';

interface DisqusCountAttrs {
  href: string;
  'data-disqus-url'?: string | null;
  'data-disqus-identifier': string;
}

export default defineComponent({
  name: 'DisqusCount',

  props: {
    url: String,
    shortname: String,
    identifier: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'span',
    },
  },

  setup(props) {
    const $disqus = <DisqusInstance>inject(CONSTANTS.DISQUS_CONFIG_KEY, {});
    const getHref = computed(() =>
      props.tag === 'a' ? `${props.url}#disqus_thread` : '#'
    );
    const getUrl = computed(() => (props.tag === 'span' ? props.url : null));
    const getShortname = computed(() => {
      const shortname = props.shortname || $disqus.shortname;
      if (!shortname) throw new Error(CONSTANTS.ERROR_SHORTNAME_REQUIRED);
      return shortname;
    });

    const disqusAttrs: DisqusCountAttrs = {
      href: getHref.value,
      'data-disqus-url': getUrl.value,
      'data-disqus-identifier': props.identifier,
    };

    onMounted(init);

    function init() {
      if ('DISQUSWIDGETS' in window) return draf(() => reset());
      loadCountScript();
      watch(
        () => props.url,
        () => draf(() => reset())
      );
    }

    function reset() {
      window.DISQUSWIDGETS.getCount({ reset: true });
    }

    function loadCountScript() {
      if (document.getElementById('dsq-count-scr')) return;
      const d = document;
      const s = d.createElement('script');
      s.async = true;
      s.id = 'dsq-count-scr';
      s.src = `//${getShortname.value}.disqus.com/count.js`;
      (d.head || d.body).appendChild(s);
    }

    return {
      disqusAttrs,
    };
  },
});
</script>
