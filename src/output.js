/**
 * @typedef {object} Item
 * @property {string} [uid]
 * @property {'default'|'file'|'file:skipcheck'} type
 * @property {string} title The title displayed in the result row.
 * @property {string} [subtitle] The subtitle displayed in the result row.
 * @property {string} arg The argument which is passed through the workflow to the connected output action.
 * @property {string} autocomplete
 * @property {boolean} valid
 * @property {string} match
 * @property {object} icon The icon displayed in the result row.
 * @property {'fileicon'|'filetype'} icon.type
 * @property {string} icon.path
 * @property {object} mods
 * @property {object} mods.alt
 * @property {object} mods.cmd
 * @property {object} text
 * @property {string} text.copy
 * @property {string} text.largetype
 * @property {string} quicklookurl
 */

/**
 * @param {Array.<Item>} items
 */
module.exports = items => {
  console.log(JSON.stringify({ items }, null, '\t'))
}
