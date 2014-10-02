# any-new-files

Compares two lists of files and returns true if any of the first list are newer than any in the second list.

[![build status](https://secure.travis-ci.org/serby/any-new-files.png)](http://travis-ci.org/serby/any-new-files)

## Installation

```
npm install any-new-files --save
```

## Usage

```js

if (anyNewer(
  [ './stylus/main.styl', './stylus/gallery.styl', './stylus/user.styl' ]
  , [ './build/css/index.css', './build/css/user.css' ])) {
  recompile()
}


```

## Credits
[Paul Serby](https://github.com/serby/) follow me on twitter [@serby](http://twitter.com/serby)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)