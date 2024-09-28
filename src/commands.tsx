import { Hello } from "./commands/hello";

export const COMMANDS = {
<<<<<<< HEAD
  hello: () => Hello,
  clear: () => Default,
  ls: () => Default,
  cls: () => Default,
  neofetch: () => Default
};

function Default() {
  return <p></p>
=======
  hello: () => <p>sup [&gt;'-']&gt;</p>,
  help: () => <Help />,
  clear: () => { },
  cls: () => { },
  ls: () => <Ls />
};

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
>>>>>>> ed57f21 (e)
}
