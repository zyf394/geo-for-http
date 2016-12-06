a small tool to getCurrentPosition in http protocol
## install
```
npm install geo-for-http
```
## usage 
```
import geo from 'geo-for-http'

geo.getCurrentPosition()
  .then( pos => {
    console.log(pos)
  })

```