/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { routes } from "./router";
import store from "./store";

Vue.config.productionTip = false;

import "./public-path";

// declare interface window {
//   __POWERED_BY_QIANKUN__: boolean,
// }

let router = null;
let instance: any = null;
function render(props = {}) {
  const { container } = props as any;
  router = new VueRouter({
    base: (window as any).__POWERED_BY_QIANKUN__ ? "/sub-app2/" : "/",
    mode: "history",
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props: any) {
  console.log("[vue] props from main framework", props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");
