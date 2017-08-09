const fs = require('fs')
const flowRemoveTypes = require('flow-remove-types')
const path = require('path')
const Promise = require('bluebird')
const utils = require('./utils')

const removeFlowTypes = (source, target) => {
  /* if source is modified, then change file, otherwise do nothing! */
  if (utils.checkLastModifiedDate(target) < utils.checkLastModifiedDate(source)) {
    const input = fs.readFileSync(source, 'utf8')
    const output = flowRemoveTypes(input)
    fs.writeFileSync(target, output.toString())
  }
}

const unflow = (source, dir) => {
  const target = source.replace('flow', 'dist')
  const ext = '.js'
  return Promise.resolve().then(() => {
    if (!utils.dirExists(target)) {
      utils.createDirectory(target)
    }
    if (fs.statSync(source).isDirectory()) {
      /* cheking if source firectory exists in destination directory otherwise do nothing */
      if (!utils.dirExists(target)) {
        return utils.createDirectory(target)
      }
    } else if (fs.statSync(source).isFile() && path.extname(source) == ext) {
      return removeFlowTypes(source, target)
    } else {
      return utils.copyFile(source, target)
    }
  })
}

const unflowAsync = (source, dir) => {
  console.log(Date.now())
  return unflow(source, dir)
}


module.exports = {
  unflowAsync
}