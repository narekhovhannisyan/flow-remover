const fs = require('fs')
const path = require('path')

const Promise = require('bluebird')

/**
 * Wrapper for `mkdirSync` function.
 * @param target The target path.
 * @returns {void}
 */
const createDirectory = (target) => fs.mkdirSync(target)

/**
 * Wrapper for `existsSync` function.
 * @param path The path to check.
 * @returns {Boolean}
 */
const dirExists = (path) => fs.existsSync(path)

/**
 * @param source The source path.
 */
const checkLastModifiedDate = (source) => dirExists(source) ? new Date(fs.statSync(source).mtime) : 0

/**
 * @param {String} source The source to scan.
 * @param {Function} processor Function to use while scanning.
 */
const recursiveScan = (source, processor) => {
  const process = (dir) => {
    if (fs.statSync(path.join(source, dir)).isDirectory()) {
      return processor(path.join(source, dir), dir).then(() =>
        recursiveScan(path.join(source, dir), processor)
      )
    }

    if (fs.statSync(path.join(source, dir)).isFile()) {
      return processor(path.join(source, dir), dir)
    }

    return Promise.reject(Error('something wrong with the directory'))
  }

  const directories = fs.readdirSync(source)

  return Promise.map(directories, process)
}

/**
 * @param folder The folder path.
 * @returns {Promise.<>}
 */
const lookupOrCreate = (folder) => Promise.resolve()
  .then(() => {
    if (!dirExists(folder)) {
      return createDirectory(folder)
    }
  })

/**
 * If source is modified, then copy file, otherwise does nothing!
 * @param source The source of the file.
 * @param target The target path.
 * @returns {Promise.<>}
 */
const copyFile = (source, target) => new Promise((resolve) => {
  if (checkLastModifiedDate(target) < checkLastModifiedDate(source)) {
    const readable = fs.createReadStream(source)

    readable.pipe(fs.createWriteStream(target))
    readable.on('end', () => {
      resolve()
    })
  }

  resolve()
})

module.exports = {
  copyFile,
  createDirectory,
  dirExists,
  checkLastModifiedDate,
  recursiveScan,
  lookupOrCreate
}
