/**
 * Created by zhongyufei on 2016/4/26.
 */
import '../static/css/app.less'

// import geo from '../../src/geo'
import geo from '../../lib/geo'

let appTemplate = require('../tmpl/appTemplate.tpl')

let App = {

  $el: window.$('#app'), // 如不引入zepto，需修改为原生选择器

  appTemplate: appTemplate,

  init () {
    this.render()

    geo.register({
      type: 'ali',
      app_key: 'mykey',
      app_name: 'myappname'
    })
    geo.getCurrentPosition('ali')
    .then(pos => {
      let html = `<p>lat: <span>${pos.lat}</span></p><p>lng: <span>${pos.lng}</span></p><p>maptype: <span>${pos.maptype}</span></p>`
      document.getElementById('amap').innerHTML = html
    })

    geo.register({
      type: 'baidu',
      app_key: 'mykey',
      app_name: 'myappname'
    })
    geo.getCurrentPosition('baidu')
    .then(pos => {
      let html = `<p>lat: <span>${pos.lat}</span></p><p>lng: <span>${pos.lng}</span></p><p>maptype: <span>${pos.maptype}</span></p>`
      document.getElementById('bmap').innerHTML = html
    })

    geo.register({
      type: 'qq',
      app_key: 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77',
      app_name: 'myappname'
    })
    geo.getCurrentPosition('qq')
    .then(pos => {
      console.log(1, pos)
      let html = `<p>lat: <span>${pos.lat}</span></p><p>lng: <span>${pos.lng}</span></p><p>maptype: <span>${pos.maptype}</span></p>`
      document.getElementById('qqmap').innerHTML = html
    })
    geo.getCurrentPosition('h5')
    .then(pos => {
      let html = `<p>lat: <span>${pos.lat}</span></p><p>lng: <span>${pos.lng}</span></p><p>maptype: <span>${pos.maptype}</span></p>`
      document.getElementById('html5').innerHTML = html
    })
  },

  render () {
    let me = this
    me.$el.html(me.appTemplate())
  }

}

App.init()
