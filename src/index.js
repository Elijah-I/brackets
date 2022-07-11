module.exports = function check(str, bracketsConfig) {
  // local var
  let coincidence = 0
  let length = str.length
  const special_symbols = [['.', '+'], ['^', '$'], ['*', '?']]

  // replace same character to different
  const replaceSame = (replace_char, found) => {
    const [char_open, char_close] = special_symbols[coincidence]

    str = Array.from(str).map(char => {
      if (char == replace_char) {
        return ++found % 2 ? char_open : char_close
      }
      return char
    }).join('')

    return [char_open, char_close, str]
  }

  // create parse rules regexps
  const parseRules = bracketsConfig
    .map(([open, close]) => {
      if (open == close) {
        [open, close] = replaceSame(open, 0)
        coincidence++
      }

      return `${open}${close}`
    })

  // kill pair-breckets untill nothing to kill
  do {
    length = str.length
    for (let rule of parseRules)
      str = str.replace(rule, '')
  } while (str.length != length)

  // if nothing left - bracket string was correct
  return str === ''
}