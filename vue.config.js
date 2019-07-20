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
        app.get('/api/login', function (req, res) {
          const { username, password } = req.query
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

        app.get('/api/logout', function (req, res) {

          res.json({
            code: -1
          })

        })

      }
    }
  }
}
