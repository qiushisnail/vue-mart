module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        app.use(function(req, res, next){
          if(/^\/api/.test(req.path)){ // 校验/api开头的请求
            if(req.path == '/api/login' || req.headers.token){
              next()
            }else{
              res.sendStatus(401) // 错误状态提醒用户登录
            }
          }else{
            next()
          }
        })
        app.get('/api/goods', function (req, res) {
          res.json({
            code: 0,
            list: [
              { id: 1, name: 'web全栈', price: 1000 },
              { id: 2, name: 'JS高级工程师', price: 2000 },
            ]
          })

        })
        app.post('/api/login', function (req, res) {

          let body = []

          req.on("data", chunk => { // 请求体传参是流体的，一片一片的
            // 接受到一部分数据
            body.push(chunk) // chunk是Buffer对象
          }).on("end",()=>{
            // 数据接收完毕
            body= Buffer.concat(body).toString()
            // 转换并保存前台传递的user
            const { username, password } = JSON.parse(body) // {name:'',pwd:''`}
            if (username === 'jerry' && password === '123') {
              res.json({
                code: 0,
                token: 'jilei'
              })
            } else {
              res.json({
                code: 1,
                message: '用户名或者密码错误'
              })
            }
          })
         

        })

        app.get('/api/logout', function (req, res) {

          res.json({
            code: -1
          })

        })

      }
    }
  }
}
