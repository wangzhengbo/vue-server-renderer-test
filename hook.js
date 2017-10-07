// 第 1 步：创建一个 Vue 实例
const Vue = require('vue');

const app = new Vue({
  template: `<div>Hello World</div>`,
  beforeCreate() {
    console.log('---->beforeCreate');
  },
  created() {
    console.log('---->created');
  },
  beforeMount() {
    console.log('---->beforeMount');
  },
  mounted() {
    console.log('---->mounted');
  },
  beforeUpdate() {
    console.log('---->beforeUpdate');
  },
  updated() {
    console.log('---->updated');
  },
  beforeDestroy() {
    console.log('---->beforeDestroy');
  },
  destroyed() {
    console.log('---->destroyed');
  }
});

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer();

// 第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err;
  console.log(html);
  // => <div data-server-rendered="true">Hello World</div>
});
