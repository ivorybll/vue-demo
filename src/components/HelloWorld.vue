<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest" target="_blank" rel="noopener">unit-jest</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
// var proEnv = require('./config/pro.env'); // 生产环境
// var uatEnv = require('./config/uat.env'); // 测试环境
// var devEnv = require('./config/dev.env'); // 本地环境
import proEnv from '../../config/pro.env'
import uatEnv from '../../config/uat.env'
import devEnv from '../../config/dev.env'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {

    }
  },
  mounted () {

    this.$post("/api/api/stu_reserve/getStudentDefaultCourse", { slide_id: 1 }).then(res => {
      console.log(res)
      const devProxy = ['/weixin', '/api']; //代理
      const env = process.env.NODE_ENV;
      let target = ""

      if (env === 'production') {

        target = proEnv.hosturl
      } else if (env === 'test') {
        target = uatEnv.hosturl
      } else {
        target = devEnv.hosturl
      }

      let proxyObj = {};
      devProxy.forEach((value, index) => {
        proxyObj[value] = {
          target: target[value],
          changeOrigin: true,
          pathRewrite: {
            [`^${value}`]: value
          }
        }
      })
      console.log(proxyObj)
    })
    this.$post("/weixin/user/unifiedlogin/logout", {}).then(res => {
      console.log(res)



    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
