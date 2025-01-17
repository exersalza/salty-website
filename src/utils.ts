import { COMMANDS } from "./commands";

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

export function parseCommandArgs(input: string): [cmd: string, args: string[]] {
  const slices = input.split(" ");
  const cmd: string = slices.splice(0, 1)[0];
  let retArgs = slices;

  if (cmd.length === 0) {
    return ["", retArgs]
  }

  return [cmd, retArgs];
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.debug("Copied:", text, "to clipboard");
  } catch (e) {
    console.error("Couldn't copy text to clipboard")
  }
}

