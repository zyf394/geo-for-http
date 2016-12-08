a small tool to getCurrentPosition in http protocol
## install
```
npm install geo-for-http
```
## usage 
```javascript
import geo from 'geo-for-http'

// first, use geo.register() to register to the map applicaiton you choose.
geo.register({
  type: 'qq',
  app_key: yourkey,
  app_name: yourappname
});

// then, use geo.getCurrentPosition() to get your current postion.
geo.getCurrentPosition()
  .then( pos => {
    console.log(pos)
  })

```
## API

| API | options | description |
| --- | --- | --- |
| register(opt) |  `opt.type`: String <br/>(valid value: 'qq'(default)、'baidu'、'ali'、'h5') <br/> `opt.app_key`: String <br/>(your app key) <br/> `opt.app_name`: String<br/> (your app name) | register to the map applicaiton you choose. For stable use, you'd better register your app on each map official website. Then you will get a key , which is the only signature to identify your app, from one official website<br/>QQMAP is highly recommended. | 
| getCurrentPosition(mapType, options).then(pos => {console.log(pos)}) | `mapType`:valid value: 'qq'(default)、'baidu'、'ali'、'h5',<br/>`options`: the particular options of getCurrentPosition function. How to set the options depends on which map you choose. _You can ignore it at most of the time_. How to set options:<br/>[qqmap](http://lbs.qq.com/tool/component-geolocation.html)<br/>[bmap]( http://developer.baidu.com/map/reference/index.php?title=Class:%E6%9C%8D%E5%8A%A1%E7%B1%BB/Geolocation) <br/> [amap](http://lbs.amap.com/api/javascript-api/reference/location/) | You can get current position in `then()` function, like below :<br/>getCurrentPosition().then(function(position){console.log(position)})<br/>callback arguments:<br/>`position.lat`: latitude<br/>`position.lng`: longitude<br/>`maptype`: map app in use |
