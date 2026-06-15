import { App } from "vue";

interface DisqusConfigCallbacks extends Record<string, any> {
  [key: string]: any;
  preData?: (...args: any[]) => any;
  preInit?: (...args: any[]) => any;
  onInit?: (...args: any[]) => any;
  onReady?: (...args: any[]) => any;
  afterRender?: (...args: any[]) => any;
  preReset?: (...args: any[]) => any;
  onIdentify?: (...args: any[]) => any;
  beforeComment?: (...args: any[]) => any;
  onNewComment?: (...args: any[]) => any;
  onPaginate?: (...args: any[]) => any;
}

export interface DisqusOptions {
  shortname?: string;
}

export interface DisqusInstance extends DisqusOptions {
  reset: any;
}

export interface DisqusConfig {
  url?: string;
  identifier?: string;
  title?: string;
  categoryID?: string;
  language?: string;
  sso: Record<string, any>;
  page: Record<string, any>;
  callbacks: DisqusConfigCallbacks;
}

interface Disqus {
  host: {
    _loadEmbed: (...args: any) => any;
  };
  request: {
    get: (...args: any) => any;
  };
  reset: (...args: any) => any;
  vglnk: (...args: any) => any;
}

interface DisqusWidgets {
  displayCount: (...args: any) => any;
  getCount: (...args: any) => any;
  domain: string;
  forum: string;
  proto: string;
}

declare global {
  interface Window {
    Vue: App;
    DISQUS: Disqus;
    DISQUSWIDGETS: DisqusWidgets;
    location: Location;
  }
}
