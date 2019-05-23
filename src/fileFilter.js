const fs = require('fs')
const { promisify } = require('util')
const minimatch = require('./utils/minimatch')

/**
 *
 * @param {string} files
 * @param {object} param1
 * @param {string[]} param1.includes
 * @param {string[]} param1.excludes
 */
function fileFilter(file, { includes, excludes }) {
  const isIncludes =
    includes.length === 0
      ? true
      : includes.some(include => minimatch(file, include))
  if (!isIncludes) {
    return false
  }
  return !excludes.some(exclude => minimatch(file, exclude))
}

module.exports = (
  scopes,
  options = {
    includes: [],
    excludes: [],
    deep: false,
    hidden: false,
    folder: false,
    file: false,
  }
) => {
  const result = []
  const stack = scopes.slice()
  while (stack.length > 0) {
    const scope = stack.pop()
    const files = fs.readdirSync(scope)
    files.forEach(file => {
      const filePath = `${scope}/${file}`
      if (
        !fileFilter(filePath, {
          includes: options.includes || [],
          excludes: options.excludes || [],
        })
      ) {
        // not pass reg
        return
      }
      if (!options.hidden && file.startsWith('.')) {
        // not include hidden file
        return
      }
      const state = fs.statSync(filePath)
      if (!options.folder && state.isDirectory()) {
        // not include folder
        return
      }
      if (!options.file && state.isFile()) {
        // not include file
        return
      }
      if (options.deep && state.isDirectory()) {
        // deep search
        stack.push(filePath)
      }
      result.push(filePath)
    })
  }
  return result
}
