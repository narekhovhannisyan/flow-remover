const gulp = require('gulp')
const utils = require('./utils')
const Promise = require('bluebird')
const removeTypes = require('./remove-types')
const path = require('path')

const root = path.resolve(__dirname).split("node_modules")[0]
const source = root + '\src'

gulp.task('flow-remover', () => {
   if (utils.dirExists(source) && utils.dirExists(source.replace('src', 'dist'))) {
     console.log('Everything is ok with folders! :)')
   } else {
     console.log(utils.dirExists(source))
     console.log(utils.dirExists(source.replace('src', 'dist')))
   }
  // try {
  //   if (utils.dirExists(source) && utils.dirExists(source.replace('src', 'dist'))) {
  //     console.log('Everything is ok with folders! :)')
  //     // return utils.callRecursive(utils.recursiveScan(source, removeTypes.unflowAsync), 1000 * 30) //every half minute
  //   } else throw e 
  // } catch (e) {
  //   console.error('One or both folders are missing!')
  // }
})

