module.exports = function check(str, bracketsConfig) {
  const uid = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const charactersLength = characters.length

    return characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  const stack = []
  const breckets = Array.from(str)
  const [OPEN_BRECKET, CLOSE_BRECKET_PAIR] = bracketsConfig.reduce(
    (acc, pair) => {
      let open = pair[0]
      let close = pair[1]

      if (open === close) {
        const new_open = uid()
        const new_close = uid()

        let index = 0
        for (const order in breckets) {
          if (breckets[order] === open) {
            breckets[order] = index % 2 ? new_close : new_open
            index++
          }
        }

        open = new_open
        close = new_close
      }

      acc[0].push(open)
      acc[1][close] = open

      return acc
    },
    [[], {}]
  )

  for (const brecket of breckets) {
    let push = false
    if (OPEN_BRECKET.includes(brecket)) push = true
    else if (stack[stack.length - 1] !== CLOSE_BRECKET_PAIR[brecket]) push = true

    if (push) stack.push(brecket)
    else stack.pop()
  }

  return !stack.length
}
