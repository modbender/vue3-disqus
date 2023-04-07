import { App } from "vue";
import { DISQUS_CONFIG_KEY } from "./constants";
import { DisqusOptions, DisqusInstance } from "./types";
import DisqusComments from "./DisqusComments.vue";
import DisqusCount from "./DisqusCount.vue";

export default function install(app: App, options: DisqusOptions = {}) {
  app.component("DisqusComments", DisqusComments);
  app.component("DisqusCount", DisqusCount);

  const disqusConfig: DisqusInstance = {
    shortname: options.shortname,
    reset: null,
  };

  app.provide(DISQUS_CONFIG_KEY, disqusConfig);
}
