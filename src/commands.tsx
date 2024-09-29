import { Hello } from "./commands/hello";

export const COMMANDS = {
  help: () => Help,
  hello: () => Hello,
  clear: () => Default,
  ls: () => Ls,
  cls: () => Default,
  neofetch: () => Default
};

function Default() {
  return <></>
}

function Help() {
  return <ul className={""}>
    <li>
      <p className={""}>usage: help</p>
    </li>
    <br />
    <li>
      <p className={""}>Please</p>
    </li>
  </ul>
}

function Ls() {
  return (
    <span>
      test
    </span>
  )
}
