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
geo.getCurrentPosition('qq')
  .then( pos => {
    console.log(pos)
  })

```
## API

| API | arguments | type | value | description |
| --- | --- | --- | --- | --- |
| register(arg) |  `arg.type`<br/>`arg.app_key`<br/> `arg.app_name`<br/> | String<br/>String<br/>String |  'qq'(default)/'baidu'/'ali'/'h5'<br/>(your app key) <br/> (your app name)  | Register to the map applicaiton you choose. QQMAP is highly recommended. | 
| getCurrentPosition(mapType, options) |  `mapType`<br/>`options`<br/> | String<br/>Object | 'qq'(default)/'baidu'/'ali'/'h5'<br/>How to set options: [qqmap](http://lbs.qq.com/tool/component-geolocation.html)/[bmap]( http://developer.baidu.com/map/reference/index.php?title=Class:%E6%9C%8D%E5%8A%A1%E7%B1%BB/Geolocation)/[amap](http://lbs.amap.com/api/javascript-api/reference/location/) | Options of each map's original getCurrentPosition function, depends on which map you choose. _You can ignore it at most of the time_. | 
| getCurrentPosition(mapType, options)<br/>.then(pos => {}) |  `pos.lat`<br/>`pos.lng`<br/> `pos.maptype`<br/> | Float<br/>Float<br/>String |  (current postion latitude)<br/>(current postion longitude)<br/>(the map you're using)| Callback function of the `getCurrentPosition()`. | 
