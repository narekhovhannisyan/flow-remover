const gulp = require('gulp')
const utils = require('./utils')
const Promise = require('bluebird')
const removeTypes = require('./remove-types')

const source = './flow'


gulp.task('default', function() {
  Date.now()
  utils.callRecursive(utils.recursiveScan(source, removeTypes.unflowAsync), 1000 * 60) //every minutenpnpm gu
})