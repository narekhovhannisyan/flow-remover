const gulp = require('gulp')
const utils = require('./utils')
const Promise = require('bluebird')
const removeTypes = require('./remove-types')

const source = './flow'

gulp.task('default', () => {
  return utils.callRecursive(utils.recursiveScan(source, removeTypes.unflowAsync), 1000 * 30) //every half minute
})