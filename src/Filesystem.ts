import { COMMANDS } from "./commands";

export const directories = {
  "/": {
    "bin": {
      ...COMMANDS
    },
    "boot": {},
    "dev": {
    },
    "etc": {},
    "home": {
      "julian": {}
    },
    "lib": {},
    "lib64": {},
    "lost+found": {},
    "mnt": {},
    "opt": {},
    "proc": {},
    "root": {},
    "run": {},
    "sbin": {},
    "sys": {},
    "tmp": {},
    "usr": {},
    "var": {},
  }
}
