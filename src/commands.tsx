import { Hello } from "./commands/hello";
import { Help } from "./commands/help";
import { Ls } from "./commands/ls";
import { Man } from "./commands/man";


export const COMMANDS: Record<string, Command> = {
  help: [() => Help, "Displays this page"],
  hello: [() => Hello, "Hello"],
  clear: [() => Default, "Clears the screen"],
  ls: [() => Ls, "List contents of current directory"],
  cls: [() => Default, "Alias for clear"],
  neofetch: [() => Default, "Does neofetch stuff"],
  man: [() => Man, "Shows help for the commands. man [COMMAND]", [{
    name: "command",
  }]],
  __EMPTY__: [() => Empty, ""]
};

function Default() {
  return <p>We aint serving that here, sorry</p>
}

interface CommandNotFoundProps {
  cmd: string;
}

export function Empty() {
  return (<></>)
}

export function CommandNotFound(props: CommandNotFoundProps) {
  return <p>{`salt: command not found: ${props.cmd}`}</p>
}
