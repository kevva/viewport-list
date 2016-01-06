# viewport-list [![Build Status](http://img.shields.io/travis/kevva/viewport-list.svg?style=flat)](https://travis-ci.org/kevva/viewport-list)

> Return a list of devices and their viewports


## Install

```
$ npm install --save viewport-list
```


## Usage

Pass in a optional keyword which is a device name from [this list](http://viewportsizes.com).

```js
const viewportList = require('viewport-list');

viewportList(['iphone 4s']).then(items => {
	console.log(items);
	//=> [{name: 'iphone 4s', platform: 'iOS', os: '4.3.5', size: '320x480', release: '2011-10'}]
});
```


## API

### viewportList([items])

Returns a promise for an array of viewports.

#### items

Type: `array`  
Default: `[]`

An array of device names to fetch.


## Related

* [viewport-list-cli](https://github.com/kevva/viewport-list-cli) - CLI for this module


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
