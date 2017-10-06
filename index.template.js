// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
const app = new Vue({
    template: `<div>Hello World</div>`
})

const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
renderer.renderToString(app, (err, html) => {
    console.log(html) // will be the full page with app content injected.
})