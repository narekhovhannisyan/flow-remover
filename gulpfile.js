const gulp = require('gulp')
const watch = require('gulp-watch')
const utils = require('./utils')
const Promise = require('bluebird')
const removeTypes = require('./remove-types')
const path = require('path')

const root = path.resolve(__dirname).split('node_modules')[0]
const source = root + '\src'

gulp.task('default', () => {
  utils.lookupOrCreate(source.replace('src', 'dist')).then(() => {
    gulp.watch('../../src/**/**', () => {
      try {
        if (utils.dirExists(source) && utils.dirExists(source.replace('src', 'dist'))) {
          console.log('running flow remover')
          return utils.recursiveScan(source, removeTypes.unflowAsync)
        } else throw e
      } catch (e) {
        console.error
      }
    })
  })
})
