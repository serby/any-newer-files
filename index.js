module.exports = anyNewer

var fs = require('fs')

function anyNewer(sourceFiles, outputFiles) {

  if (!Array.isArray(sourceFiles)) {
    throw new TypeError('sourceFiles should be an array')
  }

  if (outputFiles.length === 0) return false

  var sourceAge = sourceFiles.reduce(function(previousValue, file) {
    var mtime = fs.statSync(file).mtime.getTime()
    return mtime > previousValue ? mtime : previousValue
  }, 0)
    , outputAge = outputFiles.reduce(function(previousValue, file) {
    var mtime = fs.statSync(file).mtime.getTime()
    return mtime < previousValue ? mtime : previousValue
  }, Infinity)

  if ((outputAge !== Infinity) && (sourceAge <= outputAge)) {
    return false
  }

  return true

}
