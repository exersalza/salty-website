import { useState } from "preact/hooks";

const COMMANDS = { hello: "sup [>'-']>" };
const PREFIX = `
<span class="prefix term-items">
 julian@salty <span class="">::</span> <span class="home">~/</span> >
 <span class="current-cmd"></span><span class="cursor"></span>
</span>`;

interface CmdProps {
  cmd: string
}

function Prefix() {
  return <span class="">
    julian@salty <span class="text-gray-500">::</span> <span class="">~/</span> 
    <span class=""></span><span class="cursor"></span>
  </span>
}

function CommandElement({ cmd }: CmdProps) {
  return (
    <div>
      <Prefix />
      <p>{cmd}</p>
      <p>{COMMANDS[cmd]}</p>
    </div>
  )
}

export function Term() {
  const [pastCommands, setPastCommands] = useState<Array<string>>(["hello"]);

  return (
    <div class={"w-full rounded bg-zinc-800 p-1 pt-0 font-mono"}>
      {pastCommands.map((ele: string) => {
        return (
          <CommandElement cmd={ele} />
        )
      })}
    </div>
  )
}
