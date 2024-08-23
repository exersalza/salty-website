import { Hello } from "./commands/hello";

export const COMMANDS = {
  hello: () => Hello,
  clear: () => Default,
  ls: () => Default,
  cls: () => Default,
  neofetch: () => Default
};

function Default() {
  return <p></p>
}
