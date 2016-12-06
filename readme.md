a small tool to getCurrentPosition in http protocol
## install
```
npm install geo-for-http
```
## usage 
```
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
| register(opt) |  `opt.type`: String <br/>(valid value: 'qq'、'baidu'、'ali'、'h5') <br/> `opt.app_key`: String <br/>(your app key) <br/> `opt.app_name`: String<br/> (your app name) | register to the map applicaiton you choose. <br/>QQMAP is highly recommended. | 
| getCurrentPosition() | none | You can get current position in `then()` function, like below :<br/>getCurrentPosition().then(function(position){console.log(position)})<br/>callback arguments:<br/>`position.lat`: latitude<br/>`position.lng`: longitude<br/>`maptype`: map app in use |
