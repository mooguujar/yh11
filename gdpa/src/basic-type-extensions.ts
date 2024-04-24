Number.prototype.toTruncFixed = function (dig = 2) {
  const [int, dec] = (this + '.').toString().split('.')
  if (dig === 0) return int
  return int + '.' + (dec + '0'.repeat(dig)).substring(0, dig)
}
