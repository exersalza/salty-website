export function contains(needle: string | symbol | number, haystack: Record<string | symbol | number, any>): boolean;
export function contains(needle: string | symbol | number, haystack: any[]): boolean;


export function contains(needle: any, haystack: any): boolean {
  // array search, do it first as arrays are also objects
  if ((haystack as any[]).length !== undefined) {
    for (let i of (haystack as any[])) {
      if (String(i) === needle) return true
    }

    return false
  }


  // Object key search
  if (typeof haystack === "object") {
    for (let i of Object.keys(haystack)) {
      if (String(i) === needle) return true
    }

    return false
  }
}



