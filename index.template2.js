// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
const app = new Vue({
    template: `<div>Hello World</div>`
})

const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template2.html', 'utf-8')
})

const context = {
    title: '<title>hello</title>',
    meta: `
      <meta ...>
      <meta ...>
    `
}

renderer.renderToString(app, context, (err, html) => {
    // page title will be "Hello"
    // with meta tags injected
    console.log(html) // will be the full page with app content injected.
})