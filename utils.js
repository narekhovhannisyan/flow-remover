const Promise = require('bluebird')
const fs = require('fs')
const flowRemoveTypes = require('flow-remove-types')
const path = require('path')

const callRecursive = (fn, delay) => {
  return fn().delay(delay).then(() => callRecursive(fn, delay))
}

const copyFile = (source, target) => {
  /* if source is modified, then copy file, otherwise do nothing! */
  return new Promise(resolve => {
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
}

const createDirectory = target => {
  return fs.mkdirSync(target)
}

const dirExists = path => {
  return fs.existsSync(path)
}

const checkLastModifiedDate = source => {
  return dirExists(source) ? new Date(fs.statSync(source).mtime) : 0
}

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
  callRecursive
}