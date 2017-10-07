// 第 1 步：创建一个 Vue 实例
const Vue = require('vue');
const NoSSR = require('vue-no-ssr');

const NoSSRDemo = {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  template: `<div>vue-no-ssr demo, index: {{index}}</div>`
};

const app = new Vue({
  components: {
    'no-ssr': NoSSR,
    'no-ssr-demo': NoSSRDemo
  },
  template: `
    <div>
        <no-ssr-demo :index="0" />
        <no-ssr>
            <no-ssr-demo :index="1" />
        </no-ssr>
        <no-ssr placeholder="Loading">
            <no-ssr-demo :index="2" />
        </no-ssr>
        <no-ssr-demo :index="3" />
    </div>
  `
});

const renderer = require('vue-server-renderer').createRenderer();

renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
});
