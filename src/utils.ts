

export function contains(needle: string, haystack: object): boolean {
  for (let i of Object.keys(haystack)) {
    if (String(i) === needle) return true
  }

  return false
}

