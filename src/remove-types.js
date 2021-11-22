const fs = require('fs')
const path = require('path')

const Promise = require('bluebird')
const flowRemoveTypes = require('flow-remove-types')

const utils = require('./utils')

/**
 * @private
 * Writes processed file. If source is modified, then change file, otherwise do nothing!
 * @param {String} source The source of the file.
 * @param {String} target The target path of the file.
 * @returns {void}
 */
const removeFlowTypes = (source, target) => {
  if (utils.checkLastModifiedDate(target) < utils.checkLastModifiedDate(source)) {
    const input = fs.readFileSync(source, 'utf8')
    const output = flowRemoveTypes(input, { pretty: true })

    fs.writeFileSync(target, output.toString())
  }
}

/**
 * Checks if source is `js` file then calls `removeFlowType`, otherwise copies the file.
 * @param {String} source The source of the file.
 * @returns {Promise.<*>}
 */
const unflow = (source) => {
  const target = source.replace('src', 'dist')
  const ext = '.js'

  return Promise.resolve().then(() => {
    if (fs.statSync(source).isDirectory()) {
      /* cheking if source firectory exists in destination directory otherwise do nothing */
      if (!utils.dirExists(target)) {
        return utils.createDirectory(target)
      }
    }

    if (fs.statSync(source).isFile() && path.extname(source) === ext) {
      return removeFlowTypes(source, target)
    }

    return utils.copyFile(source, target)
  })
}

/**
 * Look if there is src folder. If there is such one does nothing, otherwise creates one.
 *  Then calls `recursiveScan` function for current `source` with `unflow` processor.
 * @param {String} source The source to be scanned.
 */
const createAndScan = (source) => utils.lookupOrCreate(source.replace('src', 'dist'))
  .then(() => utils.recursiveScan(source, unflow))

module.exports = {
  createAndScan
}
