const gulp = require('gulp')
const utils = require('./utils')
const Promise = require('bluebird')
const removeTypes = require('./remove-types')
const path = require('path')

const root = path.resolve(__dirname).split('/node_modules')[0]
const source = root + '\\src'

gulp.task('default', () => {
  return utils.callRecursive(utils.recursiveScan(source, removeTypes.unflowAsync), 1000 * 30) //every half minute
})