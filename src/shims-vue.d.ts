declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare module 'ramp-pcar';

declare module '*lang.csv' {
  const content: { key: string; enValue: string; frValue: string, enValid: string, frValid: string }[];
  export default content;
}
