 import { Plugin, App } from 'vue';
 import Notification from './notification.vue';
 import notify from './core';
 
 const install = (app: App): App => {
   app.config.globalProperties.$notify = notify;
   app.component(Notification.name, Notification);
   return app;
 };
 
 export default install as Plugin;