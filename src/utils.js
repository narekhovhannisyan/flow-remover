const fs = require('fs')
const path = require('path')

const Promise = require('bluebird')

/**
 * @param folder - The folder path.
 * @returns {Promise.<>}
 * @description
 */
const lookupOrCreate = folder => Promise.resolve()
    .then(() => {
      if (!dirExists(folder)) {
        return createDirectory(folder)
      }
    })


/**
 * @param source - The source of the file.
 * @param target - The target path.
 * @returns {Promise.<>}
 * @description If source is modified, then copy file, otherwise does nothing!
 */
const copyFile = (source, target) =>
    new Promise(resolve => {
      if (checkLastModifiedDate(target) < checkLastModifiedDate(source)) {
        const readable = fs.createReadStream(source)

        readable.pipe(fs.createWriteStream(target))
        readable.on('end', () => {
          resolve()
        })
      } else {
        resolve()
      }
    })

/**
 * @param target - The target path.
 * @returns {*}
 * @description Wrapper for `mkdirSync` function.
 */
const createDirectory = target => {
  return fs.mkdirSync(target)
}

/**
 * @param path - The path to check.
 * @returns {*}
 * @description Wrapper for `existsSync` function.
 */
const dirExists = path => {
  return fs.existsSync(path)
}

/**
 * @param source - The source path.
 * @returns {*}
 */
const checkLastModifiedDate = source => {
  return dirExists(source) ? new Date(fs.statSync(source).mtime) : 0
}

/**
 * @param source - The source to scan.
 * @param processor - Function to use while scanning.
 * @returns {Array}
 */
const recursiveScan = (source, processor) => {
  const process = dir => {
    if (fs.statSync(path.join(source, dir)).isDirectory()) {
      return processor(path.join(source, dir), dir).then(() => {
        return recursiveScan(path.join(source, dir), processor)
      })
    } else if (fs.statSync(path.join(source, dir)).isFile()) {
      return processor(path.join(source, dir), dir)
    } else {
      return Promise.reject(Error('something wrong with the directory'))
    }
  }
  const dirs = fs.readdirSync(source)
  return Promise.map(dirs, process)
}

module.exports = {
  copyFile,
  createDirectory,
  dirExists,
  checkLastModifiedDate,
  recursiveScan,
  lookupOrCreate
}
