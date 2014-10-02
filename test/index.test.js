var assert = require('assert')
  , rewire = require('rewire')
  , anyNewer = rewire('..')

function mockGetTime(time) {
  return time
}

function mockStatSync(file) {
  if (file === '/old') {
    return { mtime: { getTime: mockGetTime.bind(null, 0) } }
  } else {
    return { mtime: { getTime: mockGetTime.bind(null, 1) } }
  }
}

describe('any-new-files', function () {

  it('should be a function', function() {
    assert.equal(typeof anyNewer, 'function')
  })

  it('should return false if both arguments are empty', function() {
    assert.equal(anyNewer([], []), false)
  })

  it('should error if no arguments are passed', function() {
    assert.throws(function () {
      anyNewer()
    })
  })

  it('should error if one arguments is passed', function() {
    assert.throws(function () {
      anyNewer([])
    })
  })

  it('should error if only second arguments is passed', function() {
    assert.throws(function () {
      anyNewer(null, [])
    })
  })

  it('should return true if second argument is empty', function() {
    assert.equal(anyNewer([ __dirname + '/index.test.js' ], []), false)
  })

  it('should return false if first argument is empty', function() {
    assert.equal(anyNewer([], [ __dirname + '/index.test.js' ]), false)
  })

  it('should return false both arguments contain the same files', function() {
    var filePath = __dirname + '/index.test.js'
    assert.equal(anyNewer([ filePath ], [ filePath ]), false)
  })

  it('should return true if one file in first list is older than all files in second', function() {
    anyNewer.__set__('fs', { statSync: mockStatSync })
    assert.equal(anyNewer(
      [ '/old', '/old', '/newest' ], [ '/old', '/old', '/old' ]), true)
  })

  it('should return false if no file in first argument is old than second argument', function() {
    anyNewer.__set__('fs', { statSync: mockStatSync })
    assert.equal(anyNewer(
      [ '/old', '/old', '/old' ], [ '/old', '/newest', '/old' ]), false)
  })

})
