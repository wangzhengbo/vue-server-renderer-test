// 第 1 步：创建一个 Vue 实例
const Vue = require('vue');

const app = new Vue({
  data: {
    message: 'SSR Demo'
  },
  template: `
    <div>
      <div v-example:foo.a.b="{ color: 'white', text: 'hello!' }">{{ message }}</div>
      <input v-focus="message" />
    </div>
  `,
  directives: {
    focus: {
      bind: function (el) {
        console.log('------->focus bind', el);
      },
      unbind: function (el) {
        console.log('------->focus unbind', el);
      },
      inserted: function (el) {
        console.log('------->focus inserted', el);
        // el.focus();
      },
      update: function (el) {
        console.log('------->focus update', el);
      },
      componentUpdated: function (el) {
        console.log('------->focus componentUpdated', el);
      }
    },
    example: function (el, binding) {
      console.log('------->example', binding);
    }
  }
});

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer({
  directives: {
    focus: function (vnode, binding) {
      console.log('------->renderer#focus', binding);
      const attrs = vnode.data.attrs || (vnode.data.attrs = {});
      // See https://cn.vuejs.org/v2/guide/render-function.html#深入-data-对象
      attrs.autofocus = true;
      attrs.id = 'hello';
      const clazz = vnode.data['class'] || (vnode.data['class'] = {});
      clazz.autofocus = true;
    },
    example: function (vnode, binding) {
      console.log('------->renderer#example', binding);
      // See https://github.com/vuejs/vue/blob/dev/src/platforms/web/server/directives/show.js
      const style = vnode.data.style || (vnode.data.style = {});
      style.color = binding.value.color;
    }
  }
});

// 第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err;
  console.log(html);
  // => <div data-server-rendered="true">Hello World</div>
});
