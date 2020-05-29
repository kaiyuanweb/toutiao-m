module.exports = {
  plugins: {
    // vue cli 配置过了
    //   autoprefixer: {
    //     browsers: ['Android >= 4.0', 'iOS >= 8'],
    //   },
    // 把 px  转为rem
    'postcss-pxtorem': {
      //   rootValue  应该是你设计稿的十分之一
      // 我们的设计稿是 750  应该是75
      // vant  是基于375  写的  所以应该是37.5
      // 查阅文档 rootValue 支持 两种数据类型  一种数字 一种 函数
      // rootValue: 37.5,
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
        // return 37.5
      },
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}
