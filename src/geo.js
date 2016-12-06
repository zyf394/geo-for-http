import Promise from 'bluebird'

const geo = {
  getCurrentPosition: getCurrentPosition
}

const MAP_TYPES = {
  HTML5: 'h5',
  QQMAP: 'qq',
  BMAP: 'baidu',
  AMAP: 'ali',
  GMAP: 'google'
}

const ERROR_TYPE = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT'
}

const util = {
  isHttps: location.protocol === 'https:',
  isSupportGeo: !!window.navigator.geolocation,
  isObject: function (obj) {
    return Object.prototype.toString.call(obj) === "[object Object]"
  },
  isFunction: function (obj) {
    return Object.prototype.toString.call(obj) === "[object Function]"
  }
}

function getCurrentPosition (mapType = MAP_TYPES.QQMAP, posOptions = {}) {
  if(util.isObject(mapType)){ // only 1 Object-type param passed in
    posOptions = mapType
    mapType = MAP_TYPES.QQMAP
  }

  return new Promise((resolve, reject) => {    
    if(util.isSupportGeo){
      if(util.isHttps || mapType === MAP_TYPES.HTML5){
        _H5Location(successFn, errorFn, posOptions)
      }else{
        _useMapLocation(successFn, errorFn, posOptions, mapType)
      }
    }else{
      _useMapLocation(successFn, errorFn, posOptions, mapType)
    }

    function successFn(pos) {
      let position = {};
      if(pos.coords){
        position = {lat: pos.coords.latitude, lng: pos.coords.longitude, maptype: MAP_TYPES.HTML5}
      }else if(pos.point){
        position = {lat: pos.point.lat, lng: pos.point.lng, maptype: MAP_TYPES.BMAP}
      }else if(pos.position){
        position = {lat: pos.position.lat, lng: pos.position.lng, maptype: MAP_TYPES.AMAP}
      }else{
        position = {lat: pos.lat, lng: pos.lng, maptype: MAP_TYPES.QQMAP}
      }
      resolve(position);
    }

    function errorFn(err) {
      if(err && err.code){ // html5 PositionError
        console.error('Error: Failed when call navigator.geolocation.getCurrentPosition() . (ERROR_CODE:' + err.code + ', ERROR_TYPE:' + ERROR_TYPE[err.code] +  ', ERROR_MESSAGE:' + err.message  + ')')
      }
      reject(err)
    }
  })
}

function _useMapLocation (successFn, errorFn, posOptions, mapType) {
  switch (mapType){
    case MAP_TYPES.AMAP:
      _AMapLocation(successFn, errorFn, posOptions);
      break;
    case MAP_TYPES.BMAP:
      _BMapLocation(successFn, errorFn, posOptions);
      break;
    case MAP_TYPES.QQMAP:
      _QQMapLocation(successFn, errorFn, posOptions);
      break;
  }
}

function _H5Location (successFn, errorFn, posOptions) {
  window.navigator.geolocation.getCurrentPosition(successFn, errorFn, posOptions)
}

function _AMapLocation (successFn, errorFn, posOptions) {
  // http://developer.baidu.com/map/reference/index.php?title=Class:%E6%9C%8D%E5%8A%A1%E7%B1%BB/Geolocation
  _getScript('//webapi.amap.com/maps?v=1.3&key=您申请的key值')
  .then(() => {
    const aMapWrapId = 'geo-everywhere-amap'
    let map, geolocation

    createAMap(() => {
      //加载地图，调用浏览器定位服务
      map = new window.AMap.Map(aMapWrapId);

      map.plugin('AMap.Geolocation', function() {
          geolocation = new AMap.Geolocation({});
          geolocation.getCurrentPosition(onComplete);
      });
      //解析定位结果
      function onComplete(status, result) {
        if(status === 'complete'){
          successFn(result)
        }else{
          errorFn(status)
        }
      }
    })
    
    // 创建一个隐藏的地图
    function createAMap(next){
      let container = document.createElement('div')
      container.id = aMapWrapId
      container.style.display = 'none'

      document.body.appendChild(container)

      util.isFunction(next) && next()
    }
  });
}

function _BMapLocation (successFn, errorFn, posOptions) {
  // http://developer.baidu.com/map/reference/index.php?title=Class:%E6%9C%8D%E5%8A%A1%E7%B1%BB/Geolocation
  _getScript('//api.map.baidu.com/getscript?v=2.0&ak=yourkey&services=&t=' + (new Date).getTime())
  .then(() => {
    let geolocation = new window.BMap.Geolocation();

    geolocation.getCurrentPosition( function (pos) {
      if(this.getStatus() == window.BMAP_STATUS_SUCCESS){
        successFn(pos)
      }else {
        errorFn(this.getStatus());
      }        
    },posOptions)
  });
}

function _QQMapLocation (successFn, errorFn, posOptions) {
  // http://lbs.qq.com/tool/component-geolocation.html
  _getScript('//3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js')
  .then(() => {
    let geolocation = new window.qq.maps.Geolocation('OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77', 'myapp' + +new Date());
    geolocation.getLocation(successFn, errorFn, posOptions);
  });
}

function _getScript (url) {
  return new Promise((resolve, reject) => {
    let sc = document.createElement('script');
    sc.type = 'text/javascript';
    sc.src = url;

    sc.onload = sc.onreadystatechange = function () {
      if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
        resolve()
        sc.onload = sc.onreadystatechange = null;
      }
    };
    sc.onerror = function (err) {
      reject(err)
      sc.onerror = null;
    };

    document.body.appendChild(sc);

  })
}

export default geo